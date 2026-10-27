'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import { useLang } from '@/lib/store';
import { categories, products, minPrice, maxDiscount } from '@/lib/products';

const PAGE_SIZE = 12;

export default function ProductsClient() {
  const { t, tr, num } = useLang();
  const router = useRouter();
  const sp = useSearchParams();

  const category = sp.get('category') || '';
  const q = (sp.get('q') || '').trim().toLowerCase();
  const sale = sp.get('sale') === '1';
  const stock = sp.get('stock') === '1';
  const sort = sp.get('sort') || 'latest';
  const pack = sp.get('pack') || '';
  const pmin = sp.get('min') || '';
  const pmax = sp.get('max') || '';
  const page = Math.max(1, parseInt(sp.get('page') || '1', 10) || 1);

  const [minIn, setMinIn] = useState(pmin);
  const [maxIn, setMaxIn] = useState(pmax);
  useEffect(() => { setMinIn(pmin); setMaxIn(pmax); }, [pmin, pmax]);

  const setParams = patch => {
    const n = new URLSearchParams(sp.toString());
    Object.entries(patch).forEach(([k, v]) => (v === '' || v == null ? n.delete(k) : n.set(k, v)));
    if (!('page' in patch)) n.delete('page');
    const s = n.toString();
    router.push(s ? `/products?${s}` : '/products', { scroll: false });
  };

  // pack sizes available (from variant labels)
  const packs = useMemo(() => {
    const map = new Map();
    products.forEach(p => p.variants.forEach(v => map.set(v.id, v.label)));
    return [...map.entries()];
  }, []);

  const list = useMemo(() => {
    let r = products.filter(p => {
      if (category && p.category !== category) return false;
      if (q && !(`${p.name.bn} ${p.name.en} ${p.short.bn} ${p.short.en}`.toLowerCase().includes(q))) return false;
      if (sale && maxDiscount(p) === 0) return false;
      if (stock && !p.inStock) return false;
      if (pack && !p.variants.some(v => v.id === pack)) return false;
      if ((pmin || pmax) && !p.variants.some(v => (!pmin || v.price >= Number(pmin)) && (!pmax || v.price <= Number(pmax)))) return false;
      return true;
    });
    const idx = new Map(products.map((p, i) => [p.slug, i]));
    if (sort === 'low') r = [...r].sort((a, b) => minPrice(a) - minPrice(b));
    else if (sort === 'high') r = [...r].sort((a, b) => minPrice(b) - minPrice(a));
    else if (sort === 'best') r = [...r].sort((a, b) => Number(b.bestseller) - Number(a.bestseller) || b.reviews - a.reviews);
    else r = [...r].sort((a, b) => idx.get(a.slug) - idx.get(b.slug));
    // in-stock first for default views
    return r.sort((a, b) => Number(b.inStock) - Number(a.inStock));
  }, [category, q, sale, stock, pack, pmin, pmax, sort]);

  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const cur = Math.min(page, pages);
  const shown = list.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE);
  const catObj = categories.find(c => c.id === category);
  const title = q ? `${t('search_results')}: “${sp.get('q')}”` : sale ? t('offer_zone') : catObj ? tr(catObj.label) : t('all');

  return (
    <>
      <div className="c" style={{ paddingTop: 28 }}>
        <div className="crumb">
          <Link href="/">{t('home')}</Link> &nbsp;/&nbsp; <Link href="/products">{t('shop')}</Link> &nbsp;/&nbsp; <b>{title}</b>
        </div>
        <div className="sortrow">
          <div>
            <h1 className="lh1">{title}</h1>
            <p className="sub">{num(list.length)} {t('showing')}</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <label htmlFor="sort" className="sub" style={{ margin: 0 }}>{t('sort_by')}</label>
            <select id="sort" value={sort} onChange={e => setParams({ sort: e.target.value === 'latest' ? '' : e.target.value })}>
              <option value="latest">{t('sort_latest')}</option>
              <option value="low">{t('sort_low')}</option>
              <option value="high">{t('sort_high')}</option>
              <option value="best">{t('sort_best')}</option>
            </select>
          </div>
        </div>
        <div className="chips">
          <button className={`chip ${!category ? 'on' : ''}`} onClick={() => setParams({ category: '' })}>{t('all')}</button>
          {categories.map(c => (
            <button key={c.id} className={`chip ${category === c.id ? 'on' : ''}`} onClick={() => setParams({ category: c.id })}>
              {tr(c.label)}
            </button>
          ))}
        </div>
      </div>

      <div className="c lay">
        <aside>
          <div className="fb">
            <h3>{t('price')}</h3>
            <div className="prange">
              <input aria-label={t('min')} placeholder={t('min')} inputMode="numeric" value={minIn} onChange={e => setMinIn(e.target.value.replace(/\D/g, ''))} />
              <span>–</span>
              <input aria-label={t('max')} placeholder={t('max')} inputMode="numeric" value={maxIn} onChange={e => setMaxIn(e.target.value.replace(/\D/g, ''))} />
            </div>
            <button className="apply" onClick={() => setParams({ min: minIn, max: maxIn })}>{t('apply')}</button>
          </div>
          <div className="fb">
            <h3>{t('availability')}</h3>
            <label className="ck"><input type="checkbox" checked={sale} onChange={e => setParams({ sale: e.target.checked ? '1' : '' })} />{t('on_sale')}</label>
            <label className="ck"><input type="checkbox" checked={stock} onChange={e => setParams({ stock: e.target.checked ? '1' : '' })} />{t('in_stock')}</label>
          </div>
          <div className="fb">
            <h3>{t('pack_size')}</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {packs.map(([id, label]) => (
                <button key={id} className={`chip ${pack === id ? 'on' : ''}`} onClick={() => setParams({ pack: pack === id ? '' : id })}>{tr(label)}</button>
              ))}
            </div>
          </div>
          <button className="clr" onClick={() => router.push('/products', { scroll: false })}>{t('clear')}</button>
        </aside>

        <main>
          {shown.length === 0 ? (
            <div className="empty">{t('no_results')}</div>
          ) : (
            <div className="g4 fill">
              {shown.map(p => <ProductCard key={p.slug} product={p} />)}
            </div>
          )}
          {pages > 1 && (
            <div className="pgn">
              {Array.from({ length: pages }, (_, i) => i + 1).map(n => (
                <button key={n} className={`pg ${n === cur ? 'on' : ''}`} onClick={() => setParams({ page: n === 1 ? '' : String(n) })}>{num(n)}</button>
              ))}
              <button className="pg" aria-label="Next page" disabled={cur >= pages} onClick={() => setParams({ page: String(cur + 1) })}>→</button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
