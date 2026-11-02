'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { mountGeoAnalytics, formAttempt, formError, backendAccepted, attributionForBackend } from '@/lib/geo-analytics.mjs';
import type { Segment } from './geo-content';
type Product = 'full' | 'mini';
class UserMessage extends Error {}
export function GeoInteraction({ segment }: { segment: Segment }) {
  useEffect(() => mountGeoAnalytics(), [segment]);
  return null;
}
export function GeoLeadForm({ segment, enabled, privacyUrl }: { segment: Segment; enabled: boolean; privacyUrl: string }) {
  const [product, setProduct] = useState<Product>('full');
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const busy = useRef(false);
  const pending = useRef<{ signature: string; key: string; created: number } | null>(null);
  const pendingAttribution = useRef<Awaited<ReturnType<typeof attributionForBackend>> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const agency = segment === 'agency';
  useEffect(() => {
    const choose = (event: MouseEvent) => {
      const link = (event.target as Element)?.closest?.('[data-select-product]');
      const value = link?.getAttribute('data-select-product');
      if ((value === 'full' || value === 'mini') && !busy.current) { setProduct(value); setState('idle'); }
    };
    document.addEventListener('click', choose);
    return () => { document.removeEventListener('click', choose); abortRef.current?.abort(); };
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || busy.current || state === 'success') return;
    busy.current = true; setState('sending'); formAttempt(segment, product);
    const form = new FormData(event.currentTarget);
    const fields = {
      segment, product, contact: String(form.get('contact') || '').trim(), website: String(form.get('website') || '').trim(),
      name: String(form.get('name') || '').trim(), agency_name: agency ? String(form.get('agency_name') || '').trim() : '',
      analysis_target_confirmed: agency && form.get('analysis_target_confirmed') === 'on',
      task: product === 'mini' ? String(form.get('task') || '').trim() : '',
      price_acknowledged: product === 'mini' && form.get('price_acknowledged') === 'on', consent: form.get('consent') === 'on', policy_version: '2026-11-03', fax: String(form.get('fax') || ''),
    };
    const controller = new AbortController(); abortRef.current = controller;
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const signature = JSON.stringify(fields);
      const digest = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(signature))), n => n.toString(16).padStart(2, '0')).join('');
      const storageKey = `geo_pending_${segment}`;
      if (!pending.current) { try { pending.current = JSON.parse(sessionStorage.getItem(storageKey) || 'null'); } catch {} }
      if (pending.current?.signature !== digest || !pending.current?.key) { pending.current = { signature: digest, key: crypto.randomUUID(), created: Date.now() }; pendingAttribution.current = null; }
      if (!Number.isFinite(pending.current.created) || Date.now() - pending.current.created > 23 * 60 * 60 * 1000) throw new UserMessage('Срок повторной отправки истёк. Свяжитесь по контактам рядом, чтобы уточнить получение заявки.');
      try { sessionStorage.setItem(storageKey, JSON.stringify(pending.current)); } catch {}
      const attribution = pendingAttribution.current || await attributionForBackend();
      pendingAttribution.current = attribution;
      const response = await fetch('/api/geo-leads', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': pending.current.key }, body: JSON.stringify({ ...fields, attribution, attempt_started_at: pending.current.created }), signal: controller.signal });
      const result = await response.json();
      if (response.status === 422) throw new UserMessage('Проверьте контакт, адрес сайта и обязательные подтверждения. Для Telegram укажите @username, для почты — полный email.');
      if (response.status === 409) throw new UserMessage('Не удалось подтвердить повторную отправку. Свяжитесь по контактам рядом, чтобы уточнить получение заявки.');
      if (!response.ok || result.accepted !== true || typeof result.lead_id !== 'string' || !/^[a-f0-9-]{36}$/i.test(result.lead_id)) throw new Error('delivery');
      backendAccepted({ segment, product, receipt: result.lead_id });
      setState('success'); setMessage('Заявка получена. Уточню задачу по указанному контакту. Срок выполнения начинается после согласования.');
    } catch (error) {
      formError(segment, product); setState('error');
      setMessage(error instanceof UserMessage ? error.message : 'Не удалось подтвердить получение заявки. Повторите отправку с теми же данными или свяжитесь напрямую.');
    } finally { clearTimeout(timer); busy.current = false; abortRef.current = null; }
  }
  return <form id={`geo-lead-form-${segment}`} className="geo-form" data-geo-action="form" data-segment={segment} data-product={product} onSubmit={submit}>
    {!enabled && <p className="geo-status">Форма пока недоступна. Напишите в Telegram, на почту или позвоните — контакты рядом.</p>}
    <div aria-live="polite" aria-atomic="true">{(state === 'success' || state === 'error') && <p role={state === 'error' ? 'alert' : 'status'} className={`geo-status ${state === 'error' ? 'geo-error' : ''}`}>{message}</p>}</div>
    <fieldset disabled={!enabled || state === 'sending' || state === 'success'}>
      <legend className="sr-only">Обращение по GEO-аудиту</legend>
      <div hidden aria-hidden="true"><label>Fax<input name="fax" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="geo-field">Что обсудим<select name="product" value={product} onChange={e => { setProduct(e.target.value as Product); setState('idle'); }}><option value="full">Полный аудит — {agency ? '20 000' : '25 000'} ₽</option><option value="mini">Бесплатный мини-срез</option></select></label>
      <label className="geo-field">Контакт для ответа<input className="ym-disable-keys" name="contact" required minLength={3} maxLength={200} autoComplete="off" placeholder="Телефон, email или Telegram" /></label>
      <label className="geo-field">{agency ? 'Сайт компании клиента' : 'Сайт вашей компании'}<input className="ym-disable-keys" name="website" required maxLength={500} inputMode="url" autoComplete="url" placeholder="company.ru" /></label>
      <label className="geo-field">Имя (необязательно)<input className="ym-disable-keys" name="name" maxLength={100} autoComplete="given-name" /></label>
      {agency && <><label className="geo-field">Название агентства<input className="ym-disable-keys" name="agency_name" required maxLength={150} autoComplete="organization" /></label><label className="geo-check"><input type="checkbox" name="analysis_target_confirmed" required /><span>Указана компания, для которой нужен замер</span></label></>}
      {product === 'mini' && <><label className="geo-field">Какую конкретную задачу хотите проверить?<textarea className="ym-disable-keys" name="task" required minLength={10} maxLength={2000} /></label><label className="geo-check"><input type="checkbox" name="price_acknowledged" required /><span>Знаю, что полный аудит стоит {agency ? '20 000' : '25 000'} ₽. Мини не заменяет полный аудит.</span></label><p className="geo-note">Сначала уточним задачу и доступность слота. Срок мини — один рабочий день после получения данных и согласования задачи.</p></>}
      <label className="geo-check"><input type="checkbox" name="consent" required /><span>Даю <a href="/geo/consent" target="_blank" rel="noopener noreferrer">согласие на обработку данных</a> для ответа на обращение. Ознакомился с <a href={privacyUrl || '/geo/privacy'} target="_blank" rel="noopener noreferrer">политикой</a>.</span></label>
      <button type="submit" className="geo-button" disabled={!enabled || state === 'sending' || state === 'success'}>{state === 'sending' ? 'Отправляю…' : state === 'success' ? 'Заявка получена' : 'Отправить заявку'}<span aria-hidden="true">↗</span></button>
    </fieldset>
    <noscript><p>Для отправки формы нужен JavaScript. Можно связаться по контактам рядом.</p></noscript>
  </form>;
}
