'use client';
import Link from 'next/link';
import Img from './Img';
import { IconEye } from './Icons';
import { useLang } from '@/lib/store';
import { maxDiscount, minPrice, maxPrice } from '@/lib/products';

/* Product card — "Read more" style (white card, thin border, square photo,
   bold name, green price + struck old price, full-width green button). */
export default function ProductCard({ product, mode }) {
  const { t, tr, money, num } = useLang();
  const p = product;
  const multi = p.variants.length > 1;
  const v = p.variants[0];
  const disc = maxDiscount(p);
  const href = `/product/${p.slug}`;

  let tag = null;
  if (!p.inStock) tag = <span className="tg so">{t('stock_out')}</span>;
  else if (mode === 'best' && p.bestseller) tag = <span className="tg g">{t('best_seller')}</span>;
  else if (disc > 0) tag = <span className="tg">-{disc}%</span>;

  return (
    <div className={`pc${p.inStock ? '' : ' out'}`}>
      <Link href={href} className="pimg">
        <Img src={p.images[0]} alt={`${p.name.en} · ${p.name.bn}`} />
        {tag}
      </Link>
      <Link href={href} className="nm">{`${p.name.en} · ${p.name.bn}`}</Link>
      <div className="pf">
        {multi ? (
          <span className="pr">{money(minPrice(p))} – {num(maxPrice(p))}</span>
        ) : (
          <>
            <span className="pr">{money(v.price)}</span>
            {v.oldPrice && p.inStock ? <span className="old">{money(v.oldPrice)}</span> : null}
          </>
        )}
      </div>
      <Link href={href} className="rm"><IconEye /> {t('read_more')}</Link>
    </div>
  );
}
