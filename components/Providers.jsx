'use client';
import { LangProvider, CartProvider, ToastProvider } from '@/lib/store';

export default function Providers({ children }) {
  return (
    <LangProvider>
      <ToastProvider>
        <CartProvider>{children}</CartProvider>
      </ToastProvider>
    </LangProvider>
  );
}
