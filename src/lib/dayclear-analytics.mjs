export const COUNTER_ID = 109643428;
export const ATTRIBUTION_TTL_MS = 30 * 60 * 1000;
const STORAGE_KEY = 'dayclear_attribution_v1';
const receipts = new Set();
const goals = new Set(['dayclear_sample_open', 'dayclear_telegram_click', 'dayclear_lead_accepted']);
const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;

// Only campaign labels used by the organic-video route; never contact/form values.
export function safeDayclearAttribution(value) {
  const result = {};
  if (!value || typeof value !== 'object' || !['youtube', 'instagram', 'tiktok'].includes(value.utm_source)) return result;
  result.utm_source = value.utm_source;
  if (value.utm_medium === 'organic_social') result.utm_medium = value.utm_medium;
  if (typeof value.utm_campaign === 'string' && /^dayclear_[a-z0-9_-]{1,60}$/.test(value.utm_campaign)) result.utm_campaign = value.utm_campaign;
  if (typeof value.utm_content === 'string' && /^[a-z][a-z0-9_-]{0,59}$/.test(value.utm_content)) result.utm_content = value.utm_content;
  return result;
}
function safeStorage() { try { return globalThis.sessionStorage; } catch { return null; } }
export function captureDayclearAttribution({ search = globalThis.location?.search || '', storage = safeStorage(), now = Date.now() } = {}) {
  const params = new URLSearchParams(search);
  const fresh = safeDayclearAttribution(Object.fromEntries(params));
  if (Object.keys(fresh).length) {
    try { storage?.setItem(STORAGE_KEY, JSON.stringify({ created: now, tags: fresh })); } catch {}
    return fresh;
  }
  try {
    const saved = JSON.parse(storage?.getItem(STORAGE_KEY) || 'null');
    if (!saved || !Number.isFinite(saved.created) || now < saved.created || now - saved.created >= ATTRIBUTION_TTL_MS) { storage?.removeItem(STORAGE_KEY); return {}; }
    return safeDayclearAttribution(saved.tags);
  } catch { return {}; }
}
export function dayclearGoal(goal, ym = globalThis.window?.ym) {
  if (!goals.has(goal) || typeof ym !== 'function') return false;
  try { ym(COUNTER_ID, 'reachGoal', goal); return true; } catch { return false; }
}
// Call only after the backend response passes the form's acceptance checks.
export function dayclearAccepted(receipt, ym) {
  if (!UUID.test(receipt || '') || receipts.has(receipt)) return false;
  const sent = dayclearGoal('dayclear_lead_accepted', ym);
  if (sent) receipts.add(receipt);
  return sent;
}
