import React from 'react';
import { Award, Globe, ShieldCheck, Users, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductImage } from '../components/ProductImage';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24">
      {/* Hero */}
      <section className="bg-[#F7F7F5] border-b border-[#E8E8E8] py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-xs uppercase font-bold tracking-wider text-[#FF5A36] block">
            About NovaCart
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#111111]">
            Curating Exceptional Goods For The Modern Era
          </h1>
          <p className="text-sm sm:text-base text-[#737373] leading-relaxed max-w-2xl mx-auto">
            Founded with a singular conviction: online shopping should be intuitive, aesthetic, and trustworthy. We engineer a frictionless platform bridging premium craftsmanship with contemporary lifestyles.
          </p>
        </div>
      </section>

      {/* Story & Visual split */}
      <section id="story" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs uppercase font-bold text-[#FF5A36] tracking-wider">
              Our Heritage
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
              Designed For Longevity, Not Seasonal Disposability
            </h2>
            <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
              In an era dominated by hyper-fast disposable consumption, NovaCart curates enduring goods. From precision-woven organic heavyweight cotton to titanium smart wearables and acoustic audio monitors, every item is vetted across strict tactile and durability benchmarks.
            </p>
            <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
              We partner directly with independent design studios and ethical manufacturers globally, bypassing unnecessary distributors to bring you exceptional value without compromise.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E8E8E8]">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-[#111111] block">50K+</span>
                <span className="text-xs text-[#737373]">Worldwide Customers</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-[#FF5A36] block">99.4%</span>
                <span className="text-xs text-[#737373]">Satisfaction Rate</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-[#E8E8E8]">
            <ProductImage
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80"
              alt="NovaCart Design Studio"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 bg-[#F7F7F5] border-y border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold text-[#FF5A36] tracking-wider block mb-1">
              Core Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">
              The NovaCart Standard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-3xl border border-[#E8E8E8] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FF5A36]/10 text-[#FF5A36] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#111111]">Curated Excellence</h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                We reject 94% of applicant catalog items. Only products meeting strict material integrity and architectural refinement make the cut.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-[#E8E8E8] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FF5A36]/10 text-[#FF5A36] flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#111111]">Carbon Neutral Delivery</h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                100% of transport emissions are automatically offset through accredited global reforestation and green energy initiatives.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-[#E8E8E8] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FF5A36]/10 text-[#FF5A36] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#111111]">Guaranteed Authenticity</h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                Every unit carries verified serial authentication and backed by our full 30-day money-back guarantee with zero restocking fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-20 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">
          Ready to experience modern shopping?
        </h2>
        <p className="text-xs sm:text-sm text-[#737373] mt-2 mb-6">
          Explore our new arrivals and take advantage of free shipping on orders over $50.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF5A36] hover:bg-[#FF7048] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all"
        >
          <span>Shop The Collection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};
