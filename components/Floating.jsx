'use client';
import Link from 'next/link';
import { IconCart } from './Icons';
import { useLang, useCart } from '@/lib/store';
import { site } from '@/lib/site';

export default function Floating() {
  const { t } = useLang();
  const cart = useCart();
  return (
    <>
      <Link href="/checkout" className="fab" aria-label={`${t('cart')}, ${cart.count}`}>
        <IconCart />
        <span>{cart.count}</span>
      </Link>
      <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="chatfab">
        {t('chat')}
      </a>
    </>
  );
}
