const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
export const PRIVACY_VERSION = '2026-11-16';
export const RETRY_WINDOW_MS = 23 * 60 * 60 * 1000;
const fail = (status, code) => Object.assign(new Error(code), { status, code });
function field(value, max, required = false) {
  if (typeof value !== 'string' || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)) throw fail(422,'INVALID_FIELD');
  const text = value.trim(); if (required && !text) throw fail(422,'REQUIRED'); return text;
}
export function validateDayclearLead(value, now = Date.now()) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw fail(422,'INVALID_BODY');
  if (value.consent !== true || value.policy_version !== PRIVACY_VERSION) throw fail(422,'CONSENT_REQUIRED');
  if (!Number.isFinite(value.attempt_started_at) || value.attempt_started_at > now + 60000 || now - value.attempt_started_at > RETRY_WINDOW_MS) throw fail(409,'RETRY_EXPIRED');
  if (value.fax) throw fail(422,'INVALID_FORM');
  const contact = field(value.contact,200,true);
  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) || /^@?[A-Za-z][A-Za-z0-9_]{4,31}$/.test(contact) || /^\+?[\d ()-]{7,30}$/.test(contact) && contact.replace(/\D/g,'').length >= 7)) throw fail(422,'INVALID_CONTACT');
  const websiteInput = field(value.website || '',500); let website = '';
  if (websiteInput) {
    let url; try { url = new URL(/^https?:\/\//i.test(websiteInput) ? websiteInput : `https://${websiteInput}`); } catch { throw fail(422,'INVALID_WEBSITE'); }
    if (!['http:','https:'].includes(url.protocol) || url.username || url.password || !url.hostname.includes('.') || url.hostname === '127.0.0.1') throw fail(422,'INVALID_WEBSITE');
    website = url.href;
  }
  return {contact,website,name:field(value.name || '',100),task:field(value.task || '',2000),policy_version:PRIVACY_VERSION,attempt_started_at:value.attempt_started_at};
}
export function emailForDayclearLead(lead,key,from) {
  const lines = ['Заявка Dayclear',`ID обращения: ${key}`,`Контакт: ${lead.contact}`,`Имя: ${lead.name || 'Не указано'}`,`Сайт: ${lead.website || 'Не указан'}`,`Задача и текущая отчетность: ${lead.task || 'Не указано'}`,`Согласие: ${lead.policy_version}`,`Время начала отправки: ${new Date(lead.attempt_started_at).toISOString()}`];
  const mailbox = /^(?:[^<>\r\n]+\s*<([^\s<>@]+@[^\s<>@]+)>|([^\s<>@]+@[^\s<>@]+))$/.exec(from);
  const address = mailbox?.[1] || mailbox?.[2];
  const sender = address ? `Dayclear <${address}>` : from;
  return {from:sender,to:['sterlet.prod@gmail.com'],subject:'Dayclear: обсудить настройку',text:lines.join('\n'),...(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.contact) ? {reply_to:lead.contact} : {})};
}
/** Same-origin Vercel handler. Mail provider acceptance is not confirmed inbox delivery. */
export async function handleDayclearLead(request, { env = process.env, fetchImpl = fetch, now = Date.now() } = {}) {
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
    const lead = validateDayclearLead(parsed,now);
    const response = await fetchImpl('https://api.resend.com/emails', {method:'POST', headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`dayclear/${key}`}, body:JSON.stringify(emailForDayclearLead(lead,key,env.GEO_MAIL_FROM)), signal:AbortSignal.timeout(8000), redirect:'error'});
    const result = await response.json();
    if (!response.ok || !UUID.test(result.id || '')) return json(response.status === 409 ? 409 : response.status === 429 ? 429 : 502,{error:response.status === 409 ? 'RETRY_CONFLICT' : 'MAIL_NOT_ACCEPTED'});
    return json(200,{accepted:true,lead_id:result.id});
  } catch (error) { return json(error.status || 502,{error:error.code || 'MAIL_UNAVAILABLE'}); }
}

