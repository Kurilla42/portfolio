'use client';
import { useEffect, useRef } from 'react';
import { DayclearLeadForm } from './DayclearLeadForm';

export function DayclearDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    let trigger: HTMLElement | null = null;
    let frame = 0;
    let unlock = () => {};
    const close = () => {
      unlock(); unlock = () => {};
      cancelAnimationFrame(frame);
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest('a[data-dayclear-contact]') : null;
      if (!(link instanceof HTMLAnchorElement) || !link.closest('main.dayclear-landing')) return;
      event.preventDefault();
      trigger = link;
      if (!dialog.open) {
        const root = document.documentElement;
        const previousOverflow = root.style.overflow;
        const previousGutter = root.style.scrollbarGutter;
        root.style.scrollbarGutter = 'stable';
        root.style.overflow = 'hidden';
        document.dispatchEvent(new CustomEvent('geo-dialog-change', { detail: { open: true } }));
        unlock = () => {
          root.style.overflow = previousOverflow;
          root.style.scrollbarGutter = previousGutter;
          document.dispatchEvent(new CustomEvent('geo-dialog-change', { detail: { open: false } }));
        };
        dialog.showModal();
      }
      frame = requestAnimationFrame(() => { dialog.scrollTop = 0; dialog.querySelector<HTMLInputElement>('[name="contact"]')?.focus({ preventScroll: true }); });
    };
    const outside = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    };
    const keydown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button, input, select, textarea, [tabindex]')).filter(element => element.tabIndex >= 0 && !element.matches(':disabled') && !element.closest('[hidden], [inert]') && element.getClientRects().length > 0);
      const first = controls[0], last = controls[controls.length - 1];
      if (!first || !last) return;
      const active = document.activeElement;
      if (!dialog.contains(active) || active === dialog || (event.shiftKey ? active === first : active === last)) {
        event.preventDefault(); (event.shiftKey ? last : first).focus();
      }
    };
    document.addEventListener('click', click, true);
    dialog.addEventListener('click', outside);
    dialog.addEventListener('close', close);
    dialog.addEventListener('keydown', keydown);
    return () => {
      document.removeEventListener('click', click, true);
      dialog.removeEventListener('click', outside);
      dialog.removeEventListener('close', close);
      dialog.removeEventListener('keydown', keydown);
      cancelAnimationFrame(frame);
      if (dialog.open) dialog.close();
      unlock();
    };
  }, []);
  return <dialog ref={dialogRef} className="geo-lead-dialog" aria-labelledby="dayclear-dialog-title" data-lenis-prevent>
    <div className="geo-dialog-top"><p className="geo-eyebrow">Следующий шаг</p><button type="button" className="geo-dialog-close" aria-label="Закрыть окно" onClick={() => dialogRef.current?.close()}><span aria-hidden="true">×</span></button></div>
    <h2 id="dayclear-dialog-title" className="geo-dialog-title">Обсудим настройку</h2>
    <p className="geo-dialog-intro">Уточню задачу по указанному контакту. Отвечаю в будни.</p>
    <DayclearLeadForm idSuffix="dialog" />
  </dialog>;
}

