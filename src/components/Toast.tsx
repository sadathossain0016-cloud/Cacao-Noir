import React from 'react';
import { ShoppingBag, CheckCircle, X } from 'lucide-react';
import { Product } from '../types';
import { LuxuryImage } from './LuxuryImage';

interface ToastProps {
  product: Product | null;
  quantity: number;
  onClose: () => void;
  onOpenCart: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  product,
  quantity,
  onClose,
  onOpenCart,
}) => {
  if (!product) return null;

  return (
    <div
      className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-sm w-full bg-[#1A120D] border border-[#C5A059]/40 rounded-xl p-4 shadow-2xl animate-in slide-in-from-bottom duration-300 text-[#E8DDD2]"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <LuxuryImage
          src={product.image}
          alt={product.name}
          fallbackTitle={product.name}
          className="w-12 h-12 rounded object-cover border border-[#2D1F17] shrink-0"
          containerClassName="w-12 h-12 shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[#C5A059] text-xs font-medium mb-0.5">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Added to Tasting Bag</span>
          </div>
          <p className="font-display text-sm font-medium text-[#FDFBF7] truncate">
            {product.name}
          </p>
          <p className="text-[11px] text-[#8E7C6F]">
            Qty: {quantity} · ${(product.price * quantity).toFixed(2)}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-[#8E7C6F] hover:text-[#FDFBF7] p-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059] rounded"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 pt-2.5 border-t border-[#2A1D15] flex justify-end">
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenCart();
          }}
          className="text-xs uppercase tracking-wider text-[#C5A059] hover:text-[#E5C378] font-semibold cursor-pointer flex items-center gap-1 focus-visible:outline-none focus-visible:underline"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>View Bag &amp; Checkout &rarr;</span>
        </button>
      </div>
    </div>
  );
};
