import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface LuxuryImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  containerClassName?: string;
}

export const LuxuryImage: React.FC<LuxuryImageProps> = ({
  src,
  alt = 'Cacao Noir Luxury Chocolate',
  fallbackTitle = 'Cacao Noir Confection',
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative w-full h-full min-h-[180px] bg-gradient-to-br from-[#1C120C] via-[#140D09] to-[#0A0605] border border-[#2D1F17] flex flex-col items-center justify-center p-6 text-center select-none ${containerClassName}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-full border border-[#C5A059]/40 bg-[#0E0907] flex items-center justify-center text-[#C5A059] mb-2 shadow-inner">
          <Sparkles className="w-5 h-5" />
        </div>
        <span className="font-display text-sm tracking-widest text-[#FDFBF7] uppercase font-medium">
          Cacao Noir
        </span>
        <span className="text-[11px] text-[#8E7C6F] mt-1 max-w-[180px] truncate">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Subtle loader shimmer before image renders */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#160E0B] animate-pulse pointer-events-none" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        {...props}
      />
    </div>
  );
};
