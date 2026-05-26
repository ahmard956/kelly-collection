import '@/styles/globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/shop/CartDrawer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kelly Collection | Minimalist High Luxury Editorial',
  description: 'Uncompromising silhouette precision built for modern expression vectors inside the United States.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
