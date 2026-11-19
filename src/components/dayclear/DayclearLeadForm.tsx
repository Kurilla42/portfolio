'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';

import { captureDayclearAttribution, safeDayclearAttribution, dayclearAccepted } from '@/lib/dayclear-analytics.mjs';

class UserMessage extends Error {}
export function DayclearLeadForm({ idSuffix = '' }: { idSuffix?: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const busy = useRef(false);
  const pending = useRef<{ signature: string; key: string; created: number; attribution?: Record<string, string> } | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => { if (state === 'error' || state === 'success') statusRef.current?.focus(); }, [state]);
  useEffect(() => () => abortRef.current?.abort(), []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || state === 'success') return;
    busy.current = true; setState('sending');
    const form = new FormData(event.currentTarget);
    const fields = { contact: String(form.get('contact') || '').trim(), website: String(form.get('website') || '').trim(), name: String(form.get('name') || '').trim(), task: String(form.get('task') || '').trim(), consent: form.get('consent') === 'on', policy_version: '2026-11-16', fax: String(form.get('fax') || '') };
    const controller = new AbortController(); abortRef.current = controller;
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const signature = JSON.stringify(fields);
      const digest = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(signature))), n => n.toString(16).padStart(2, '0')).join('');
      const storageKey = 'dayclear_pending';
      if (!pending.current) { try { pending.current = JSON.parse(sessionStorage.getItem(storageKey) || 'null'); } catch {} }
      if (pending.current?.signature !== digest || !pending.current?.key) pending.current = { signature: digest, key: crypto.randomUUID(), created: Date.now(), attribution: captureDayclearAttribution() };
      if (!Number.isFinite(pending.current.created) || Date.now() - pending.current.created > 23 * 60 * 60 * 1000) throw new UserMessage('Срок повторной отправки истек. Свяжитесь по контактам рядом, чтобы уточнить получение заявки.');
      try { sessionStorage.setItem(storageKey, JSON.stringify(pending.current)); } catch {}
      const response = await fetch('/api/dayclear-leads', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': pending.current.key }, body: JSON.stringify({ ...fields, attribution: safeDayclearAttribution(pending.current.attribution), attempt_started_at: pending.current.created }), signal: controller.signal });
      const result = await response.json();
      if (response.status === 422) throw new UserMessage('Проверьте контакт, адрес сайта и согласие. Для Telegram укажите @username, для почты — полный email.');
      if (response.status === 409) throw new UserMessage('Не удалось подтвердить повторную отправку. Свяжитесь по контактам рядом, чтобы уточнить получение заявки.');
      if (!response.ok || result.accepted !== true || typeof result.lead_id !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(result.lead_id)) throw new Error('acceptance');
      dayclearAccepted(result.lead_id);
      setState('success'); setMessage('Заявка принята. Уточню задачу по указанному контакту.');
    } catch (error) {
      setState('error');
      setMessage(error instanceof UserMessage ? error.message : 'Не удалось подтвердить прием заявки. Повторите отправку с теми же данными или свяжитесь напрямую.');
    } finally { clearTimeout(timer); busy.current = false; abortRef.current = null; }
  }
  return <form id={`dayclear-lead-form${idSuffix ? `-${idSuffix}` : ''}`} className="geo-form dayclear-form" onSubmit={submit}>
    <div aria-live="polite" aria-atomic="true">{(state === 'success' || state === 'error') && <p ref={statusRef} tabIndex={-1} role={state === 'error' ? 'alert' : 'status'} className={`geo-status ${state === 'error' ? 'geo-error' : ''}`}>{message}</p>}</div>
    <fieldset disabled={state === 'sending' || state === 'success'}>
      <legend className="sr-only">Обращение по настройке Dayclear</legend>
      <div hidden aria-hidden="true"><label>Fax<input name="fax" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="geo-field">Контакт для ответа<input className="ym-disable-keys" name="contact" required minLength={3} maxLength={200} autoComplete="off" placeholder="Телефон, email или Telegram" /></label>
      <label className="geo-field">Имя (необязательно)<input className="ym-disable-keys" name="name" maxLength={100} autoComplete="given-name" /></label>
      <label className="geo-field">Расскажите о задаче и текущей отчетности<textarea className="ym-disable-keys" name="task" maxLength={2000} placeholder="Какие данные собираете и что хотите изменить?" /></label>
      <label className="geo-field">Сайт (необязательно)<input className="ym-disable-keys" name="website" maxLength={500} inputMode="url" autoComplete="url" placeholder="company.ru" /></label>
      <label className="geo-check"><input type="checkbox" name="consent" required /><span>Даю <a href="/dayclear/consent" target="_blank" rel="noopener noreferrer">согласие на обработку данных</a> для ответа на обращение. Ознакомился с <a href="/dayclear/privacy" target="_blank" rel="noopener noreferrer">политикой</a>.</span></label>
      <button type="submit" className="geo-button" disabled={state === 'sending' || state === 'success'}>{state === 'sending' ? 'Отправляю…' : state === 'success' ? 'Заявка принята' : 'Обсудить настройку'}<span aria-hidden="true">↗</span></button>
    </fieldset>
    <noscript><p>Для отправки формы нужен JavaScript. Можно связаться по контактам рядом.</p></noscript>
  </form>;
}
