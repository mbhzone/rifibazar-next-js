'use client';
import Link from 'next/link';
import { useLang } from '@/lib/store';
import { categories } from '@/lib/products';
import { site } from '@/lib/site';

export default function Footer() {
  const { t, tr } = useLang();
  return (
    <div className="ft">
      <div className="c grid">
        <div className="fc" style={{ gap: 14 }}>
          <div className="brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="" />
            Rifi Bazar
          </div>
          <p className="desc">{t('footer_desc')}</p>
          <div className="fc">
            <span>{tr(site.address)}</span>
            <a href={`tel:${site.phone}`}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
        <div className="fc">
          <b>{t('f_shop')}</b>
          {categories.map(c => (
            <Link key={c.id} href={`/products?category=${c.id}`}>{tr(c.label)}</Link>
          ))}
          <Link href="/products">{t('all_cats')}</Link>
        </div>
        <div className="fc">
          <b>{t('f_company')}</b>
          <a href="#">{t('about_us')}</a>
          <a href="#">{t('contact_us')}</a>
          <a href="#">{t('privacy')}</a>
          <a href="#">{t('terms')}</a>
        </div>
        <div className="fc">
          <b>{t('f_help')}</b>
          <a href="#">{t('how_order')}</a>
          <a href="#">{t('track')}</a>
          <a href="#">{t('shipping')}</a>
          <a href="#">{t('returns')}</a>
          <a href="#">{t('faq')}</a>
        </div>
      </div>
      <div className="c">
        <div className="bar">
          <span>© Rifi Bazar. {t('rights')}</span>
          <span className="pay"><i>COD</i></span>
        </div>
      </div>
    </div>
  );
}
