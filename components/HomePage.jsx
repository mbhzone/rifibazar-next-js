'use client';
import Link from 'next/link';
import { useState } from 'react';
import Img from './Img';
import ProductCard from './ProductCard';
import { IconLeaf, IconTruck, IconReturn } from './Icons';
import { useLang } from '@/lib/store';
import { categories, products } from '@/lib/products';
import { site } from '@/lib/site';

function SectionHead({ title, sub, href, cta }) {
  return (
    <div className="sh">
      <div>
        <h2 className="h2">{title}</h2>
        {sub ? <p className="sub">{sub}</p> : null}
      </div>
      <Link className="pill" href={href}>{cta}</Link>
    </div>
  );
}

export default function HomePage() {
  const { t, tr } = useLang();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const heroImages = ['/images/hero.webp', '/images/farm-1.webp', '/images/farm-2.webp'];

  const best = products.filter(p => p.inStock && p.bestseller).slice(0, 4);
  const byCat = id => products.filter(p => p.category === id);
  const mango = byCat('aam').slice(0, 3);
  const gur = byCat('khejur-gur').slice(0, 4);
  const achar = byCat('achar').slice(0, 4);

  return (
    <>
      {/* HERO */}
      <div className="c hero-wrap" style={{ marginTop: 28 }}>
        <div className="hero">
          <div className="hero-copy" style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
            <span className="tag">{t('hero_tag')}</span>
            <h1>{t('hero_1')}<br />{t('hero_2')}<br />{t('hero_3')}</h1>
            <p>{t('hero_p')}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link className="btn" href="/products">{t('shop_now')}</Link>
              <Link className="ghost" href="/products?sale=1">{t('view_offers')}</Link>
            </div>
          </div>
          <div className="photo hero-photo">
            <Img src={heroImages[heroSlide]} alt="Rifi Bazar fresh products" label="Hero photo" />
            <button type="button" className="hero-arrow prev" onClick={() => setHeroSlide(i => (i + heroImages.length - 1) % heroImages.length)} aria-label="Previous slide">‹</button>
            <button type="button" className="hero-arrow next" onClick={() => setHeroSlide(i => (i + 1) % heroImages.length)} aria-label="Next slide">›</button>
            <div className="hero-dots" aria-label="Choose hero slide">
              {heroImages.map((src, i) => <button key={src} type="button" className={i === heroSlide ? 'active' : ''} onClick={() => setHeroSlide(i)} aria-label={`Slide ${i + 1}`} />)}
            </div>
          </div>
          <div className="mobile-gur-visual" aria-label="Khejur gur product illustration">
            <Img src="/images/khejur-gur-hero.svg" alt="খাঁটি খেজুরের গুড়" label="Khejur gur" />
          </div>
        </div>
        <div className="trust">
          <div className="rv"><i className="ic"><IconLeaf /></i><div><b>{t('t1_h')}</b><small>{t('t1_p')}</small></div></div>
          <div className="rv"><i className="ic"><IconTruck /></i><div><b>{t('t2_h')}</b><small>{t('t2_p')}</small></div></div>
          <div className="rv"><i className="ic"><IconReturn /></i><div><b>{t('t3_h')}</b><small>{t('t3_p')}</small></div></div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="c sec" style={{ marginTop: 64 }}>
        <div className="sh">
          <div><h2 className="h2">{t('shop_by_cat')}</h2></div>
          <Link className="pill" href="/products">{t('all_cats')}</Link>
        </div>
        <div className="cats">
          {categories.map(c => {
            const first = byCat(c.id).find(p => p.images[0]);
            return (
              <Link key={c.id} href={`/products?category=${c.id}`}>
                <div className="circ"><Img src={first?.images[0]} alt={tr(c.label)} label="Img" /></div>
                <p>{tr(c.label)}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* BEST SELLERS */}
      <div className="c sec">
        <SectionHead title={t('best_sellers')} sub={t('best_sub')} href="/products" cta={t('view_all')} />
        <div className="g4" style={{ marginTop: 28 }}>
          {best.map(p => <ProductCard key={p.slug} product={p} mode="best" />)}
        </div>
      </div>

      {/* BRANDS (hidden until you add logos in lib/site.js) */}
      {site.brands.length > 0 && (
        <div className="brands">
          <div className="c">
            <p className="lbl">{t('brands')}</p>
            <div className="row">
              {site.brands.map(b => (
                <div key={b.name}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={b.src} alt={b.name} /></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* KHEJUR GUR */}
      <div className="c sec">
        <SectionHead title={t('gur_h')} sub={t('gur_sub')} href="/products?category=khejur-gur" cta={t('view_all_gur')} />
        <div className="g4" style={{ marginTop: 28 }}>
          {gur.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </div>

      {/* MANGO + promo */}
      <div className="c sec">
        <SectionHead title={t('mango_h')} sub={t('mango_sub')} href="/products?category=aam" cta={t('view_all_mango')} />
        <div className="promo-row">
          <div className="promo">
            <b>{t('promo_h1')}<br />{t('promo_h2')}</b>
            <span>{t('promo_p')}</span>
            <Link className="btn" href="/products?category=aam" style={{ alignSelf: 'flex-start' }}>{t('shop_mango')}</Link>
          </div>
          <div className="g4" style={{ minWidth: 0 }}>
            {mango.map(p => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </div>

      {/* ACHAR */}
      <div className="c sec">
        <SectionHead title={t('achar_h')} sub={t('achar_sub')} href="/products?category=achar" cta={t('view_all_achar')} />
        <div className="g4" style={{ marginTop: 28 }}>
          {achar.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </div>

      {/* WHY */}
      <div className="c sec">
        <div className="why">
          <div className="photo"><Img src="/images/farm-1.webp" alt="" label="Farm photo" /></div>
          <div className="col">
            <h2 className="h2">{t('why_h')}</h2>
            <p>{t('why_p')}</p>
            <div className="li"><span>✓ {t('why_1')}</span><span>✓ {t('why_2')}</span><span>✓ {t('why_3')}</span></div>
            <Link className="btn dk" href="/products" style={{ alignSelf: 'flex-start' }}>{t('our_story')}</Link>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="c sec">
        <h2 className="h2" style={{ textAlign: 'center' }}>{t('reviews_h')}</h2>
        <div className="revs">
          {site.reviews.map(r => (
            <div className="rv" key={r.name}>
              <div className="q">“</div>
              <p>{r.text}</p>
              <div className="who">
                <i>{r.name.trim().charAt(0)}</i>
                <div><b>{r.name}</b><small>{r.place}</small></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="c sec">
        <div className="news">
          <div><div className="t">{t('news_h')}</div><div style={{ marginTop: 4 }}>{t('news_p')}</div></div>
          {done ? (
            <b>{t('subscribed')}</b>
          ) : (
            <form onSubmit={e => { e.preventDefault(); if (email.includes('@')) setDone(true); }}>
              <input type="email" aria-label="Email" placeholder={t('news_ph')} value={email} onChange={e => setEmail(e.target.value)} />
              <button type="submit">{t('subscribe')}</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
