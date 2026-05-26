"use client";

import React, { useEffect, useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Prevents luxury micro-animations and hydration states from shifting layouts unexpectedly
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-luxury-pitch text-white flex items-center justify-center font-serif tracking-cinematic text-xs uppercase animate-pulse">
        Kelly Collection
      </div>
    );
  }

  return (
    <CartProvider>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-between">
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </div>
      <CartDrawer />
    </CartProvider>
  );
}
