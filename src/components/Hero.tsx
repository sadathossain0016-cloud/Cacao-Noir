import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LuxuryImage } from './LuxuryImage';

interface HeroProps {
  onExplore: () => void;
  onOurStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOurStory }) => {
  return (
    <section id="home" className="relative min-h-[85vh] flex items-center pt-10 sm:pt-14 pb-16 overflow-hidden scroll-mt-6">
      {/* Background ambient lighting and subtle radial gradients */}
      <div className="absolute inset-0 bg-[#0E0907] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8F6D38]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#3B2117]/25 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left">
            
            {/* Clean unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium">
              <span>Maison de Chocolat</span>
              <span aria-hidden="true">·</span>
              <span>Single Origin Harvests</span>
              <span aria-hidden="true">·</span>
              <span>Paris &amp; Zurich</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] font-semibold text-[#FDFBF7] tracking-tight text-balance">
              A World of Chocolate, Crafted to Perfection.
            </h1>

            {/* Short Supporting Description */}
            <p className="text-[#C4B3A3] text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Born from rare, ethically harvested heirloom cocoa beans and refined through 72 hours of traditional stone conching. Discover sensory alchemy in every snap, aroma, and lingering note.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={onExplore}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C5A059] text-[#0E0907] font-semibold text-xs uppercase tracking-wider rounded hover:bg-[#D4AF37] transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onOurStory}
                className="inline-flex items-center justify-center px-6 py-4 border border-[#3E2B20] text-[#E8DDD2] hover:text-[#FDFBF7] hover:border-[#C5A059]/60 font-medium text-xs tracking-wider uppercase rounded transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                Discover Our Heritage
              </button>
            </div>

            {/* Trust Markers strip */}
            <div className="pt-8 border-t border-[#221610] grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="font-display text-xl sm:text-2xl text-[#E8DDD2] font-semibold">100%</p>
                <p className="text-xs text-[#9E8C7F] uppercase tracking-wider mt-0.5">Ethical Origin</p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl text-[#E8DDD2] font-semibold">72h</p>
                <p className="text-xs text-[#9E8C7F] uppercase tracking-wider mt-0.5">Stone Conched</p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl text-[#E8DDD2] font-semibold">24K</p>
                <p className="text-xs text-[#9E8C7F] uppercase tracking-wider mt-0.5">Gold Adorned</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer decorative ambient glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#C5A059]/20 via-[#3B2117]/30 to-[#C5A059]/10 rounded-2xl blur-lg opacity-70 transition duration-1000"></div>

              {/* Media Card Container */}
              <div className="relative rounded-xl overflow-hidden border border-[#2D1F17] bg-[#140E0B] shadow-2xl">
                <LuxuryImage
                  src="/src/assets/images/hero_chocolate_artisan_1793963771498.jpg"
                  alt="Artisanal dark chocolate bars broken with delicate gold leaf and cocoa nibs"
                  fallbackTitle="Artisanal Dark Chocolate Slab"
                  className="w-full h-auto aspect-[16/10] sm:aspect-[4/3] object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle scrim & editorial caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0907]/90 via-[#0E0907]/20 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-xs text-[#E8DDD2]">
                  <div>
                    <span className="text-[#C5A059] uppercase tracking-widest text-[11px] block">Signature Batch</span>
                    <span className="font-display text-base text-[#FDFBF7] font-medium">Nocturne Noir Réserve</span>
                  </div>
                  <span className="text-[#9E8C7F] font-mono text-[11px] tracking-wide">Batch No. 048</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
