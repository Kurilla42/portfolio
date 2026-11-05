export const COUNTER_ID = 109643428;
const segments = new Set(['business', 'agency']);
const products = new Set(['full', 'mini']);
const eventNames = new Set(['hero_cta','pricing_view','sample_open','form_start','form_submit_attempt','form_error','lead_success','telegram_click','phone_click','email_click']);
const receipts = new Set();

export function goalId(segment, product, event) {
  if (!segments.has(segment) || !eventNames.has(event)) return null;
  if (['telegram_click','phone_click','email_click','pricing_view','sample_open'].includes(event)) return `geo_${segment}_${event}`;
  return products.has(product) ? `geo_${segment}_${product}_${event}` : null;
}
export function sendGoal(segment, product, event, ym = globalThis.window?.ym) {
  const id = goalId(segment, product, event);
  if (!id || typeof ym !== 'function') return false;
  try { ym(COUNTER_ID, 'reachGoal', id); return true; } catch { return false; }
}
// Invoke only after verified backend durable acceptance. The receipt never reaches YM.
export function backendAccepted({ segment, product, receipt }, ym = globalThis.window?.ym) {
  if (!goalId(segment, product, 'lead_success') || typeof receipt !== 'string' || !receipt.trim() || receipt.length > 200 || receipts.has(receipt)) return false;
  const sent = sendGoal(segment, product, 'lead_success', ym);
  if (sent) receipts.add(receipt);
  return sent;
}
const actionMap = { 'hero-cta':'hero_cta', 'sample-open':'sample_open', 'telegram':'telegram_click', 'phone':'phone_click', 'email':'email_click' };
function context(el) {
  const parent = el.closest('[data-segment]');
  const form = el.closest('form');
  return { segment: parent?.dataset.segment, product: el.dataset.product || form?.querySelector('[name="product"]:checked')?.value || form?.querySelector('select[name="product"]')?.value || form?.dataset.product || parent?.dataset.product };
}
// One mount per page; cleanup on unmount/SPA navigation. Product is read at event time.
export function mountGeoAnalytics({ root = globalThis.document, ym, Observer = globalThis.IntersectionObserver } = {}) {
  if (!root?.addEventListener) return () => {};
  const viewed = new Set(); const starts = new WeakSet();
  captureAttribution();
  const click = e => { const el = e.target?.closest?.('[data-geo-action]'); if (!el || !root.contains(el)) return; const event = actionMap[el.dataset.geoAction]; if (event) { const c = context(el); sendGoal(c.segment, c.product, event, ym); } };
  const input = e => { const form = e.target?.closest?.('form[data-geo-action="form"]'); if (!form || starts.has(form)) return; const c = context(e.target); if (sendGoal(c.segment, c.product, 'form_start', ym)) starts.add(form); };
  root.addEventListener('click', click); root.addEventListener('input', input);
  let observer;
  if (Observer) {
    observer = new Observer(entries => { for (const entry of entries) { if (!entry.isIntersecting || entry.intersectionRatio < 0.5) continue; const el = entry.target; if (el.dataset.geoSection !== 'pricing') continue; const c = context(el); const key = `${c.segment}:pricing`; if (viewed.has(key) || sendGoal(c.segment, null, 'pricing_view', ym)) { viewed.add(key); observer.unobserve(el); } } }, { threshold: 0.5 });
    root.querySelectorAll('[data-geo-section="pricing"]').forEach(el => observer.observe(el));
  }
  return () => { root.removeEventListener('click', click); root.removeEventListener('input', input); observer?.disconnect(); };
}
export function formAttempt(segment, product, ym) { return sendGoal(segment, product, 'form_submit_attempt', ym); }
export function formError(segment, product, ym) { return sendGoal(segment, product, 'form_error', ym); }

// Attribution is kept separately from goals, for the current tab only.
export const ATTRIBUTION_TTL_MS = 30 * 60 * 1000;
const STORAGE_KEY = 'geo_attribution_v1';
const TAGS = ['yclid','utm_source','utm_medium','utm_campaign','utm_content','utm_term','match_type','phrase_id','region_id'];
function validTag(key, value) {
  if (typeof value !== 'string' || !value || value.length > 100) return false;
  if (!/^[\p{L}\p{N} ._|~+\-]+$/u.test(value)) return false;
  if (key === 'yclid' || key === 'phrase_id' || key === 'region_id') return /^[a-zA-Z0-9_-]{1,150}$/.test(value);
  if (key === 'utm_term' && /\d[\d .()+-]{8,}\d/.test(value)) return false;
  return true;
}
function safeStorage() { try { return globalThis.sessionStorage; } catch { return null; } }
export function captureAttribution({ search = globalThis.location?.search || '', storage = safeStorage(), now = Date.now() } = {}) {
  const params = new URLSearchParams(search); const fresh = {};
  for (const key of TAGS) { const value = params.get(key); if (validTag(key,value)) fresh[key] = value; }
  if (Object.keys(fresh).length) {
    try { storage?.setItem(STORAGE_KEY, JSON.stringify({created: now, tags: fresh})); } catch {}
    return fresh;
  }
  try {
    const saved = JSON.parse(storage?.getItem(STORAGE_KEY) || 'null');
    if (!saved || !Number.isFinite(saved.created) || now < saved.created || now - saved.created >= ATTRIBUTION_TTL_MS || !saved.tags || typeof saved.tags !== 'object') { storage?.removeItem(STORAGE_KEY); return {}; }
    const result = {}; for (const key of TAGS) if (validTag(key,saved.tags[key])) result[key] = saved.tags[key];
    return result;
  } catch { return {}; }
}
export async function attributionForBackend({ search = globalThis.location?.search || '', storage = safeStorage(), now = Date.now(), ym = globalThis.window?.ym, timeoutMs = 500 } = {}) {
  const result = captureAttribution({search, storage, now});
  if (typeof ym !== 'function') return result;
  const clientId = await new Promise(resolve => {
    let done = false; const finish = value => { if (done) return; done = true; clearTimeout(timer); resolve(value); };
    const timer = setTimeout(() => finish(null), Math.min(Math.max(Number(timeoutMs) || 500, 1), 2000));
    try { ym(COUNTER_ID, 'getClientID', id => finish(typeof id === 'string' && /^\d{1,40}$/.test(id) ? id : null)); } catch { finish(null); }
  });
  if (clientId) result.client_id = clientId;
  return result;
}
