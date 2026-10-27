'use client';
import Link from 'next/link';
import { useState } from 'react';
import Turnstile from 'react-turnstile';
import Img from './Img';
import { IconLock } from './Icons';
import { useLang, useCart, useToast } from '@/lib/store';
import { site } from '@/lib/site';

const BASE = process.env.NEXT_PUBLIC_BASE_URL || '';
const TS_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

export default function CheckoutClient() {
  const { t, tr, money, num } = useLang();
  const cart = useCart();
  const toast = useToast();

  const [form, setForm] = useState({ name: '', mobile: '', address: '', note: '', website: '' });

  const [agree, setAgree] = useState(true);
  const [couponIn, setCouponIn] = useState('');
  const [coupon, setCoupon] = useState(null); // { code, pct }
  const [token, setToken] = useState('');
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const area = site.deliveryAreas[0];
  const discount = coupon ? Math.round((cart.subtotal * coupon.pct) / 100) : 0;
  const total = Math.max(0, cart.subtotal - discount) + area.charge;

  const applyCoupon = () => {
    const code = couponIn.trim().toUpperCase();
    const pct = site.coupons[code];
    if (pct) { setCoupon({ code, pct }); toast(t('coupon_ok')); }
    else { setCoupon(null); toast(t('coupon_bad'), 'err'); }
  };

  const submit = async e => {
    e.preventDefault();
    if (busy || cart.items.length === 0) return;
    if (!/^[0-9]{11}$/.test(form.mobile)) return toast(t('bad_mobile'), 'err');
    if (!agree) return toast(t('need_terms'), 'err');
    if (TS_KEY && !token) return toast(t('need_verify'), 'err');
    setBusy(true);
    try {
      const FingerprintJS = (await import('@fingerprintjs/fingerprintjs')).default;
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();

      const lines = cart.items.map(i => ({
        id: i.product.slug, name: i.product.name.bn, pack: i.variant.label.bn, price: i.variant.price, qty: i.qty, total: i.lineTotal,
      }));
      const orderData = {
        name: form.name, mobile: form.mobile, email: '', address: form.address, note: form.note,
        website: form.website, // honeypot (must stay empty)
        // fields the existing admin panel already reads:
        productName: lines.map(l => `${l.name} (${l.pack}) × ${l.qty}`).join(' + '),
        price: lines.length === 1 ? lines[0].price : total,
        image: cart.items[0].product.images[0] || '',
        qty: cart.count,
        total,
        // extra info
        items: lines, subtotal: cart.subtotal, discount, coupon: coupon?.code || '',
        deliveryArea: area.label.en, deliveryCharge: area.charge, paymentMethod: 'COD', monthlyReorder: false,
        visitorId, turnstileToken: token,
        deviceInfo: {
          userAgent: navigator.userAgent, platform: navigator.platform, language: navigator.language,
          screenWidth: window.screen.width, screenHeight: window.screen.height,
        },
        status: 'pending',
        orderDate: new Date().toISOString(),
      };

      const res = await fetch(`${BASE}/orders`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(orderData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.message !== 'Order saved successfully!') {
        throw new Error(data.message || data.error || t('order_fail'));
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ ecommerce: null });
      window.dataLayer.push({
        event: 'purchase',
        ecommerce: {
          transaction_id: data.id || Date.now().toString(), currency: 'BDT', value: total, customer_type: 'new',
          customer_name: form.name, customer_phone: form.mobile, delivery_area: form.address, payment_method: 'COD',
          items: cart.items.map(i => ({
            item_id: i.product.slug, item_name: i.product.name.bn, item_brand: 'Rifi Bazar', item_category: i.product.category,
            item_variant: i.variant.label.en, price: i.variant.price, quantity: i.qty,
          })),
        },
      });
      cart.clear();
      setForm({ name: '', mobile: '', address: '', note: '', website: '' });
      setSuccess(true);
    } catch (err) {
      toast(err.message || t('order_fail'), 'err');
    } finally {
      setBusy(false);
    }
  };

  const chargeText = c => (c === 0 ? t('free') : money(c));

  return (
    <>
      <div className="co-hd">
        <div className="c">
          <Link href="/" className="logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="" />
            Rifi Bazar
          </Link>
          <span className="sec-ok"><IconLock />{t('secure')}</span>
          <Link href="/products" className="pill">{t('back_cart')}</Link>
        </div>
      </div>

      <form className="c" style={{ paddingTop: 36 }} onSubmit={submit}>
        <h1 className="h2" style={{ fontSize: 40 }}>{t('checkout')}</h1>
        <p className="sub" style={{ marginTop: 8 }}>{t('checkout_p')}</p>

        {cart.ready && cart.items.length === 0 && !success ? (
          <div className="empty" style={{ marginTop: 28 }}>
            {t('empty_cart')}<br /><br />
            <Link href="/products" className="btn dk">{t('continue_shop')}</Link>
          </div>
        ) : (
          <div className="co">
            <div className="left">
              <div className="card p">
                <h2 className="st"><i>1</i>{t('s1')}</h2>
                <div className="f">
                  <label className="lb" htmlFor="nm">{t('full_name')}</label>
                  <input className="in" id="nm" name="name" required placeholder={t('your_name')} value={form.name} onChange={set('name')} autoComplete="name" />
                </div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <div className="f" style={{ flex: '1 1 220px', marginBottom: 0 }}>
                    <label className="lb" htmlFor="mb">{t('mobile')}</label>
                    <input className="in" id="mb" name="mobile" type="tel" inputMode="numeric" maxLength={11} required placeholder={t('mobile_ph')}
                      value={form.mobile} onChange={e => /^[0-9]*$/.test(e.target.value) && setForm(f => ({ ...f, mobile: e.target.value }))} autoComplete="tel" />
                  </div>
                </div>
              </div>

              <div className="card p">
                <h2 className="st"><i>2</i>{t('s2')}</h2>
                <div className="f">
                  <label className="lb" htmlFor="ad">{t('full_addr')}</label>
                  <textarea className="in" id="ad" name="address" required placeholder={t('addr_ph')} value={form.address} onChange={set('address')} />
                </div>
              </div>

              <div className="card p">
                <h2 className="st"><i>3</i>{t('s3')}</h2>
                <div className="codbar">{t('cod_banner1')} <span style={{ color: '#9ca3af' }}>|</span> {t('cod_banner2')}<em>Cash On Delivery</em></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 10 }}>
                  <label className="rd on"><input type="radio" name="pay" checked readOnly />{t('pay_cod')}</label>
                  {['bKash', 'Nagad', 'Card'].map(m => (
                    <label key={m} className="rd dis"><input type="radio" name="pay" disabled />{m}<b>{t('soon')}</b></label>
                  ))}
                </div>
                <div className="f" style={{ margin: '22px 0 0' }}>
                  <label className="lb" htmlFor="nt">{t('note')} <span style={{ fontWeight: 400, color: 'var(--mut)' }}>{t('optional')}</span></label>
                  <input className="in" id="nt" name="note" placeholder={t('note_ph')} value={form.note} onChange={set('note')} />
                </div>
                {/* honeypot field, hidden from people */}
                <input className="honey" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={set('website')} />
              </div>
            </div>

            <aside>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h2 className="st" style={{ margin: 0, fontSize: 20 }}>{t('your_order')}</h2>
                  <span className="badge y" style={{ fontSize: 13 }}>{num(cart.count)} {t('items')}</span>
                </div>
                {cart.items.map(i => (
                  <div className="line" key={`${i.slug}-${i.variantId}`}>
                    <div className="t"><Img src={i.product.images[0]} alt="" label="Photo" /></div>
                    <div className="n">
                      <div>{i.product.name.en} · {i.product.name.bn} <small>({tr(i.variant.label)})</small></div>
                      <b>{money(i.lineTotal)}</b>
                      <button type="button" className="x" onClick={() => cart.remove(i.slug, i.variantId)}>{t('remove')}</button>
                    </div>
                    <div className="qty sm">
                      <button type="button" aria-label="−" onClick={() => cart.setQty(i.slug, i.variantId, i.qty - 1)}>−</button>
                      <span>{num(i.qty)}</span>
                      <button type="button" aria-label="+" onClick={() => cart.setQty(i.slug, i.variantId, i.qty + 1)}>+</button>
                    </div>
                  </div>
                ))}
                <div className="cpn">
                  <input className="in" aria-label={t('coupon')} placeholder={t('coupon')} value={couponIn} onChange={e => setCouponIn(e.target.value)} />
                  <button type="button" onClick={applyCoupon}>{t('coupon_apply')}</button>
                </div>
                <div className="sr"><span>{t('subtotal')}</span><span>{money(cart.subtotal)}</span></div>
                {discount > 0 && <div className="sr"><span>{t('discount')} ({coupon.code})</span><span>− {money(discount)}</span></div>}
                <div className="sr"><span>{t('delivery')}</span><span>{chargeText(area.charge)}</span></div>
                <div className="sr tot"><span>{t('total')}</span><span>{money(total)}</span></div>
              </div>

              <div className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <label className="ckb">
                  <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} />
                  <span>{t('agree1')} <a href="#">{t('agree2')}</a>, <a href="#">{t('agree3')}</a> {t('agree4')} <a href="#">{t('agree5')}</a>{t('agree6')}</span>
                </label>
                {TS_KEY ? <Turnstile sitekey={TS_KEY} onVerify={setToken} /> : null}
                <button type="submit" className="confirm" disabled={busy || cart.items.length === 0}>
                  {busy ? t('processing') : `${t('confirm')} · ${money(total)}`}
                </button>
                <p className="muted" style={{ margin: 0, textAlign: 'center', fontSize: 13 }}>{t('call_confirm')}</p>
              </div>
            </aside>
          </div>
        )}
      </form>

      <div className="co-ft">
        <div className="c">
          <span>© Rifi Bazar. {t('rights')}</span>
          <span className="l"><a href="#">{t('terms')}</a><a href="#">{t('privacy')}</a><a href="#">{t('returns')}</a><a href="#">{t('help')}</a></span>
        </div>
      </div>

      {success && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="box">
            <div className="ok">✓</div>
            <h3>{t('order_ok_h')}</h3>
            <p>{t('order_ok_p')}</p>
            <Link href="/products" className="btn dk" onClick={() => setSuccess(false)}>{t('continue_shop')}</Link>
          </div>
        </div>
      )}
    </>
  );
}
