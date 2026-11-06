import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { X, ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { LuxuryImage } from './LuxuryImage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  // Reset quantity whenever product changes
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setAddedNotice(false);
    }
  }, [product]);

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-[#050302]/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div
        className="relative w-full max-w-3xl bg-[#140E0B] border border-[#3B261A] rounded-xl overflow-hidden shadow-2xl text-[#E8DDD2] max-h-[90vh] flex flex-col md:flex-row"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#9E8C7F] hover:text-[#FDFBF7] bg-[#0E0907]/70 backdrop-blur-sm rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Column */}
        <div className="w-full md:w-1/2 bg-[#0E0907] relative min-h-[260px] md:min-h-[420px] flex items-center justify-center overflow-hidden">
          <LuxuryImage
            src={product.image}
            alt={product.name}
            fallbackTitle={product.name}
            className="w-full h-full object-cover"
            containerClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140E0B] via-transparent to-transparent md:hidden pointer-events-none" />
          
          <div className="absolute top-4 left-4 bg-[#0E0907]/90 border border-[#3B261A] px-3 py-1 rounded text-[11px] uppercase tracking-wider text-[#C5A059] font-medium backdrop-blur-sm">
            {product.cacaoPercentage}% Cacao
          </div>
        </div>

        {/* Product Details Column */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            
            <div className="text-xs uppercase tracking-widest text-[#C5A059]">
              {product.origin}
            </div>

            <h3 id="product-modal-title" className="font-display text-2xl sm:text-3xl font-semibold text-[#FDFBF7] leading-tight">
              {product.name}
            </h3>

            <div className="flex items-baseline justify-between border-b border-[#2A1D15] pb-3">
              <span className="text-xl font-medium text-[#FDFBF7] tabular-nums font-sans">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-[#8E7C6F]">{product.weight}</span>
            </div>

            <p className="text-sm text-[#C4B3A3] leading-relaxed">
              {product.description}
            </p>

            {/* Tasting Notes */}
            <div>
              <p className="text-[11px] uppercase tracking-widest text-[#8E7C6F] mb-2 font-medium">
                Sensory Profile
              </p>
              <div className="flex flex-wrap gap-2">
                {product.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="text-xs px-2.5 py-1 bg-[#1A120D] border border-[#2D1F17] text-[#D8CCC0] rounded"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div className="pt-2 text-xs text-[#8E7C6F] leading-normal border-t border-[#221610]">
              <strong className="text-[#C4B3A3] block mb-1">Pure Ingredients:</strong>
              {product.ingredients}
            </div>

          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-[#2A1D15] mt-6 flex flex-col sm:flex-row items-center gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-[#3B261A] bg-[#0E0907] rounded px-2 py-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 text-[#9E8C7F] hover:text-[#FDFBF7] transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-sans tabular-nums text-sm font-medium text-[#FDFBF7]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 text-[#9E8C7F] hover:text-[#FDFBF7] transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Bag CTA */}
            <button
              type="button"
              onClick={handleAdd}
              disabled={addedNotice}
              className={`flex-1 w-full flex items-center justify-center gap-2 py-3 px-6 text-xs font-semibold uppercase tracking-wider rounded transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${
                addedNotice
                  ? 'bg-[#3A5A40] text-white'
                  : 'bg-[#C5A059] text-[#0E0907] hover:bg-[#D4AF37]'
              }`}
            >
              {addedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag · ${(product.price * quantity).toFixed(2)}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
