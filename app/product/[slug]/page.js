import ProductDetail from '@/components/ProductDetail';
import { getProduct, products } from '@/lib/products';

export function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getProduct(params.slug);
  if (!p) return { title: 'Product not found' };
  return {
    title: `${p.name.bn} | ${p.name.en}`,
    description: p.short.bn,
    openGraph: p.images[0] ? { images: [p.images[0]] } : undefined,
  };
}

export default function Page({ params }) {
  return <ProductDetail slug={params.slug} />;
}
