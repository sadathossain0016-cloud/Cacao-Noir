import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import { LuxuryImage } from './LuxuryImage';

interface ProductCollectionProps {
  onAddToCart: (product: Product, quantity?: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCollection: React.FC<ProductCollectionProps> = ({
  onAddToCart,
  onSelectProduct,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'bars' | 'truffles' | 'boxes'>('all');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredProducts = PRODUCTS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1200);
  };

  return (
    <section id="collections" className="py-24 bg-[#0E0907] relative scroll-mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#221610] pb-6 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium mb-2">
              <span>Pure Single Terroirs</span>
              <span aria-hidden="true">·</span>
              <span>Handmade Confections</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#FDFBF7] tracking-tight">
              The Autumn Reserve Collection
            </h2>
          </div>

          {/* Functional Category Filter Segmented Control */}
          <div
            className="flex items-center p-1 bg-[#140E0B] border border-[#2A1D15] rounded-lg self-start md:self-auto overflow-x-auto max-w-full"
            role="tablist"
            aria-label="Product categories"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs font-medium tracking-wider uppercase rounded-md transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059] ${
                activeCategory === 'all'
                  ? 'bg-[#2A1D15] text-[#FDFBF7] shadow-sm'
                  : 'text-[#9E8C7F] hover:text-[#E8DDD2]'
              }`}
            >
              All Creations ({PRODUCTS.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'bars'}
              onClick={() => setActiveCategory('bars')}
              className={`px-4 py-2 text-xs font-medium tracking-wider uppercase rounded-md transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059] ${
                activeCategory === 'bars'
                  ? 'bg-[#2A1D15] text-[#FDFBF7] shadow-sm'
                  : 'text-[#9E8C7F] hover:text-[#E8DDD2]'
              }`}
            >
              Tablets
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'truffles'}
              onClick={() => setActiveCategory('truffles')}
              className={`px-4 py-2 text-xs font-medium tracking-wider uppercase rounded-md transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059] ${
                activeCategory === 'truffles'
                  ? 'bg-[#2A1D15] text-[#FDFBF7] shadow-sm'
                  : 'text-[#9E8C7F] hover:text-[#E8DDD2]'
              }`}
            >
              Truffles &amp; Pralinés
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'boxes'}
              onClick={() => setActiveCategory('boxes')}
              className={`px-4 py-2 text-xs font-medium tracking-wider uppercase rounded-md transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059] ${
                activeCategory === 'boxes'
                  ? 'bg-[#2A1D15] text-[#FDFBF7] shadow-sm'
                  : 'text-[#9E8C7F] hover:text-[#E8DDD2]'
              }`}
            >
              Gift Coffrets
            </button>
          </div>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isJustAdded = justAddedId === product.id;

            return (
              <div
                key={product.id}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProduct(product);
                  }
                }}
                onClick={() => onSelectProduct(product)}
                aria-label={`View details for ${product.name}, price $${product.price.toFixed(2)}`}
                className="group relative bg-[#140E0B] rounded-xl border border-[#221610] hover:border-[#3B261A] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] bg-[#0A0605] overflow-hidden">
                  <LuxuryImage
                    src={product.image}
                    alt={product.name}
                    fallbackTitle={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  
                  {/* Subtle top & bottom scrims */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140E0B] via-transparent to-black/20 pointer-events-none" />

                  {/* Cacao percentage badge */}
                  <div className="absolute top-3 left-3 bg-[#0E0907]/85 backdrop-blur-sm border border-[#2A1D15] px-2.5 py-1 text-[11px] uppercase tracking-wider text-[#C5A059] font-medium rounded">
                    {product.cacaoPercentage}% Cacao
                  </div>

                  {/* Quick View Button overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 bg-black/40">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0E0907]/90 text-[#FDFBF7] text-xs uppercase tracking-wider rounded border border-[#3B261A] shadow-md backdrop-blur-sm">
                      <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                      Quick View
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#8E7C6F] uppercase tracking-wider">
                      <span>{product.origin.split(',')[0]}</span>
                      <span>{product.weight}</span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#9E8C7F] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Tasting Notes as clean typographic tags */}
                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {product.tastingNotes.slice(0, 2).map((note) => (
                        <span
                          key={note}
                          className="text-[11px] text-[#C4B3A3] bg-[#1A120D] px-2 py-0.5 rounded border border-[#251912]"
                        >
                          {note}
                        </span>
                      ))}
                      {product.tastingNotes.length > 2 && (
                        <span className="text-[11px] text-[#8E7C6F] px-1 py-0.5">
                          +{product.tastingNotes.length - 2} notes
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Price & Add to Bag Row */}
                  <div className="pt-4 border-t border-[#221610] flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-wider text-[#8E7C6F]">Price</span>
                      <span className="text-lg font-medium text-[#FDFBF7] tabular-nums font-sans">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(product, e)}
                      aria-label={`Add ${product.name} to bag`}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${
                        isJustAdded
                          ? 'bg-[#3A5A40] text-white shadow-sm'
                          : 'bg-[#C5A059] text-[#0E0907] hover:bg-[#D4AF37]'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sensory Guarantee strip */}
        <div className="mt-16 p-6 rounded-xl bg-[#140E0B] border border-[#221610] grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">Temperature-Guaranteed</span>
            <p className="text-xs text-[#9E8C7F]">Shipped with chilled thermal insulation and biodegradable dry packs year-round.</p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">Single-Estate Harvests</span>
            <p className="text-xs text-[#9E8C7F]">Directly traded beans paying 300% above conventional commodities pricing.</p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">Signature Packaging</span>
            <p className="text-xs text-[#9E8C7F]">Each order arrives in our embossed dark chocolate linen keepsake box.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
