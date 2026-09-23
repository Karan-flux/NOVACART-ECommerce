import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpDown, SlidersHorizontal, Star } from 'lucide-react';
import { PRODUCTS, CATEGORIES, Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { ProductImage } from '../components/ProductImage';

export const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Normalize category parameter
  const formattedCategory = useMemo(() => {
    if (!category) return 'Fashion';
    return category.replace(/-/g, ' ');
  }, [category]);

  const currentCategoryData = CATEGORIES.find(
    (c) => c.id.toLowerCase() === category?.toLowerCase() || c.name.toLowerCase() === formattedCategory.toLowerCase()
  ) || {
    id: category || 'all',
    name: formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1),
    description: 'Curated products for modern lifestyles.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    count: 'Collection',
  };

  const categoryProducts = useMemo(() => {
    return PRODUCTS.filter(
      (p) => p.category.toLowerCase() === currentCategoryData.name.toLowerCase()
    ).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [currentCategoryData.name, sortBy]);

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-20">
      {/* Category Hero Banner */}
      <div className="relative bg-[#111111] text-white py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <ProductImage
            src={currentCategoryData.image}
            alt={currentCategoryData.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Collections
          </Link>

          <span className="text-xs uppercase font-bold tracking-wider text-[#FF5A36] block mb-1">
            Category Showcase
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {currentCategoryData.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#A3A3A3] mt-2 max-w-xl leading-relaxed">
            {currentCategoryData.description}
          </p>
        </div>
      </div>

      {/* Category Submenu navigation */}
      <div className="bg-[#F7F7F5] border-b border-[#E8E8E8] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  cat.id === category || cat.name.toLowerCase() === formattedCategory.toLowerCase()
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'bg-white text-[#737373] hover:text-[#111111] border border-[#E8E8E8]'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-[#737373]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort category products"
              className="px-2.5 py-1 text-xs rounded-lg border border-[#E8E8E8] bg-white font-semibold text-[#111111] outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between text-xs text-[#737373] mb-6">
          <span>
            Showing <strong className="text-[#111111]">{categoryProducts.length}</strong> products in {currentCategoryData.name}
          </span>
          <span>Orders over $50 qualify for Free Shipping</span>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#F7F7F5] rounded-3xl border border-[#E8E8E8] p-8">
            <h3 className="text-lg font-bold text-[#111111] mb-2">No products currently listed in this category</h3>
            <p className="text-xs text-[#737373] max-w-sm mx-auto mb-6">
              Check back soon as our new capsule drop is currently in transit.
            </p>
            <Link
              to="/shop"
              className="px-5 py-2.5 bg-[#111111] text-white rounded-xl text-xs font-bold hover:bg-[#FF5A36] transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
