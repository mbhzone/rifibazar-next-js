'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IconUser, IconHeart, IconCart, IconSearch } from './Icons';
import { useLang, useCart } from '@/lib/store';
import { categories } from '@/lib/products';

export default function Header() {
  const { t, tr, money } = useLang();
  const cart = useCart();
  const router = useRouter();
  const [q, setQ] = useState('');

  const onSearch = e => {
    e.preventDefault();
    const s = q.trim();
    router.push(s ? `/products?q=${encodeURIComponent(s)}` : '/products');
  };

  return (
    <>
      <div className="topbar">
        <div className="c">
          <span>{t('free_delivery')}</span>
          <span className="r">
            <Link href="/products">{t('track')}</Link>
            <Link href="/products">{t('help')}</Link>
          </span>
        </div>
      </div>

      <div className="mobile-head">
        <div className="mobile-head-row">
          <button className="mobile-menu" type="button" aria-label="Open categories" onClick={() => router.push('/products')}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <Link href="/" className="logo mobile-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="" />
            <span>Rifi Bazar</span>
          </Link>
          <Link className="mobile-track" href="/products" aria-label={t('track')}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 7h12v10H2zM14 10h4l4 4v3h-8"/><circle cx="6" cy="19" r="1.5"/><circle cx="18" cy="19" r="1.5"/></svg>
          </Link>
        </div>
        <form className="search mobile-search" onSubmit={onSearch} role="search">
          <input aria-label={t('search')} placeholder={t('search_ph')} value={q} onChange={e => setQ(e.target.value)} />
          <button type="submit" aria-label={t('search')}><IconSearch /></button>
        </form>
      </div>

      <div className="c hd">
        <Link href="/" className="logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="" />
          Rifi Bazar
        </Link>
        <form className="search" onSubmit={onSearch} role="search">
          <input aria-label={t('search')} placeholder={t('search_ph')} value={q} onChange={e => setQ(e.target.value)} />
          <button type="submit" aria-label={t('search')}><IconSearch /></button>
        </form>
        <div className="hic">
          <a className="ic" href="#" aria-label={t('account')} onClick={e => e.preventDefault()}><IconUser /></a>
          <a className="ic" href="#" aria-label={t('wishlist')} onClick={e => e.preventDefault()}><IconHeart /></a>
          <Link className="ic cartpill" href="/checkout" aria-label={`${t('cart')}, ${cart.count}`}>
            <IconCart />
            {cart.count} · {money(cart.subtotal)}
          </Link>
        </div>
      </div>

      <div className="navwrap">
        <div className="c nv">
          <Link className="offer" href="/products?sale=1">{t('offer_zone')}</Link>
          {categories.map(c => (
            <Link key={c.id} href={`/products?category=${c.id}`}>{tr(c.label)}</Link>
          ))}
        </div>
      </div>
    </>
  );
}
