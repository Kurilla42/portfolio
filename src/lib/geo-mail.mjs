const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const TAGS = ['client_id','yclid','utm_source','utm_medium','utm_campaign','utm_content','utm_term','match_type','phrase_id','region_id'];
export const PRIVACY_VERSION = '2026-11-03';
export const RETRY_WINDOW_MS = 23 * 60 * 60 * 1000;
export const LEAD_RECIPIENT = 'sterlet.prod@gmail.com';
const fail = (status, code) => Object.assign(new Error(code), { status, code });
function field(value, max, required = false) {
  if (typeof value !== 'string' || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)) throw fail(422,'INVALID_FIELD');
  const text = value.trim(); if (required && !text) throw fail(422,'REQUIRED'); return text;
}
export function validateLead(value, now = Date.now()) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw fail(422,'INVALID_BODY');
  if (!['business','agency'].includes(value.segment) || !['full','mini'].includes(value.product)) throw fail(422,'INVALID_PRODUCT');
  if (value.consent !== true || value.policy_version !== PRIVACY_VERSION) throw fail(422,'CONSENT_REQUIRED');
  if (!Number.isFinite(value.attempt_started_at) || value.attempt_started_at > now + 60000 || now - value.attempt_started_at > RETRY_WINDOW_MS) throw fail(409,'RETRY_EXPIRED');
  if (value.fax) throw fail(422,'INVALID_FORM');
  const contact = field(value.contact,200,true);
  if (!( /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) || /^@?[A-Za-z][A-Za-z0-9_]{4,31}$/.test(contact) || /^\+?[\d ()-]{7,30}$/.test(contact) && contact.replace(/\D/g,'').length >= 7 )) throw fail(422,'INVALID_CONTACT');
  const websiteInput = field(value.website,500,true);
  let website; try { website = new URL(/^https?:\/\//i.test(websiteInput) ? websiteInput : `https://${websiteInput}`); } catch { throw fail(422,'INVALID_WEBSITE'); }
  if (!['http:','https:'].includes(website.protocol) || website.username || website.password || !website.hostname.includes('.') || website.hostname === '127.0.0.1') throw fail(422,'INVALID_WEBSITE');
  const name = field(value.name || '',100);
  const agencyName = value.segment === 'agency' ? field(value.agency_name,150,true) : '';
  if (value.segment === 'agency' && value.analysis_target_confirmed !== true) throw fail(422,'CLIENT_REQUIRED');
  const task = value.product === 'mini' ? field(value.task,2000,true) : '';
  if (value.product === 'mini' && (task.length < 10 || value.price_acknowledged !== true)) throw fail(422,'MINI_QUALIFICATION_REQUIRED');
  const attribution = {};
  for (const key of TAGS) {
    const item = value.attribution?.[key];
    if (typeof item === 'string' && item.length <= 100 && /^[\p{L}\p{N} ._|~+\-]+$/u.test(item)) {
      if (['client_id','yclid','phrase_id','region_id'].includes(key) && !/^[a-zA-Z0-9_-]+$/.test(item)) continue;
      attribution[key] = item;
    }
  }
  return { segment:value.segment, product:value.product, contact, website:website.href, name, agency_name:agencyName, analysis_target_confirmed:value.segment === 'agency', task, price_acknowledged:value.product === 'mini', policy_version:PRIVACY_VERSION, attempt_started_at:value.attempt_started_at, attribution };
}
export function emailForLead(lead, key, from) {
  const price = lead.segment === 'agency' ? '20 000' : '25 000';
  const lines = [
    'Заявка с посадочной GEO', `ID обращения: ${key}`, `Продукт: ${lead.product === 'mini' ? 'Мини 5 + 1' : 'Полный аудит'}`,
    `Сегмент: ${lead.segment === 'agency' ? 'Агентство' : 'Бизнес'}`, `Цена полного аудита: ${price} ₽`,
    `Контакт: ${lead.contact}`, `Сайт анализируемой компании: ${lead.website}`, `Имя: ${lead.name || 'Не указано'}`,
    ...(lead.agency_name ? [`Агентство: ${lead.agency_name}`, 'Компания клиента подтверждена отправителем'] : []),
    ...(lead.task ? [`Задача мини: ${lead.task}`, 'Ознакомление с ценой подтверждено отправителем'] : []),
    `Согласие: ${lead.policy_version}`, `Время начала отправки: ${new Date(lead.attempt_started_at).toISOString()}`, '',
    'Источник:', ...Object.entries(lead.attribution).map(([k,v]) => `${k}: ${v}`), '',
    'Это заявка, не продажа. Согласовать задачу и условия; мини автоматически не запускать.',
  ];
  return { from, to:[LEAD_RECIPIENT], subject:`GEO: ${lead.product === 'mini' ? 'мини-срез' : 'полный аудит'} · ${lead.segment === 'agency' ? 'агентство' : 'бизнес'}`, text:lines.join('\n'), ...(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.contact) ? {reply_to:lead.contact} : {}) };
}
/** Same-origin Vercel handler. Mail provider acceptance is not confirmed inbox delivery. */
export async function handleGeoLead(request, { env = process.env, fetchImpl = fetch, now = Date.now() } = {}) {
  const json = (status, body) => Response.json(body, {status, headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
  try {
    const origin = request.headers.get('origin');
    const allowed = new Set(['https://www.kolesnikovdesign.pro','https://kolesnikovdesign.pro']);
    if (env.VERCEL_ENV === 'preview' && env.VERCEL_URL) allowed.add(`https://${env.VERCEL_URL}`);
    if (env.NODE_ENV !== 'production') {
      const local = new URL(request.url);
      if (['localhost','127.0.0.1'].includes(local.hostname)) for (const host of ['localhost','127.0.0.1']) allowed.add(`${local.protocol}//${host}${local.port ? ':' + local.port : ''}`);
    }
    if (!origin || !allowed.has(origin)) return json(403,{error:'INVALID_ORIGIN'});
    if (env.GEO_FORM_ENABLED !== 'true' || !env.RESEND_API_KEY || !env.GEO_MAIL_FROM) return json(503,{error:'MAIL_NOT_CONFIGURED'});
    if (!/^application\/json(?:;|$)/i.test(request.headers.get('content-type') || '')) return json(415,{error:'JSON_REQUIRED'});
    const key = request.headers.get('idempotency-key');
    if (!UUID.test(key || '')) return json(422,{error:'INVALID_REQUEST_ID'});
    const reader = request.body?.getReader(); if (!reader) return json(400,{error:'EMPTY_BODY'});
    let size = 0; const chunks = [];
    while (true) { const {done,value} = await reader.read(); if (done) break; size += value.byteLength; if (size > 16384) { await reader.cancel(); return json(413,{error:'BODY_TOO_LARGE'}); } chunks.push(value); }
    let parsed; try { parsed = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return json(400,{error:'INVALID_JSON'}); }
    const lead = validateLead(parsed,now);
    const response = await fetchImpl('https://api.resend.com/emails', {method:'POST', headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`geo/${key}`}, body:JSON.stringify(emailForLead(lead,key,env.GEO_MAIL_FROM)), signal:AbortSignal.timeout(8000), redirect:'error'});
    const result = await response.json();
    if (!response.ok || !UUID.test(result.id || '')) return json(response.status === 409 ? 409 : response.status === 429 ? 429 : 502,{error:response.status === 409 ? 'RETRY_CONFLICT' : 'MAIL_NOT_ACCEPTED'});
    return json(200,{accepted:true,lead_id:result.id});
  } catch (error) { return json(error.status || 502,{error:error.code || 'MAIL_UNAVAILABLE'}); }
}
