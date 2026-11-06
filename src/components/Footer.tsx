import React from 'react';
import { ArrowUp, Instagram, Twitter } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0605] border-t border-[#221610] text-[#8E7C6F] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1A120D]">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="inline-block font-display text-2xl tracking-[0.25em] font-semibold text-[#FDFBF7]"
            >
              CACAO NOIR
            </a>
            <p className="text-xs text-[#9E8C7F] max-w-sm leading-relaxed">
              Purveyors of master-crafted single origin chocolates and rare bean harvests. Handcrafted with reverence for centuries-old confectionery art.
            </p>
            <div className="text-[11px] text-[#7A695C] space-y-1">
              <p>Maison de Haute Chocolaterie · Paris &amp; Zurich</p>
              <p>Direct-Trade Heirloom Sourcing Network</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#FDFBF7] transition-colors cursor-pointer"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('story')}
                  className="hover:text-[#FDFBF7] transition-colors cursor-pointer"
                >
                  Our Heritage &amp; Atelier
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#FDFBF7] transition-colors cursor-pointer"
                >
                  Reserve Collections
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('experience')}
                  className="hover:text-[#FDFBF7] transition-colors cursor-pointer"
                >
                  Craft &amp; Sensory Ritual
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#FDFBF7] transition-colors cursor-pointer"
                >
                  Boutique Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Maison Salons & Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">
              Flagship Salons
            </h4>
            <div className="text-xs space-y-2">
              <p className="text-[#C4B3A3]">
                <strong>Paris:</strong> 28 Rue du Faubourg Saint-Honoré, 75008
              </p>
              <p className="text-[#C4B3A3]">
                <strong>Zurich:</strong> Bahnhofstrasse 45, 8001
              </p>
              <p className="text-[#C4B3A3]">
                <strong>Tokyo:</strong> 6-10-1 Ginza, Chuo-ku
              </p>
              <div className="pt-2 text-[11px] text-[#7A695C]">
                Private degustation bookings: concierge@cacaonoir.com
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip: Social, Copyright, Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="flex items-center gap-6">
            <span className="text-[#7A695C]">
              &copy; {new Date().getFullYear()} CACAO NOIR S.A. All rights reserved.
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-[#9E8C7F]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 hover:text-[#C5A059] transition-colors"
              aria-label="Cacao Noir Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 hover:text-[#C5A059] transition-colors"
              aria-label="Cacao Noir Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <span className="text-[#3B261A]">|</span>
            <span className="text-[11px] text-[#7A695C]">Certified B-Corp &amp; Organic Origin</span>
          </div>

          {/* Back to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-[#9E8C7F] hover:text-[#FDFBF7] transition-colors cursor-pointer group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>

        </div>

      </div>
    </footer>
  );
};
