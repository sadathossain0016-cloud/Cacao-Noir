import React, { useEffect } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { LuxuryImage } from './LuxuryImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  // Lock body & html scroll completely and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      // 1. Completely lock background webpage scrolling on body and html
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('cart-drawer-open');
      document.documentElement.classList.add('cart-drawer-open');
      window.addEventListener('keydown', handleKeyDown);
    } else {
      // 2. Remove overflow: hidden from body and html to resume normal scrolling
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('cart-drawer-open');
      document.documentElement.classList.remove('cart-drawer-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('cart-drawer-open');
      document.documentElement.classList.remove('cart-drawer-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 50.0;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <>
      {/* Background Backdrop Overlay (blocks background scroll and wheel events) */}
      <div
        onClick={onClose}
        onWheel={(e) => e.preventDefault()}
        onTouchMove={(e) => e.preventDefault()}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 9998,
        }}
        className={`transition-opacity duration-300 ease-in-out cursor-pointer touch-none ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      />

      {/* Cart Drawer Panel: only the tasting bag sidebar remains scrollable internally */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '400px',
          height: '100vh',
          zIndex: 9999,
          overscrollBehavior: 'contain',
        }}
        className={`bg-[#140E0B] border-l border-[#2D1F17] shadow-2xl flex flex-col overflow-y-auto overflow-x-hidden overscroll-contain transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart Drawer"
        aria-hidden={!isOpen}
      >
        {/* Sticky Header so close button is always conveniently reachable */}
        <div className="sticky top-0 z-10 bg-[#140E0B]/95 backdrop-blur-md p-5 border-b border-[#221610] flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
            <h2 className="font-display text-2xl font-semibold text-[#FDFBF7]">
              Your Tasting Bag
            </h2>
            <span className="text-xs font-mono text-[#8E7C6F]">
              ({totalItems})
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#9E8C7F] hover:text-[#FDFBF7] transition-colors rounded-full hover:bg-[#221610] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Complimentary Shipping Progress Banner */}
        <div className="bg-[#0E0907] px-5 py-3 border-b border-[#221610] shrink-0">
          <div className="flex justify-between items-center text-xs text-[#C4B3A3] mb-1.5">
            <span>
              {remainingForFreeShipping === 0 ? (
                <span className="text-[#C5A059] font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Complimentary Express Cold Shipping Unlocked!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#FDFBF7] font-mono">${remainingForFreeShipping.toFixed(2)}</strong> for free delivery
                </span>
              )}
            </span>
            <span className="font-mono text-[11px] text-[#8E7C6F]">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#1F1510] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8F6D38] to-[#C5A059] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Item List (flowing naturally within the drawer) */}
        <div className="p-5 space-y-3.5 flex-1">
          {cartItems.length === 0 ? (
            <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full bg-[#1A120D] border border-[#2D1F17] flex items-center justify-center text-[#8E7C6F]">
                <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
              </div>
              <div>
                <p className="font-display text-xl text-[#FDFBF7] font-medium">
                  Your bag is empty
                </p>
                <p className="text-xs text-[#8E7C6F] mt-1 max-w-xs">
                  Explore our single-origin tablets, smoked ganache truffles, and tasting coffrets.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-[#C5A059] text-[#0E0907] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#D4AF37] transition-colors cursor-pointer"
              >
                Explore Creations
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="p-3 bg-[#0E0907] border border-[#221610] rounded-xl flex items-center gap-3 transition-all"
              >
                <LuxuryImage
                  src={item.product.image}
                  alt={item.product.name}
                  fallbackTitle={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover border border-[#2A1D15] shrink-0"
                  containerClassName="w-16 h-16 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-sm font-medium text-[#FDFBF7] truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] text-[#8E7C6F] truncate">
                    {item.product.origin.split(',')[0]} · {item.product.cacaoPercentage}% Cacao
                  </p>
                  <p className="text-xs font-semibold text-[#D4AF37] tabular-nums mt-0.5">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between h-full space-y-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-[#7A695C] hover:text-rose-400 p-1.5 transition-colors cursor-pointer"
                    aria-label={`Remove ${item.product.name} from bag`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#2A1D15] bg-[#140E0B] rounded">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="px-2 py-0.5 text-[#9E8C7F] hover:text-[#FDFBF7] text-xs cursor-pointer"
                      aria-label={`Decrease quantity of ${item.product.name}`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-mono tabular-nums text-[#FDFBF7]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="px-2 py-0.5 text-[#9E8C7F] hover:text-[#FDFBF7] text-xs cursor-pointer"
                      aria-label={`Increase quantity of ${item.product.name}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Natural Checkout Footer: sits at the very bottom of the bag content */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-[#0E0907] border-t border-[#221610] space-y-3 mt-auto shrink-0">
            <div className="space-y-1.5 text-xs text-[#9E8C7F]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#FDFBF7] font-sans font-medium text-sm tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Packaging</span>
                <span className="text-[#C5A059]">Signature Gold Linen Box</span>
              </div>
              <div className="flex justify-between">
                <span>Insulated Cold Shipping</span>
                <span>{remainingForFreeShipping === 0 ? <strong className="text-[#C5A059]">Free</strong> : '$9.50'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1F1510] flex justify-between items-baseline">
              <span className="font-display text-lg text-[#FDFBF7]">Estimated Total</span>
              <span className="font-sans text-xl font-bold text-[#D4AF37] tabular-nums">
                ${(subtotal + (remainingForFreeShipping === 0 ? 0 : 9.50)).toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              className="w-full py-3.5 bg-[#C5A059] text-[#0E0907] font-semibold text-xs uppercase tracking-wider rounded hover:bg-[#D4AF37] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#7A695C]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Cold-pack guarantee · 100% satisfaction promised</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
