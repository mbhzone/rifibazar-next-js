'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang, useCart } from '@/lib/store';

const items = [
  { href: '/', key: 'home', label: 'Home', icon: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" /></> },
  { href: '/products', key: 'categories', label: 'Categories', icon: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></> },
  { href: '/products?sale=1', key: 'offers', label: 'Offers', icon: <><path d="M12 3 15 5l4-.2.2 4L21 12l-2 3 .2 4-4 .2L12 21l-3-2-4 .2L4.8 15 3 12l2-3-.2-4 4-.2Z"/><path d="m9 15 6-6M9 9h.01M15 15h.01"/></> },
  { href: '/products', key: 'track', label: 'Track', icon: <><path d="M2 7h12v10H2zM14 10h4l4 4v3h-8"/><circle cx="6" cy="19" r="1.5"/><circle cx="18" cy="19" r="1.5"/></> },
  { href: '/checkout', key: 'cart', label: 'Cart', icon: <><path d="M3 4h3l3 12h10l2-8H7"/><circle cx="10" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></> },
];
export default function MobileNav() {
  const pathname = usePathname();
  const { t } = useLang();
  const cart = useCart();
  return <nav className="mobile-nav" aria-label="Mobile navigation">
    {items.map(item => {
      const active = item.href === '/' ? pathname === '/' : item.key === 'offers' ? false : item.key === 'cart' ? pathname.startsWith('/checkout') : pathname.startsWith('/products');
      const label = item.key === 'categories' ? 'Categories' : item.key === 'offers' ? t('offer_zone') : item.key === 'track' ? t('track') : item.key === 'cart' ? t('cart') : t('home');
      return <Link key={item.key} href={item.href} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined}>
        <span className="mobile-nav-icon"><svg viewBox="0 0 24 24" aria-hidden="true">{item.icon}</svg>{item.key === 'cart' && cart.count > 0 ? <i>{cart.count}</i> : null}</span>
        <small>{label}</small>
      </Link>;
    })}
  </nav>;
}
