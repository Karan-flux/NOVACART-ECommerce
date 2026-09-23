import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductImage } from './ProductImage';

// Generated assets
import promoFlashShoe from '../assets/images/promo_flash_shoe_1790199469040.jpg';
import promoCollection from '../assets/images/promo_collection_1790199481379.jpg';

export const PromoBanner: React.FC = () => {
  // Real ticking countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 15,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (n: number) => n.toString().padStart(2, '0');

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* LEFT: Flash Sale Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FF5A36] via-[#FF6D4A] to-[#FF8C68] p-8 sm:p-10 flex flex-col justify-between min-h-[340px] shadow-lg group">
            {/* Background Image Composition */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-3/5 overflow-hidden pointer-events-none opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out">
              <ProductImage
                src={promoFlashShoe}
                alt="NovaCart Flash Sale Sneaker"
                className="w-full h-full object-cover object-center mix-blend-screen"
              />
            </div>

            {/* Scrim for text clarity */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF5A36] via-[#FF5A36]/80 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 max-w-sm space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Flash Sale
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Up To 70% Off
              </h3>
              <p className="text-white/80 text-xs sm:text-sm font-medium">
                Limited inventory markdown on performance footwear and modern apparel.
              </p>
            </div>

            {/* Countdown timer & CTA */}
            <div className="relative z-10 pt-6 space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white/80" />
                <div className="flex items-center gap-2 text-white">
                  <div className="bg-black/25 backdrop-blur-xs px-2.5 py-1.5 rounded-lg text-center min-w-[42px]">
                    <span className="block text-sm sm:text-base font-black tabular-nums leading-none">
                      {formatNum(timeLeft.hours)}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-white/70">Hours</span>
                  </div>
                  <span className="font-bold">:</span>
                  <div className="bg-black/25 backdrop-blur-xs px-2.5 py-1.5 rounded-lg text-center min-w-[42px]">
                    <span className="block text-sm sm:text-base font-black tabular-nums leading-none">
                      {formatNum(timeLeft.minutes)}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-white/70">Mins</span>
                  </div>
                  <span className="font-bold">:</span>
                  <div className="bg-black/25 backdrop-blur-xs px-2.5 py-1.5 rounded-lg text-center min-w-[42px]">
                    <span className="block text-sm sm:text-base font-black tabular-nums leading-none">
                      {formatNum(timeLeft.seconds)}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-white/70">Secs</span>
                  </div>
                </div>
              </div>

              <div>
                <Link
                  to="/shop?filter=sale"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#111111] hover:bg-[#111111] hover:text-white rounded-xl text-xs font-bold transition-all shadow-md group-hover:shadow-lg"
                >
                  <span>Shop Sale</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: New Collection Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-[#111111] p-8 sm:p-10 flex flex-col justify-between min-h-[340px] shadow-lg group">
            {/* Background Image */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-3/5 overflow-hidden pointer-events-none opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out">
              <ProductImage
                src={promoCollection}
                alt="NovaCart Fall/Winter Collection Model"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Contrast Scrim */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/85 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 max-w-sm space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FF5A36]/20 text-[#FF5A36] text-[11px] font-bold uppercase tracking-wider border border-[#FF5A36]/30">
                New Collection
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Fall / Winter 2026
              </h3>
              <p className="text-[#A3A3A3] text-xs sm:text-sm font-normal leading-relaxed">
                Discover the latest styles and fresh essentials tailored for cold-weather layering and everyday versatility.
              </p>
            </div>

            {/* CTA Button */}
            <div className="relative z-10 pt-6">
              <Link
                to="/shop?filter=new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5A36] hover:bg-[#FF7048] text-white rounded-xl text-xs font-bold transition-all shadow-md group-hover:shadow-lg"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
