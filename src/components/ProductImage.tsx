import React, { useState } from 'react';
import { Package, Sparkles } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackCategory?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  fallbackCategory = 'Product',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`bg-gradient-to-br from-[#F5F5F3] to-[#EBEAE6] flex flex-col items-center justify-center text-[#737373] p-4 select-none ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-[#111111] mb-2">
          <Package className="w-5 h-5 text-[#FF5A36]" />
        </div>
        <span className="text-xs font-medium text-[#111111] text-center line-clamp-1 max-w-[140px]">
          {alt || fallbackCategory}
        </span>
        <span className="text-[10px] text-[#737373] mt-0.5 uppercase tracking-wider">
          NovaCart Premium
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#F7F7F5] ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#F5F5F3] animate-pulse flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-[#E8E8E8]" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      />
    </div>
  );
};
