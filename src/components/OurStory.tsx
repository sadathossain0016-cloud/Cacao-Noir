import React, { useState, useEffect } from 'react';
import { BookOpen, Check, X } from 'lucide-react';
import { LuxuryImage } from './LuxuryImage';

interface OurStoryProps {
  onExploreCollections: () => void;
}

export const OurStory: React.FC<OurStoryProps> = ({ onExploreCollections }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lock scroll and handle escape key for story modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <>
      <section id="story" className="py-24 bg-[#140E0B] border-y border-[#221610] relative overflow-hidden scroll-mt-6">
        {/* Ambient warmth */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Craftsmanship Photography */}
            <div className="lg:col-span-6 relative order-2 lg:order-1">
              <div className="relative rounded-xl overflow-hidden border border-[#2D1F17] bg-[#0E0907] shadow-xl group">
                <LuxuryImage
                  src="/src/assets/images/story_conching_craft_1793963771935.jpg"
                  alt="Master chocolatier pouring molten dark chocolate into confectionery molds"
                  fallbackTitle="Master Chocolatier Conching Atelier"
                  className="w-full h-auto aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle vignette scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0907]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-5 left-6 right-6">
                  <div className="inline-block px-3 py-1 bg-[#0E0907]/85 backdrop-blur-sm border border-[#3B261A] text-[11px] uppercase tracking-widest text-[#C5A059] mb-1.5 rounded">
                    L'Atelier des Arts
                  </div>
                  <p className="text-xs text-[#C4B3A3] italic">
                    Hand-tempered in small 30-kilogram batches using vintage French copper cauldrons.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Brand Story */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium">
                <span>Our Heritage</span>
                <span aria-hidden="true">·</span>
                <span>Est. 1928</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#FDFBF7] tracking-tight leading-[1.15]">
                Born from Reverence for the Sacred Bean.
              </h2>

              <p className="text-[#C4B3A3] text-base leading-relaxed">
                At CACAO NOIR, chocolate is treated not as a commercial commodity, but as fine wine—a direct expression of terroir, altitude, and patience. Founded in a quaint cobbled alley in Montmartre and now uniting generations of Swiss and French chocolatiers, our maison exists to revive pure unadulterated cocoa.
              </p>

              <p className="text-[#9E8C7F] text-sm leading-relaxed">
                We bypass mass-industrial emulsifiers, chemical alkalization, and artificial vanillin. Instead, we source rare Criollo and Nacional varieties from smallholder agroforestry cooperatives, roasting them gently over slow fires and conching for up to three full days until every floral, fruity, and smoky nuance blooms.
              </p>

              {/* Master Chocolatier Quote */}
              <div className="pt-2 pb-2 pl-4 border-l-2 border-[#C5A059] my-4">
                <blockquote className="text-[#E8DDD2] italic font-display text-lg">
                  "True chocolate is not an indulgence to consume hurriedly; it is a quiet ceremony of taste, memory, and stillness."
                </blockquote>
                <cite className="block text-xs uppercase tracking-wider text-[#8F6D38] mt-2 not-italic font-sans">
                  — Henri de Montmirail, Master Chocolatier
                </cite>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1F1510] border border-[#3E2B20] hover:border-[#C5A059] text-[#FDFBF7] text-xs font-semibold uppercase tracking-wider rounded transition-all duration-200 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                >
                  <BookOpen className="w-4 h-4 text-[#C5A059] transition-transform group-hover:scale-110" />
                  <span>Discover Our Story</span>
                </button>

                <button
                  type="button"
                  onClick={onExploreCollections}
                  className="text-xs uppercase tracking-wider text-[#C5A059] hover:text-[#E5C378] transition-colors py-2 cursor-pointer font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded px-2"
                >
                  Browse Creations &rarr;
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Story Deep-Dive Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-[#050302]/80 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="story-modal-title"
        >
          <div
            className="relative w-full max-w-2xl bg-[#140E0B] border border-[#3B261A] rounded-xl p-6 sm:p-8 shadow-2xl text-[#E8DDD2] max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-[#9E8C7F] hover:text-[#FDFBF7] transition-colors rounded-full hover:bg-[#221610] cursor-pointer"
              aria-label="Close story modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059]">
                <span>The CACAO NOIR Chronicle</span>
              </div>

              <h3 id="story-modal-title" className="font-display text-2xl sm:text-3xl font-semibold text-[#FDFBF7]">
                A Century of Pure Bean-to-Bar Craftsmanship
              </h3>

              <div className="space-y-4 text-sm text-[#C4B3A3] leading-relaxed">
                <p>
                  In the winter of 1928, our founder began selecting single-sack cocoa shipments arriving in the old ports of Le Havre and Marseille. Unlike commercial makers who prioritized uniform sweetness, he sought out the rebellious, untamed notes of volcanic soils and jungle canopies.
                </p>
                <p>
                  Today, our beans are sourced directly through long-term partnerships with heirloom cacao conservators across Madagascar, the Ucayali Basin in Peru, and the Esmeraldas coastline of Ecuador. We pay more than three times the Fairtrade baseline to protect century-old cocoa forests from deforestation.
                </p>
                <p>
                  Inside our workshop, time slows down. We roast at sub-120°C temperatures to preserve delicate antioxidant flavonoids and volatile aromatic esters. Our heavy granite melangeurs grind nibs and organic cane sugar continuously for 72 uninterrupted hours, yielding an impossibly silky 16-micron particle size that melts effortlessly upon contact with warmth.
                </p>
              </div>

              <div className="p-4 bg-[#0E0907] border border-[#2A1D15] rounded-lg">
                <h4 className="text-xs uppercase tracking-wider text-[#C5A059] font-semibold mb-2">
                  Our Three Unwavering Commitments
                </h4>
                <ul className="space-y-2 text-xs text-[#E8DDD2]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span><strong>100% Single-Estate Traceability:</strong> Every batch is numbered and stamped with farm coordinates.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span><strong>Zero Emulsifiers &amp; Soy Lecithin:</strong> Pure cacao butter only, never substitute vegetable fats.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span><strong>Plastic-Free Presentation:</strong> Biodegradable inner plant foil with hand-bound recyclable fiber cases.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 bg-[#C5A059] text-[#0E0907] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#D4AF37] transition-colors cursor-pointer"
                >
                  Close &amp; Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
