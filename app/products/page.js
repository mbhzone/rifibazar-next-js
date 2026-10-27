import { Suspense } from 'react';
import ProductsClient from '@/components/ProductsClient';

export const metadata = { title: 'Shop' };

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ProductsClient />
    </Suspense>
  );
}
