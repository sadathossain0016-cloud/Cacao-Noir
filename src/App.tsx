/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OurStory } from './components/OurStory';
import { ProductCollection } from './components/ProductCollection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BrandExperience } from './components/BrandExperience';
import { Newsletter } from './components/Newsletter';
import { ContactSection } from './components/ContactSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

const CART_STORAGE_KEY = 'cacao_noir_cart_v1';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore localStorage errors in private windows or restrictions
    }
    // Default starter item for instant interactive delight
    return [
      {
        product: PRODUCTS[0],
        quantity: 1,
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Toast state
  const [toastProduct, setToastProduct] = useState<Product | null>(null);
  const [toastQty, setToastQty] = useState(1);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });

    // Trigger toast notification
    setToastProduct(product);
    setToastQty(quantity);
  };

  useEffect(() => {
    if (toastProduct) {
      const timer = setTimeout(() => {
        setToastProduct(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastProduct]);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleOrderComplete = () => {
    setCart([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0907] text-[#F8F5F0] flex flex-col font-sans selection:bg-[#C5A059] selection:text-[#0E0907]">
      {/* 3-Zone Navigation with Integrated Announcement Banner */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExplore={() => scrollToSection('collections')}
          onOurStory={() => scrollToSection('story')}
        />

        {/* 2. Our Story Section */}
        <OurStory onExploreCollections={() => scrollToSection('collections')} />

        {/* 3. Product Collection */}
        <ProductCollection
          onAddToCart={handleAddToCart}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

        {/* 4. Brand Experience & Tasting Ritual */}
        <BrandExperience />

        {/* 5. Boutiques & Concierge Contact */}
        <ContactSection />

        {/* 6. Newsletter Subscription */}
        <Newsletter />
      </main>

      {/* 7. Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Product Quick View / Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Private Checkout Modal with simulated receipt confirmation */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        subtotal={cartSubtotal}
        onOrderComplete={handleOrderComplete}
      />

      {/* Toast Notification */}
      <Toast
        product={toastProduct}
        quantity={toastQty}
        onClose={() => setToastProduct(null)}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}
