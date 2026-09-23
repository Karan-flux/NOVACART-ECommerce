import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ArrowUpDown, Star, RotateCcw } from 'lucide-react';
import { PRODUCTS, CATEGORIES, Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search Param Initializers
  const initialCategory = searchParams.get('category') || 'All';
  const initialFilter = searchParams.get('filter') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFilterTag, setSelectedFilterTag] = useState(initialFilter);
  const [priceRange, setPriceRange] = useState<number>(400);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category')!);
    }
    if (searchParams.get('filter')) {
      setSelectedFilterTag(searchParams.get('filter')!);
    }
    if (searchParams.get('search')) {
      setSearchQuery(searchParams.get('search')!);
    }
  }, [searchParams]);

  // Filtering & Sorting Pipeline
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Filter tags (new, bestseller, sale)
      if (selectedFilterTag === 'new' && !item.isNewArrival) {
        return false;
      }
      if (selectedFilterTag === 'bestseller' && !item.isBestSeller) {
        return false;
      }
      if (selectedFilterTag === 'sale' && !item.discount && item.badge !== 'Sale') {
        return false;
      }

      // Price limit
      if (item.price > priceRange) {
        return false;
      }

      // Rating limit
      if (item.rating < minRating) {
        return false;
      }

      // Search term
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchCategory && !matchDesc && !matchTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      }
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0; // featured default
    });
  }, [selectedCategory, selectedFilterTag, priceRange, minRating, searchQuery, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedFilterTag('all');
    setPriceRange(400);
    setMinRating(0);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    selectedFilterTag !== 'all' ||
    priceRange < 400 ||
    minRating > 0;

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[#F7F7F5] border-b border-[#E8E8E8] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-wider text-[#FF5A36] block mb-1">
              Store Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#111111]">
              Explore All Products
            </h1>
            <p className="text-xs sm:text-sm text-[#737373] mt-2 leading-relaxed">
              Carefully curated goods for modern life. Premium athletic footwear, heavyweight hoodies, acoustic headphones, and refined home aesthetics.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Control Bar: Search & Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E8E8]">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#737373] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, tag, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E8E8] focus:border-[#111111] text-xs sm:text-sm text-[#111111] outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#737373] hover:text-[#111111]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right Controls: Sort & Mobile Filter toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden px-4 py-2.5 rounded-xl border border-[#E8E8E8] hover:bg-[#F7F7F5] text-xs font-semibold text-[#111111] flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {hasActiveFilters && '•'}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#737373] hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort products by"
                  className="px-3 py-2.5 rounded-xl border border-[#E8E8E8] bg-white text-xs font-semibold text-[#111111] outline-none cursor-pointer hover:border-[#111111] transition-colors"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap pt-4">
            <span className="text-xs text-[#737373]">Active filters:</span>
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F7F5] border border-[#E8E8E8] text-xs font-semibold text-[#111111]">
                Category: {selectedCategory}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-[#FF5A36]"
                  onClick={() => setSelectedCategory('All')}
                />
              </span>
            )}
            {selectedFilterTag !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F7F5] border border-[#E8E8E8] text-xs font-semibold text-[#111111]">
                Tag: {selectedFilterTag}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-[#FF5A36]"
                  onClick={() => setSelectedFilterTag('all')}
                />
              </span>
            )}
            {priceRange < 400 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F7F5] border border-[#E8E8E8] text-xs font-semibold text-[#111111]">
                Max: ${priceRange}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-[#FF5A36]"
                  onClick={() => setPriceRange(400)}
                />
              </span>
            )}
            {minRating > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F7F5] border border-[#E8E8E8] text-xs font-semibold text-[#111111]">
                {minRating}+ Stars
                <X
                  className="w-3 h-3 cursor-pointer hover:text-[#FF5A36]"
                  onClick={() => setMinRating(0)}
                />
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-xs text-[#FF5A36] font-bold hover:underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Main Content Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
          {/* LEFT SIDEBAR: Filters (Desktop & Mobile Drawer) */}
          <div
            className={`lg:block ${
              isMobileFilterOpen ? 'block' : 'hidden'
            } space-y-6 pb-6 lg:pb-0 border-b lg:border-b-0 lg:border-r border-[#E8E8E8] lg:pr-6`}
          >
            {/* Quick Filters (All, New, Bestseller, Sale) */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#111111] mb-3">
                Collections
              </h3>
              <div className="space-y-1">
                {[
                  { id: 'all', label: 'All Products' },
                  { id: 'new', label: 'New Arrivals' },
                  { id: 'bestseller', label: 'Best Sellers' },
                  { id: 'sale', label: 'On Sale / Deals' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFilterTag(f.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                      selectedFilterTag === f.id
                        ? 'bg-[#111111] text-white'
                        : 'text-[#737373] hover:text-[#111111] hover:bg-[#F7F7F5]'
                    }`}
                  >
                    <span>{f.label}</span>
                    {f.id === 'sale' && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#FF5A36] text-white">
                        Sale
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="pt-4 border-t border-[#E8E8E8]">
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#111111] mb-3">
                Categories
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    selectedCategory === 'All'
                      ? 'bg-[#111111] text-white'
                      : 'text-[#737373] hover:text-[#111111] hover:bg-[#F7F7F5]'
                  }`}
                >
                  All Categories ({PRODUCTS.length})
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                      selectedCategory.toLowerCase() === cat.name.toLowerCase()
                        ? 'bg-[#111111] text-white'
                        : 'text-[#737373] hover:text-[#111111] hover:bg-[#F7F7F5]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] opacity-70">
                      {PRODUCTS.filter((p) => p.category === cat.name).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="pt-4 border-t border-[#E8E8E8]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs uppercase font-bold tracking-wider text-[#111111]">
                  Max Price
                </h3>
                <span className="text-xs font-bold text-[#FF5A36] tabular-nums">
                  ${priceRange}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="400"
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                aria-label="Max Price filter"
                className="w-full accent-[#FF5A36] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#737373] mt-1">
                <span>$20</span>
                <span>$400+</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="pt-4 border-t border-[#E8E8E8]">
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#111111] mb-2">
                Customer Rating
              </h3>
              <div className="space-y-1.5">
                {[0, 4.5, 4.8].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      minRating === rating
                        ? 'bg-[#F7F7F5] text-[#111111] font-bold border border-[#E8E8E8]'
                        : 'text-[#737373] hover:text-[#111111]'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      {rating === 0 ? (
                        'All Ratings'
                      ) : (
                        <>
                          <Star className="w-3.5 h-3.5 fill-[#FF5A36] text-[#FF5A36]" />
                          <span>{rating}+ & above</span>
                        </>
                      )}
                    </span>
                    {minRating === rating && <span className="text-[#FF5A36]">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            <div className="pt-4 border-t border-[#E8E8E8]">
              <button
                onClick={resetFilters}
                className="w-full py-2 bg-[#F7F7F5] hover:bg-[#E8E8E8] text-[#111111] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-[#F7F7F5] rounded-3xl border border-[#E8E8E8] p-8">
                <h3 className="text-lg font-bold text-[#111111] mb-2">No matching products found</h3>
                <p className="text-xs text-[#737373] max-w-sm mx-auto mb-6">
                  Try adjusting your keywords, price limits, or category filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-[#111111] text-white rounded-xl text-xs font-bold hover:bg-[#FF5A36] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between text-xs text-[#737373] mb-4">
                  <span>
                    Showing <strong className="text-[#111111]">{filteredProducts.length}</strong> products
                  </span>
                  <span>Free shipping on orders over $50</span>
                </div>

                {/* Grid: 4 columns desktop, 3 tablet, 2 mobile */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={setQuickViewProduct}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
