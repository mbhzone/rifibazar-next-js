'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { dict, fmtMoney, fmtNum } from './i18n';
import { getProduct } from './products';

/* ---------------- Language ---------------- */
const LangCtx = createContext(null);
export function LangProvider({ children }) {
  const lang = 'en';
  useEffect(() => { document.documentElement.lang = 'en'; }, []);
  const value = useMemo(() => {
    const t = key => dict.en[key] ?? dict.bn[key] ?? key;
    const tr = obj => (obj ? obj.en ?? obj.bn ?? '' : '');
    return { lang, setLang: () => {}, t, tr, num: n => fmtNum(n, lang), money: n => fmtMoney(n, lang) };
  }, []);
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}
export const useLang = () => useContext(LangCtx);

/* ---------------- Toast ---------------- */
const ToastCtx = createContext(() => {});
export function ToastProvider({ children }) {
  const [msg, setMsg] = useState(null);
  const show = useCallback((text, type = 'ok') => {
    setMsg({ text, type, id: Date.now() });
  }, []);
  useEffect(() => {
    if (!msg) return;
    const id = setTimeout(() => setMsg(null), 2800);
    return () => clearTimeout(id);
  }, [msg]);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      {msg && (
        <div className={`toast ${msg.type}`} role="status" aria-live="polite">
          {msg.text}
        </div>
      )}
    </ToastCtx.Provider>
  );
}
export const useToast = () => useContext(ToastCtx);

/* ---------------- Cart ---------------- */
const CartCtx = createContext(null);
export function CartProvider({ children }) {
  const [lines, setLines] = useState([]); // [{ slug, variantId, qty }]
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('rb_cart') || '[]');
      if (Array.isArray(saved)) setLines(saved.filter(l => getProduct(l.slug)));
    } catch (e) {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem('rb_cart', JSON.stringify(lines)); } catch (e) {}
  }, [lines, ready]);

  const add = useCallback((slug, variantId, qty = 1) => {
    setLines(prev => {
      const i = prev.findIndex(l => l.slug === slug && l.variantId === variantId);
      if (i >= 0) return prev.map((l, k) => (k === i ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { slug, variantId, qty }];
    });
  }, []);
  const setQty = useCallback((slug, variantId, qty) => {
    setLines(prev =>
      prev
        .map(l => (l.slug === slug && l.variantId === variantId ? { ...l, qty } : l))
        .filter(l => l.qty > 0),
    );
  }, []);
  const remove = useCallback((slug, variantId) => setQty(slug, variantId, 0), [setQty]);
  const clear = useCallback(() => setLines([]), []);

  const items = useMemo(
    () =>
      lines
        .map(l => {
          const product = getProduct(l.slug);
          const variant = product?.variants.find(v => v.id === l.variantId);
          return product && variant ? { ...l, product, variant, lineTotal: variant.price * l.qty } : null;
        })
        .filter(Boolean),
    [lines],
  );
  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);

  const value = { items, count, subtotal, add, setQty, remove, clear, ready };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
export const useCart = () => useContext(CartCtx);
