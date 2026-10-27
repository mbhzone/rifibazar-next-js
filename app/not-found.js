import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="c" style={{ padding: '80px 28px', textAlign: 'center' }}>
      <h1 className="h2">404</h1>
      <p className="sub">Page not found / পেজটি পাওয়া যায়নি</p>
      <br />
      <Link className="btn dk" href="/">Home</Link>
    </div>
  );
}
