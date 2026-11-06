import React, { useState } from 'react';
import { Eye, Volume2, Wind, Sparkles, Clock } from 'lucide-react';
import { LuxuryImage } from './LuxuryImage';

export const BrandExperience: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const RITUAL_STEPS = [
    {
      num: '01',
      title: 'Observe the Sheen',
      icon: Eye,
      description: 'Hold the chocolate up to natural light. A pristine bar boasts a satin, flawless mirror gloss with zero air pockets—the signature mark of master hand-tempering.',
    },
    {
      num: '02',
      title: 'Hear the Crisp Snap',
      icon: Volume2,
      description: 'Break a corner between your fingers close to your ear. The sharp, resonant acoustic snap confirms perfect cocoa butter crystal formulation (Beta-V crystals).',
    },
    {
      num: '03',
      title: 'Inhale the Bouquet',
      icon: Wind,
      description: 'Rub the fractured edge slightly and inhale. Notice initial top notes of wild red currant, honeyed wood, and roasted macadamia blooming from the warmth.',
    },
    {
      num: '04',
      title: 'Slow Palate Melt',
      icon: Sparkles,
      description: 'Place a piece flat against your tongue without chewing. Allow body temperature to dissolve the 16-micron particles into an uninterrupted, velvet texture.',
    },
    {
      num: '05',
      title: 'The Lingering Finish',
      icon: Clock,
      description: 'Breathe out gently as it melts. Grand Cru cocoa leaves a clean, non-greasy finish on the palate that gently reverberates for minutes after.',
    },
  ];

  return (
    <section id="experience" className="py-24 bg-[#140E0B] border-t border-[#221610] relative scroll-mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium mb-2">
            <span>The Alchemy of Taste</span>
            <span aria-hidden="true">·</span>
            <span>Uncompromising Purity</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#FDFBF7] tracking-tight leading-[1.15]">
            From Sacred Pod to Transcendent Bite.
          </h2>
          <p className="mt-4 text-[#C4B3A3] text-base leading-relaxed">
            Every creation at CACAO NOIR is guided by ancient confectionery wisdom and modern sensory science. We celebrate the raw soul of the cocoa tree through four unyielding pillars.
          </p>
        </div>

        {/* 4 Pillars of Craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 text-left">
          
          <div className="p-6 bg-[#0E0907] border border-[#221610] rounded-xl flex flex-col justify-between space-y-4 hover:border-[#3B261A] transition-colors">
            <div className="text-[#C5A059] font-display text-2xl font-bold">I.</div>
            <div>
              <h3 className="font-display text-xl text-[#FDFBF7] font-semibold mb-2">
                Ancient Heirloom Cultivars
              </h3>
              <p className="text-xs text-[#9E8C7F] leading-relaxed">
                We solely cultivate unhybridized Criollo and Trinitario beans, preserving genetic cocoa strains cultivated before mass-industrial hybridization.
              </p>
            </div>
            <span className="text-[11px] uppercase tracking-wider text-[#C5A059]">0% Bulk Hybrids</span>
          </div>

          <div className="p-6 bg-[#0E0907] border border-[#221610] rounded-xl flex flex-col justify-between space-y-4 hover:border-[#3B261A] transition-colors">
            <div className="text-[#C5A059] font-display text-2xl font-bold">II.</div>
            <div>
              <h3 className="font-display text-xl text-[#FDFBF7] font-semibold mb-2">
                Sub-120°C Gentle Roasting
              </h3>
              <p className="text-xs text-[#9E8C7F] leading-relaxed">
                Rather than scorched rapid roasting, our convection drums toast slowly over low flame, coaxing out bright fruit acids and delicate jasmine aromatics.
              </p>
            </div>
            <span className="text-[11px] uppercase tracking-wider text-[#C5A059]">Nutrient Preserved</span>
          </div>

          <div className="p-6 bg-[#0E0907] border border-[#221610] rounded-xl flex flex-col justify-between space-y-4 hover:border-[#3B261A] transition-colors">
            <div className="text-[#C5A059] font-display text-2xl font-bold">III.</div>
            <div>
              <h3 className="font-display text-xl text-[#FDFBF7] font-semibold mb-2">
                72-Hour Granite Conching
              </h3>
              <p className="text-xs text-[#9E8C7F] leading-relaxed">
                Granite stone rollers grind continuously for 3 days and nights. Harsh tannins naturally evaporate, producing unearthly silkiness without chemical additives.
              </p>
            </div>
            <span className="text-[11px] uppercase tracking-wider text-[#C5A059]">Pure Cocoa Butter</span>
          </div>

          <div className="p-6 bg-[#0E0907] border border-[#221610] rounded-xl flex flex-col justify-between space-y-4 hover:border-[#3B261A] transition-colors">
            <div className="text-[#C5A059] font-display text-2xl font-bold">IV.</div>
            <div>
              <h3 className="font-display text-xl text-[#FDFBF7] font-semibold mb-2">
                Zero Emulsifiers or Soy
              </h3>
              <p className="text-xs text-[#9E8C7F] leading-relaxed">
                We reject soy lecithin, palm oils, artificial aroma, and excessive sugars. Our chocolate contains only single-harvest cocoa and organic cane juice.
              </p>
            </div>
            <span className="text-[11px] uppercase tracking-wider text-[#C5A059]">100% Honest Clean</span>
          </div>

        </div>

        {/* Sensory Tasting Ritual Interactive Showcase */}
        <div className="bg-[#0E0907] rounded-2xl border border-[#2D1F17] overflow-hidden p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Origin Photography */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-xl overflow-hidden border border-[#3B261A] group">
                <LuxuryImage
                  src="/src/assets/images/craft_cocoa_origin_1793963774262.jpg"
                  alt="Raw heirloom cocoa pods split open with fresh beans and sea salt"
                  fallbackTitle="Artisanal Raw Cacao Pods & Salt"
                  className="w-full h-auto aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0907]/90 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 text-xs text-[#E8DDD2]">
                  <span className="text-[#C5A059] uppercase tracking-widest text-[11px] block font-medium">Estate Harvest</span>
                  <span>Pure Peruvian Criollo Cacao &amp; Sea Salt Flakes</span>
                </div>
              </div>
            </div>

            {/* Right: The 5-Step Tasting Ritual */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium">The Connoisseur's Ritual</span>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#FDFBF7] mt-1">
                  How to Taste Fine Dark Chocolate
                </h3>
                <p className="text-xs text-[#9E8C7F] mt-1">
                  Select a step below to learn the sommelier method for evaluating Grand Cru chocolate.
                </p>
              </div>

              {/* Ritual Step Buttons */}
              <div
                className="grid grid-cols-5 gap-1.5 sm:gap-2 border-b border-[#221610] pb-4"
                role="tablist"
                aria-label="Chocolate tasting ritual steps"
              >
                {RITUAL_STEPS.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = activeStep === index;
                  return (
                    <button
                      key={step.num}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveStep(index)}
                      className={`flex flex-col items-center p-2 rounded-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059] ${
                        isActive
                          ? 'bg-[#1F1510] border border-[#C5A059] text-[#FDFBF7]'
                          : 'text-[#8E7C6F] hover:text-[#E8DDD2] hover:bg-[#140E0B]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1 ${isActive ? 'text-[#C5A059]' : 'text-[#8E7C6F]'}`} />
                      <span className="text-[11px] font-mono">{step.num}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Content */}
              <div
                className="p-5 bg-[#140E0B] rounded-xl border border-[#221610] space-y-3"
                role="tabpanel"
                aria-live="polite"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#C5A059] font-semibold">
                    Step {RITUAL_STEPS[activeStep].num}
                  </span>
                  <span className="text-xs text-[#8E7C6F]">/ 05</span>
                  <h4 className="font-display text-lg text-[#FDFBF7] font-medium ml-2">
                    {RITUAL_STEPS[activeStep].title}
                  </h4>
                </div>
                <p className="text-sm text-[#C4B3A3] leading-relaxed">
                  {RITUAL_STEPS[activeStep].description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#8E7C6F] pt-2 gap-2">
                <span>Recommended tasting temperature: 20°C - 22°C (68°F - 72°F)</span>
                <span className="text-[#C5A059]">Zero Artificial Preservatives</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
