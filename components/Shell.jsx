'use client';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import Floating from './Floating';
import MobileNav from './MobileNav';

// Checkout has its own slim header/footer (see design), every other page shares these.
export default function Shell({ children }) {
  const path = usePathname();
  if (path && path.startsWith('/checkout')) return <div className="page">{children}</div>;
  return (
    <div className="page">
      <Header />
      {children}
      <Footer />
      <Floating />
      <MobileNav />
    </div>
  );
}
