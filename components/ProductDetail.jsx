'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Img from './Img';
import ProductCard from './ProductCard';
import { IconTruck, IconCash, IconShield, IconCartPlus, IconBox, IconPhone, IconWhatsapp } from './Icons';
import { useLang, useCart, useToast } from '@/lib/store';
import { categories, getProduct, products, discountPct } from '@/lib/products';
import { site } from '@/lib/site';

export default function ProductDetail({ slug }) {
  const { lang, t, tr, money, num } = useLang();
  const cart = useCart();
  const toast = useToast();
  const router = useRouter();
  const p = getProduct(slug);

  const [vid, setVid] = useState(p ? (p.variants.find(v => v.popular) || p.variants[0]).id : '');
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const [tab, setTab] = useState('desc');

  useEffect(() => {
    document.body.classList.add('has-sbar');
    return () => document.body.classList.remove('has-sbar');
  }, []);

  // GTM view_item (same event the live site sends)
  useEffect(() => {
    if (!p) return;
    const v = p.variants.find(x => x.id === vid) || p.variants[0];
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
      event: 'view_item',
      ecommerce: {
        currency: 'BDT', value: v.price,
        items: [{ item_id: p.slug, item_name: p.name.bn, item_brand: 'Rifi Bazar', item_category: p.category, item_variant: v.label.en, price: v.price, quantity: 1 }],
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (!p) {
    return (
      <div className="c" style={{ padding: '60px 28px' }}>
        <div className="empty">{t('not_found')}<br /><br /><Link className="pill" href="/products">{t('back_shop')}</Link></div>
      </div>
    );
  }

  const v = p.variants.find(x => x.id === vid) || p.variants[0];
  const off = discountPct(v);
  const cat = categories.find(c => c.id === p.category);
  const related = [
    ...products.filter(x => x.category === p.category && x.slug !== p.slug),
    ...products.filter(x => x.category !== p.category),
  ].slice(0, 4);

  const addToCart = () => {
    cart.add(p.slug, v.id, qty);
    toast(`${p.name.en} · ${p.name.bn} — ${t('added')}`);
  };
  const buyNow = () => {
    cart.add(p.slug, v.id, qty);
    router.push('/checkout');
  };

  const tabs = [
    ['desc', t('tab_desc')],
    ['info', t('tab_nutr')],
    ['rev', `${t('tab_reviews')}${p.reviews ? ` (${num(p.reviews)})` : ''}`],
    ['del', t('tab_del')],
  ];

  return (
    <div className="pdp">
      <div className="c" style={{ paddingTop: 24 }}>
        <div className="crumb">
          <Link href="/">{t('home')}</Link> &nbsp;/&nbsp;{' '}
          <Link href={`/products?category=${p.category}`}>{cat ? tr(cat.label) : t('shop')}</Link> &nbsp;/&nbsp; <b>{`${p.name.en} · ${p.name.bn}`}</b>
        </div>

        <div className="pd">
          <div className="gal">
            <div className="main">
              {off > 0 && <span className="off">-{off}%</span>}
              <Img src={p.images[img]} alt={`${p.name.en} · ${p.name.bn}`} label="Main product photo" />
            </div>
            {p.images.length > 1 && (
              <div className="thumbs">
                {p.images.slice(0, 4).map((src, i) => (
                  <button key={src} className={i === img ? 'on' : ''} onClick={() => setImg(i)} aria-label={`Photo ${i + 1}`}>
                    <Img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="info">
            <h1>{`${p.name.en} · ${p.name.bn}`}</h1>
            {p.short ? <p className="sd">{tr(p.short)}</p> : null}

            <div className="row" style={{ alignItems: 'baseline', gap: 12 }}>
              <span className="pbig">{money(v.price)}</span>
              {v.oldPrice ? <span className="old" style={{ fontSize: 18 }}>{money(v.oldPrice)}</span> : null}
              {v.oldPrice ? <span className="badge" style={{ background: 'var(--acc)', color: 'var(--acc-ink)' }}>{t('save')} {money(v.oldPrice - v.price)}</span> : null}
            </div>

            {p.variants.length > 1 && (
              <div>
                <div className="lbl2">{t('pack')}</div>
                <div className="row" style={{ gap: 10 }}>
                  {p.variants.map(x => (
                    <button key={x.id} className={`chip lg ${x.id === v.id ? 'on' : ''}`} onClick={() => setVid(x.id)}>{tr(x.label)}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="qrow">
              <div>
                <div className="lbl2">{t('subtotal')}</div>
                <div className="sub">{money(v.price * qty)}</div>
              </div>
              <div>
                <div className="lbl2">{t('qty')}</div>
                <div className="qty">
                  <button aria-label="−" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                  <span>{num(qty)}</span>
                  <button aria-label="+" onClick={() => setQty(q => q + 1)}>+</button>
                </div>
              </div>
            </div>

            {/* desktop / tablet buttons (on mobile the sticky bottom bar is used) */}
            <div className="acts">
              <button className="b gold" disabled={!p.inStock} onClick={addToCart}><IconCartPlus /> {t('add_to_cart')}</button>
              <button className="b pri order-now-highlight" disabled={!p.inStock} onClick={buyNow}><IconBox /> {t('buy_now')}</button>
            </div>

            <div className="cw">
              <a className="cwb" href={`tel:${site.phone}`}>
                <IconPhone />
                <span><b>{site.phone}</b><small>{t('call_order')}</small></span>
              </a>
              <a className="cwb" href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`${p.name.en} · ${p.name.bn} (${tr(v.label)}) × ${qty}`)}`} target="_blank" rel="noopener noreferrer">
                <IconWhatsapp />
                <span><b>{t('wa_order')}</b><small>{t('chat_us')}</small></span>
              </a>
            </div>

            <div className="tri">
              <div><i className="ic"><IconTruck /></i><b>{t('fast_del')}</b><small>{t('fast_del_p')}</small></div>
              <div><i className="ic"><IconCash /></i><b>{t('cod')}</b><small>{t('cod_p')}</small></div>
              <div><i className="ic"><IconShield /></i><b>{t('quality')}</b><small>{t('quality_p')}</small></div>
            </div>
          </div>
        </div>
      </div>

      <div className="c" style={{ marginTop: 64 }}>
        <div className="tabs" role="tablist">
          {tabs.map(([id, label]) => (
            <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>
        <div className="dcols">
          <div className="card" style={{ flex: '2 1 560px', display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
            {tab === 'desc' && (
              <>
                <h2>{t('about')}</h2>
                <p>{tr(p.description)}</p>
                <h3>{t('why_choose')}</h3>
                <div className="dots">{p.why[lang]?.map(w => <div key={w}><span>●</span>{w}</div>)}</div>
                <h3>{t('how_enjoy')}</h3>
                <p>{tr(p.how)}</p>
              </>
            )}
            {tab === 'info' && (
              <>
                <h2>{t('tab_nutr')}</h2>
                <p>{t('storage')}: {tr(p.details.storage)}</p>
                <p>{t('shelf')}: {tr(p.details.shelf)}</p>
              </>
            )}
            {tab === 'rev' && (
              <>
                <h2>{t('tab_reviews')}</h2>
                {site.reviews.map(r => (
                  <div key={r.name} className="who" style={{ alignItems: 'flex-start' }}>
                    <i>{r.name.trim().charAt(0)}</i>
                    <div><b>{r.name}</b> <small style={{ display: 'inline' }}>· {r.place}</small><p style={{ marginTop: 4 }}>{r.text}</p></div>
                  </div>
                ))}
              </>
            )}
            {tab === 'del' && (
              <>
                <h2>{t('tab_del')}</h2>
                <p>{t('del_text')}</p>
              </>
            )}
          </div>
          <div className="card" style={{ flex: '1 1 300px', padding: 28, minWidth: 0 }}>
            <h3 style={{ margin: '0 0 8px' }}>{t('details')}</h3>
            <div className="sp"><span>{t('net_weight')}</span><b>{tr(v.label)}</b></div>
            <div className="sp"><span>{t('origin')}</span><b>{tr(p.details.origin)}</b></div>
            <div className="sp"><span>{t('shelf')}</span><b>{tr(p.details.shelf)}</b></div>
            <div className="sp"><span>{t('storage')}</span><b>{tr(p.details.storage)}</b></div>
            <div className="sp"><span>{t('sku')}</span><b>{p.sku}</b></div>
          </div>
        </div>
      </div>

      <div className="c" style={{ marginTop: 72 }}>
        <div className="sh">
          <h2 className="h2" style={{ fontSize: 32 }}>{t('may_like')}</h2>
          <Link className="pill" href="/products">{t('view_all')}</Link>
        </div>
        <div className="g4" style={{ marginTop: 24 }}>
          {related.map(x => <ProductCard key={x.slug} product={x} />)}
        </div>
      </div>

      <div className="sbar">
        <button className="b gold" disabled={!p.inStock} onClick={addToCart}><IconCartPlus /> {t('add_to_cart')}</button>
        <button className="b pri order-now-highlight" disabled={!p.inStock} onClick={buyNow}><IconBox /> {t('buy_now')}</button>
      </div>
    </div>
  );
}
