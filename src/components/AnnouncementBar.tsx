import React from 'react';
import { Sparkles, Truck, Tag } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#111111] text-white text-[11px] sm:text-xs py-2 px-4 select-none relative z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center font-normal tracking-wide">
        <div className="flex items-center gap-2 sm:gap-6 flex-wrap justify-center">
          <span className="inline-flex items-center gap-1.5 text-white/90">
            <Truck className="w-3.5 h-3.5 text-[#FF5A36]" />
            Free Worldwide Shipping on Orders Over $50
          </span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="inline-flex items-center gap-1.5 text-white/90">
            <Tag className="w-3.5 h-3.5 text-[#FF5A36]" />
            Summer Sale Up To 70% Off
          </span>
          <span className="hidden md:inline text-white/30">|</span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-white/90">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A36]" />
            Limited Time Deals
          </span>
        </div>
      </div>
    </div>
  );
};
