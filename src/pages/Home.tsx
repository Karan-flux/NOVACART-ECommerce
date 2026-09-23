import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { ServiceFeatures } from '../components/ServiceFeatures';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { PromoBanner } from '../components/PromoBanner';
import { CuratedCollection } from '../components/CuratedCollection';
import { Newsletter } from '../components/Newsletter';
import { TrustSection } from '../components/TrustSection';
import { QuickViewModal } from '../components/QuickViewModal';
import { PRODUCTS, CATEGORIES, Product } from '../data/products';

export const Home: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // New Arrivals (specifically the 6 required items)
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 6);

  // Best Sellers (specifically the 6 required items)
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 6);

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Service Benefits */}
      <ServiceFeatures />

      {/* 3. Shop by Categories */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 sm:mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF5A36] block mb-1">
                Explore Collections
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#111111]">
                Shop by Categories
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs sm:text-sm font-bold text-[#111111] hover:text-[#FF5A36] inline-flex items-center gap-1.5 transition-colors group"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {CATEGORIES.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                image={category.image}
                count={category.count}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. New Arrivals */}
      <section className="py-14 sm:py-20 bg-[#F7F7F5] border-y border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FF5A36] text-white">
                  Just In
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#737373]">
                  Season Essentials
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#111111]">
                New Arrivals
              </h2>
              <p className="text-xs sm:text-sm text-[#737373] mt-1">
                Fresh picks, just added to NovaCart.
              </p>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <Link
                to="/shop?filter=new"
                className="text-xs sm:text-sm font-bold text-[#111111] hover:text-[#FF5A36] inline-flex items-center gap-1.5 transition-colors group mr-2"
              >
                <span>View All New Arrivals</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Responsive Grid: Desktop 4, Tablet 3, Mobile 2 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Promotional Banners */}
      <PromoBanner />

      {/* 6. Best Sellers */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#111111] text-white">
                  Top Rated
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#737373]">
                  Community Loved
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#111111]">
                Best Sellers
              </h2>
              <p className="text-xs sm:text-sm text-[#737373] mt-1">
                Customer favorites worth adding to your cart.
              </p>
            </div>

            <Link
              to="/shop?filter=bestseller"
              className="text-xs sm:text-sm font-bold text-[#111111] hover:text-[#FF5A36] inline-flex items-center gap-1.5 transition-colors group"
            >
              <span>View All Best Sellers</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showSubtitle={true}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Curated For You (Featured Collections) */}
      <CuratedCollection />

      {/* 8. Trust Section */}
      <TrustSection />

      {/* 9. Newsletter Section */}
      <Newsletter />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
