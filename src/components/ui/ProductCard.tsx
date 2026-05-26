"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  title: string;
  slug: string;
  price: number;
  images: string[];
  categoryName?: string;
}

export function ProductCard({ title, slug, price, images, categoryName }: ProductCardProps) {
  return (
    <Link href={`/shop/${slug}`} className="group block cursor-pointer">
      <div className="relative w-full aspect-[3/4] bg-luxury-charcoal overflow-hidden mb-6">
        <Image
          src={images[0]}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center w-full h-full transition-transform duration-[1.8s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
          loading="lazy"
        />
        {images[1] && (
          <div className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100">
            <Image
              src={images[1]}
              alt={`${title} alternate aspect`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center w-full h-full"
            />
          </div>
        )}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end overflow-hidden">
          <motion.p 
            initial={{ y: 40 }} 
            whileInView={{ y: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-widest bg-luxury-pitch/60 backdrop-blur-md px-3 py-1.5 border border-white/10"
          >
            Quick View
          </motion.p>
        </div>
      </div>
      <div className="flex flex-col space-y-1.5 px-1">
        {categoryName && <span className="text-[9px] uppercase tracking-widest text-neutral-500">{categoryName}</span>}
        <div className="flex justify-between items-baseline">
          <h3 className="text-sm font-light tracking-wide text-neutral-200 group-hover:text-luxury-gold transition-colors duration-300">{title}</h3>
          <p className="text-sm font-mono text-neutral-400">${Number(price).toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}
