import React from 'react';
import { ArrowRight, Star, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ProductImage } from './ProductImage';

// Generated assets
import heroFashionModel from '../assets/images/hero_fashion_model_1790199437353.jpg';
import heroRunningShoe from '../assets/images/hero_running_shoe_1790199449857.jpg';
import techSmartwatch from '../assets/images/tech_smartwatch_1790199492981.jpg';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Find products for quick addition from floating cards
  const airMax = PRODUCTS.find((p) => p.id === 'air-max-270') || PRODUCTS[1];
  const smartwatch = PRODUCTS.find((p) => p.id === 'smart-watch-series-9') || PRODUCTS[3];
  const headphones = PRODUCTS.find((p) => p.id === 'wireless-headphones') || PRODUCTS[2];
  const bottle = PRODUCTS.find((p) => p.id === 'stainless-steel-bottle') || PRODUCTS[4];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#FDFDFD] to-[#F7F7F5] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT SIDE: Copy and Actions */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-6 sm:space-y-8 z-10 text-center lg:text-left">
            {/* Orange Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF5A36]/10 text-[#FF5A36] text-xs font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36] animate-ping" />
              TRENDING NOW
            </div>

            {/* Large Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111111] tracking-tight leading-[1.1] text-balance">
              Discover Products <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#111111] to-[#FF5A36]">
                You'll Love
              </span>
            </h1>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-[#737373] leading-relaxed max-w-xl mx-auto lg:mx-0">
              Shop the latest products curated for modern lifestyles. Premium athletic footwear, tailored apparel, minimalist home aesthetics, and acoustic essentials.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-7 py-4 bg-[#FF5A36] hover:bg-[#FF7048] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/shop?filter=new"
                className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-[#F7F7F5] text-[#111111] border border-[#E8E8E8] hover:border-[#111111] rounded-xl font-bold text-sm transition-all flex items-center justify-center"
              >
                Explore Collection
              </Link>
            </div>

            {/* Customer Social Proof */}
            <div className="pt-4 border-t border-[#E8E8E8] flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Customer avatar"
                  referrerPolicy="no-referrer"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Customer avatar"
                  referrerPolicy="no-referrer"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                  alt="Customer avatar"
                  referrerPolicy="no-referrer"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                  alt="Customer avatar"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FF5A36] text-[#FF5A36]" />
                  ))}
                  <span className="text-xs font-bold text-[#111111] ml-1">4.9/5</span>
                </div>
                <p className="text-xs text-[#737373] mt-0.5">
                  Trusted by <span className="font-semibold text-[#111111]">50,000+ customers</span> worldwide
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Hero Lifestyle Composition & 4 Floating Product Cards */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center">
            {/* Background geometric curved accent */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#FF5A36]/15 via-[#FF7048]/5 to-transparent rounded-[2.5rem] transform -rotate-1 pointer-events-none" />

            {/* Main Hero Container */}
            <div className="relative w-full max-w-lg aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border border-white/60 bg-gradient-to-b from-[#F5F5F3] to-[#EAE9E5]">
              <ProductImage
                src={heroFashionModel}
                alt="NovaCart Modern Lifestyle Model in Designer Chair"
                className="w-full h-full object-cover object-center"
              />

              {/* Gradient scrim for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Subtle Overlay Tag */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#FF5A36] block">
                    Curated Edit
                  </span>
                  <span className="text-xs font-bold text-[#111111]">
                    Autumn / Winter 2026 Collection
                  </span>
                </div>
                <button
                  onClick={() => navigate('/shop')}
                  className="px-3 py-1.5 bg-[#111111] hover:bg-[#FF5A36] text-white text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1"
                >
                  Shop Look <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* FLOATING CARD 1: Running Shoes (Top Left) */}
            <div
              onClick={() => navigate(`/product/${airMax.id}`)}
              className="absolute -top-3 left-0 sm:-left-6 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-xl border border-[#E8E8E8] flex items-center gap-3 cursor-pointer hover:border-[#FF5A36] transition-all duration-300 animate-float-slow hover:scale-105 z-20 max-w-[170px] sm:max-w-[200px]"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F7F7F5] overflow-hidden shrink-0 border border-[#E8E8E8]/60 p-1">
                <img
                  src={heroRunningShoe}
                  alt="Running Shoes"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-[#111111] truncate">Running Shoes</h4>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs font-extrabold text-[#FF5A36] tabular-nums">$129.99</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(airMax);
                    }}
                    className="p-1 rounded-full bg-[#F7F7F5] hover:bg-[#FF5A36] hover:text-white transition-colors"
                    title="Quick add"
                  >
                    <ShoppingBag className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* FLOATING CARD 2: Smart Watch (Top Right) */}
            <div
              onClick={() => navigate(`/product/${smartwatch.id}`)}
              className="absolute top-8 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-xl border border-[#E8E8E8] flex items-center gap-3 cursor-pointer hover:border-[#FF5A36] transition-all duration-300 animate-float-medium hover:scale-105 z-20 max-w-[170px] sm:max-w-[200px]"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F7F7F5] overflow-hidden shrink-0 border border-[#E8E8E8]/60 p-1">
                <img
                  src={techSmartwatch}
                  alt="Smart Watch"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-[#111111] truncate">Smart Watch</h4>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs font-extrabold text-[#111111] tabular-nums">$199.99</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(smartwatch);
                    }}
                    className="p-1 rounded-full bg-[#F7F7F5] hover:bg-[#FF5A36] hover:text-white transition-colors"
                    title="Quick add"
                  >
                    <ShoppingBag className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* FLOATING CARD 3: Wireless Headphones (Mid Left) */}
            <div
              onClick={() => navigate(`/product/${headphones.id}`)}
              className="absolute bottom-28 -left-3 sm:-left-8 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-xl border border-[#E8E8E8] flex items-center gap-3 cursor-pointer hover:border-[#FF5A36] transition-all duration-300 animate-float-delayed hover:scale-105 z-20 max-w-[170px] sm:max-w-[210px]"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F7F7F5] overflow-hidden shrink-0 border border-[#E8E8E8]/60 p-1">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80"
                  alt="Wireless Headphones"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-[#111111] truncate">Wireless Headphones</h4>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs font-extrabold text-[#111111] tabular-nums">$99.99</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(headphones);
                    }}
                    className="p-1 rounded-full bg-[#F7F7F5] hover:bg-[#FF5A36] hover:text-white transition-colors"
                    title="Quick add"
                  >
                    <ShoppingBag className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* FLOATING CARD 4: Stainless Steel Bottle (Bottom Right) */}
            <div
              onClick={() => navigate(`/product/${bottle.id}`)}
              className="absolute bottom-16 -right-3 sm:-right-8 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-xl border border-[#E8E8E8] flex items-center gap-3 cursor-pointer hover:border-[#FF5A36] transition-all duration-300 animate-float-slow hover:scale-105 z-20 max-w-[170px] sm:max-w-[200px]"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F7F7F5] overflow-hidden shrink-0 border border-[#E8E8E8]/60 p-1">
                <img
                  src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=200&q=80"
                  alt="Stainless Steel Bottle"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-[#111111] truncate">Steel Bottle</h4>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs font-extrabold text-[#111111] tabular-nums">$24.99</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(bottle);
                    }}
                    className="p-1 rounded-full bg-[#F7F7F5] hover:bg-[#FF5A36] hover:text-white transition-colors"
                    title="Quick add"
                  >
                    <ShoppingBag className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
