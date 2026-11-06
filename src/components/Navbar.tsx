import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="relative w-full z-40 bg-[#0E0907] border-b border-[#221610]">
      {/* Top Banner Notice */}
      {showBanner && (
        <div className="bg-[#170F0B] border-b border-[#2A1D15] py-2 px-4 text-center text-[11px] text-[#C4B3A3] tracking-widest uppercase flex items-center justify-center relative">
          <div className="flex items-center gap-1.5 truncate pr-6 sm:pr-0">
            <Sparkles className="w-3 h-3 text-[#C5A059] shrink-0" />
            <span className="text-[#C5A059] font-medium hidden sm:inline">Maison de Confection:</span>
            <span>Complimentary express cold shipping on orders over $50</span>
          </div>
          <button
            type="button"
            onClick={() => setShowBanner(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E7C6F] hover:text-[#FDFBF7] p-1 cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 sm:gap-8">
            
            {/* Zone 1: Single text element wordmark */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('home');
              }}
              className="group flex items-center gap-2 whitespace-nowrap shrink-0 text-decoration-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded"
            >
              <span className="font-display text-2xl sm:text-3xl tracking-[0.22em] font-semibold text-[#F6EFE6] transition-colors group-hover:text-[#D4AF37]">
                CACAO NOIR
              </span>
            </a>

            {/* Zone 2: 4-5 concise single-line text navigation links */}
            <nav
              className="hidden md:flex items-center gap-7 lg:gap-8 text-xs lg:text-sm font-medium tracking-wider uppercase text-[#C4B3A3]"
              aria-label="Main Navigation"
            >
              <button
                type="button"
                onClick={() => handleLinkClick('home')}
                className="hover:text-[#F6EFE6] transition-colors py-1 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:text-[#D4AF37]"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('story')}
                className="hover:text-[#F6EFE6] transition-colors py-1 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:text-[#D4AF37]"
              >
                Our Story
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('collections')}
                className="hover:text-[#F6EFE6] transition-colors py-1 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:text-[#D4AF37]"
              >
                Collections
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('experience')}
                className="hover:text-[#F6EFE6] transition-colors py-1 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:text-[#D4AF37]"
              >
                Craft &amp; Sourcing
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('contact')}
                className="hover:text-[#F6EFE6] transition-colors py-1 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:text-[#D4AF37]"
              >
                Boutiques
              </button>
            </nav>

            {/* Zone 3: 1 primary action (Shopping Bag + Mobile Hamburger) */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <button
                type="button"
                onClick={onOpenCart}
                aria-label={`Shopping bag containing ${cartCount} items`}
                className="relative p-2.5 rounded-full border border-[#3B261A] bg-[#1A120D] text-[#E8DDD2] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all cursor-pointer flex items-center justify-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-105" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 bg-[#C5A059] text-[#0E0907] font-sans font-bold text-[11px] rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger menu toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="md:hidden p-2 text-[#E8DDD2] hover:text-[#D4AF37] transition-colors cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden bg-[#140E0B] border-t border-[#2A1D15] px-6 py-6 shadow-2xl animate-in slide-in-from-top duration-200 mt-4"
          >
            <nav className="flex flex-col space-y-4 text-base tracking-wider uppercase font-medium text-[#C4B3A3]">
              <button
                type="button"
                onClick={() => handleLinkClick('home')}
                className="text-left py-2 hover:text-[#F6EFE6] border-b border-[#221610] cursor-pointer"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('story')}
                className="text-left py-2 hover:text-[#F6EFE6] border-b border-[#221610] cursor-pointer"
              >
                Our Story
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('collections')}
                className="text-left py-2 hover:text-[#F6EFE6] border-b border-[#221610] cursor-pointer"
              >
                Collections
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('experience')}
                className="text-left py-2 hover:text-[#F6EFE6] border-b border-[#221610] cursor-pointer"
              >
                Craft &amp; Sourcing
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('contact')}
                className="text-left py-2 hover:text-[#F6EFE6] border-b border-[#221610] cursor-pointer"
              >
                Boutiques &amp; Contact
              </button>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#C5A059] text-[#0E0907] font-semibold text-sm tracking-wider uppercase rounded hover:bg-[#D4AF37] transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  View Shopping Bag ({cartCount})
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
