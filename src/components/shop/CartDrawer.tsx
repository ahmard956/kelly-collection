"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { Button } from '../ui/Button';

export function CartDrawer() {
  const { isOpen, setIsOpen, cart, updateQuantity, removeItem, cartTotal } = useCart();

  const triggerCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Financial system redirection failed.", err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-luxury-pitch border-l border-white/5 z-50 p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-white/5">
                <h2 className="text-sm font-serif tracking-vogue uppercase">Your Selection</h2>
                <button onClick={() => setIsOpen(false)} className="text-[10px] tracking-widest uppercase text-neutral-400 hover:text-white">Close</button>
              </div>

              <div className="overflow-y-auto max-h-[60vh] mt-6 space-y-6 pr-2">
                {cart.length === 0 ? (
                  <p className="text-xs tracking-wide text-neutral-500 py-12 text-center">Your curation manifest is currently empty.</p>
                ) : (
                  cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex items-start space-x-4 border-b border-white/5 pb-6">
                      <div className="relative w-20 aspect-[3/4] bg-neutral-900 flex-shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-grow flex flex-col space-y-1">
                        <h4 className="text-xs uppercase tracking-wide">{item.title}</h4>
                        <p className="text-[10px] text-neutral-400 tracking-wider">Size: {item.size} | Color: {item.color}</p>
                        <div className="flex items-center space-x-4 pt-2">
                          <div className="flex items-center border border-white/10">
                            <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="px-2 py-1 text-xs text-neutral-400 hover:text-white">-</button>
                            <span className="px-2 text-xs font-mono">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="px-2 py-1 text-xs text-neutral-400 hover:text-white">+</button>
                          </div>
                          <button onClick={() => removeItem(item.id, item.size)} className="text-[10px] uppercase text-neutral-500 hover:text-luxury-gold tracking-widest">Remove</button>
                        </div>
                      </div>
                      <p className="text-xs font-mono text-neutral-300">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="border-t border-white/5 pt-6 space-y-4">
                <div className="flex justify-between items-baseline font-light">
                  <span className="text-xs uppercase tracking-vogue">Estimated Total</span>
                  <span className="text-lg font-mono text-luxury-gold">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-neutral-500 italic tracking-wide leading-relaxed">
                  Taxes, customs and verified premium shipping calculated securely during checkout execution.
                </p>
                <div className="pt-2">
                  <Button variant="primary" className="w-full text-center py-5" onClick={triggerCheckout}>
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
