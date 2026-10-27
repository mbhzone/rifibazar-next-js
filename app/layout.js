import Script from 'next/script';
import './globals.css';
import Providers from '@/components/Providers';
import Shell from '@/components/Shell';
import { site } from '@/lib/site';

export const metadata = {
  title: { default: 'Rifi Bazar', template: '%s | Rifi Bazar' },
  description: 'রাজশাহীর খাঁটি আম, খেজুর গুড় ও আচার — সরাসরি আপনার ঘরে। Cash on delivery all over Bangladesh.',
  icons: { icon: '/favicon.png' },
};
export const viewport = { width: 'device-width', initialScale: 1 };

const gtm = `(function(w,d,s,l,i){w[l]=w[l]||[];function loadGTM(){if(w.gtmLoaded)return;w.gtmLoaded=true;w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);}w.addEventListener('load',function(){setTimeout(loadGTM,2000);});['mousedown','mousemove','keydown','touchstart','scroll'].forEach(function(e){w.addEventListener(e,loadGTM,{passive:true,once:true});});})(window,document,'script','dataLayer','${site.gtmId}');`;

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>
        <Script id="gtm" strategy="afterInteractive">{gtm}</Script>
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  );
}
