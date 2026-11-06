import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, Gift } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [formData, setFormData] = useState({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@example.com',
    address: '742 Evergreen Terrace',
    city: 'New York',
    postalCode: '10021',
    country: 'United States',
    paymentMethod: 'card',
    giftNote: 'With warmest regards, enjoy this rare single-origin experience.',
  });
  const [orderNumber, setOrderNumber] = useState('');

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (step === 'success') {
          handleFinish();
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, step, onClose]);

  if (!isOpen) return null;

  const shippingFee = subtotal >= 50 ? 0 : 9.50;
  const total = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNo = 'CN-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(generatedOrderNo);
    setStep('success');
  };

  const handleFinish = () => {
    onOrderComplete();
    setStep('details');
    onClose();
  };

  const handleClose = () => {
    if (step === 'success') {
      handleFinish();
    } else {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-[#050302]/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-[#140E0B] border border-[#3B261A] rounded-xl overflow-hidden shadow-2xl text-[#E8DDD2] max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#2A1D15] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span id="checkout-modal-title" className="font-display text-xl font-semibold tracking-wider text-[#FDFBF7]">
              CACAO NOIR
            </span>
            <span className="text-xs text-[#C5A059] uppercase tracking-widest">
              · Private Checkout
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#9E8C7F] hover:text-[#FDFBF7] rounded transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-left">
            
            {/* Order items preview summary */}
            <div className="bg-[#0E0907] border border-[#221610] rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-xs text-[#8E7C6F] uppercase tracking-wider pb-1 border-b border-[#1A120D]">
                <span>Items in Order ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</span>
                <span>Subtotal</span>
              </div>
              <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center text-xs">
                    <span className="text-[#E8DDD2] truncate max-w-[260px] sm:max-w-[320px]">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="text-[#C4B3A3] tabular-nums font-mono">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-[#1A120D] flex justify-between text-xs text-[#C4B3A3]">
                <span>Temperature-controlled thermal packaging</span>
                <span className="text-[#C5A059]">Complimentary</span>
              </div>
              <div className="flex justify-between text-xs text-[#C4B3A3]">
                <span>Courier Express Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-[#C5A059]">FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#FDFBF7] pt-1">
                <span>Total Due</span>
                <span className="text-[#D4AF37] font-sans tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping Recipient Details */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-[#C5A059] font-medium flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                Shipping Destination
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="sr-only" htmlFor="checkout-first-name">First name</label>
                  <input
                    id="checkout-first-name"
                    type="text"
                    required
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0E0907] border border-[#2A1D15] rounded text-xs text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="checkout-last-name">Last name</label>
                  <input
                    id="checkout-last-name"
                    type="text"
                    required
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0E0907] border border-[#2A1D15] rounded text-xs text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="sr-only" htmlFor="checkout-email">Email</label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    placeholder="Email for dispatch updates"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0E0907] border border-[#2A1D15] rounded text-xs text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="checkout-address">Street address</label>
                  <input
                    id="checkout-address"
                    type="text"
                    required
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0E0907] border border-[#2A1D15] rounded text-xs text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="sr-only" htmlFor="checkout-city">City</label>
                  <input
                    id="checkout-city"
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0E0907] border border-[#2A1D15] rounded text-xs text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="checkout-postal">Postal Code</label>
                  <input
                    id="checkout-postal"
                    type="text"
                    required
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0E0907] border border-[#2A1D15] rounded text-xs text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="checkout-country">Country</label>
                  <input
                    id="checkout-country"
                    type="text"
                    required
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0E0907] border border-[#2A1D15] rounded text-xs text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-[#C5A059] font-medium flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5" />
                Select Payment Method
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`p-3 rounded border text-xs cursor-pointer flex flex-col items-center justify-center text-center transition-colors ${
                  formData.paymentMethod === 'card' ? 'border-[#C5A059] bg-[#1F1510]' : 'border-[#2A1D15] bg-[#0E0907]'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="sr-only"
                  />
                  <span className="font-medium text-[#FDFBF7]">Credit Card</span>
                  <span className="text-[10px] text-[#8E7C6F] mt-0.5">Visa / Mastercard / Amex</span>
                </label>

                <label className={`p-3 rounded border text-xs cursor-pointer flex flex-col items-center justify-center text-center transition-colors ${
                  formData.paymentMethod === 'applepay' ? 'border-[#C5A059] bg-[#1F1510]' : 'border-[#2A1D15] bg-[#0E0907]'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="applepay"
                    checked={formData.paymentMethod === 'applepay'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'applepay' })}
                    className="sr-only"
                  />
                  <span className="font-medium text-[#FDFBF7]">Apple Pay</span>
                  <span className="text-[10px] text-[#8E7C6F] mt-0.5">Instant biometric</span>
                </label>

                <label className={`p-3 rounded border text-xs cursor-pointer flex flex-col items-center justify-center text-center transition-colors ${
                  formData.paymentMethod === 'cod' ? 'border-[#C5A059] bg-[#1F1510]' : 'border-[#2A1D15] bg-[#0E0907]'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="sr-only"
                  />
                  <span className="font-medium text-[#FDFBF7]">Pay upon Delivery</span>
                  <span className="text-[10px] text-[#8E7C6F] mt-0.5">White-glove concierge</span>
                </label>
              </div>
            </div>

            {/* Gift Note */}
            <div className="space-y-1.5">
              <label htmlFor="checkout-gift-note" className="text-[11px] uppercase tracking-wider text-[#8E7C6F] flex items-center gap-1 font-medium">
                <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
                Optional Gold-Embossed Gift Card Note
              </label>
              <textarea
                id="checkout-gift-note"
                rows={2}
                value={formData.giftNote}
                onChange={(e) => setFormData({ ...formData, giftNote: e.target.value })}
                className="w-full px-3 py-2 bg-[#0E0907] border border-[#2A1D15] rounded text-xs text-[#FDFBF7] focus:outline-none focus:border-[#C5A059] resize-none"
                placeholder="Include a personal message for the recipient..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-[#C5A059] text-[#0E0907] font-semibold text-xs uppercase tracking-wider rounded hover:bg-[#D4AF37] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm &amp; Place Order · ${total.toFixed(2)}</span>
              </button>
              <p className="text-[11px] text-center text-[#7A695C] mt-2">
                Simulated secure 256-bit SSL encrypted transaction. No funds will be charged.
              </p>
            </div>

          </form>
        ) : (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#1A261D] border border-[#3A5A40] flex items-center justify-center text-[#4E8752]">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#C5A059]">Order Confirmed</span>
              <h3 className="font-display text-3xl font-semibold text-[#FDFBF7]">
                Thank You, {formData.firstName}.
              </h3>
              <p className="text-sm text-[#C4B3A3] max-w-md mx-auto">
                Your order <strong className="text-[#FDFBF7] font-mono">{orderNumber}</strong> has been received by our master confectioners and scheduled for hand-assembly.
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="bg-[#0E0907] border border-[#2A1D15] rounded-xl p-5 text-left text-xs space-y-3 max-w-md mx-auto">
              <div className="flex justify-between border-b border-[#1F1510] pb-2">
                <span className="text-[#8E7C6F]">Estimated Dispatch:</span>
                <span className="text-[#FDFBF7] font-medium">Tomorrow, 09:00 CET</span>
              </div>
              <div className="flex justify-between border-b border-[#1F1510] pb-2">
                <span className="text-[#8E7C6F]">Destination:</span>
                <span className="text-[#FDFBF7] text-right truncate max-w-[220px]">
                  {formData.address}, {formData.city}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#1F1510] pb-2">
                <span className="text-[#8E7C6F]">Confirmation Sent To:</span>
                <span className="text-[#FDFBF7] font-mono">{formData.email}</span>
              </div>
              <div className="flex justify-between pt-1 font-semibold text-sm">
                <span className="text-[#8E7C6F]">Total Paid:</span>
                <span className="text-[#D4AF37] tabular-nums font-sans">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleFinish}
              className="px-8 py-3 bg-[#C5A059] text-[#0E0907] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#D4AF37] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
            >
              Return to Maison
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
