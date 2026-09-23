import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS, Product } from '../data/products';
import { ProductImage } from './ProductImage';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setResults([]);
      return;
    }

    const filtered = PRODUCTS.filter((p) => {
      const matchName = p.name.toLowerCase().includes(trimmed);
      const matchCategory = p.category.toLowerCase().includes(trimmed);
      const matchDesc = p.description.toLowerCase().includes(trimmed);
      const matchTag = p.tags.some((t) => t.toLowerCase().includes(trimmed));
      return matchName || matchCategory || matchDesc || matchTag;
    });

    setResults(filtered.slice(0, 8));
  }, [query]);

  if (!isOpen) return null;

  const handleSelectProduct = (id: string) => {
    navigate(`/product/${id}`);
    onClose();
  };

  const handleSuggestionClick = (term: string) => {
    setQuery(term);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="w-full bg-white border-b border-[#E8E8E8] shadow-xl pt-6 pb-8 px-4 sm:px-8 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header search bar */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E8]">
            <div className="flex items-center gap-3 flex-1">
              <Search className="w-5 h-5 text-[#FF5A36] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands, categories or styles..."
                className="w-full text-base sm:text-lg font-medium text-[#111111] placeholder:text-[#737373] bg-transparent outline-none"
              />
            </div>
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-[#737373] hover:text-[#111111] px-2 py-1 mr-2"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#F7F7F5] text-[#111111] transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestions when empty */}
          {!query && (
            <div className="mt-6">
              <span className="text-xs uppercase tracking-wider text-[#737373] font-semibold block mb-3">
                Trending Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {['Air Max', 'Essential Hoodie', 'Wireless Headphones', 'Smart Watch', 'Backpack', 'Bottle', 'Vase', 'Sunglasses'].map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSuggestionClick(term)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#F7F7F5] hover:bg-[#111111] hover:text-white transition-all text-[#111111] border border-[#E8E8E8]"
                  >
                    {term}
                  </button>
                ))}
              </div>

              {/* Popular Collections */}
              <div className="mt-8 pt-6 border-t border-[#E8E8E8] grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'New Arrivals', link: '/shop?filter=new' },
                  { label: 'Best Sellers', link: '/shop?filter=bestseller' },
                  { label: 'Summer Sale', link: '/shop?filter=sale' },
                  { label: 'All Collections', link: '/shop' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      navigate(item.link);
                      onClose();
                    }}
                    className="p-3 text-left rounded-xl bg-[#F7F7F5] hover:bg-[#FF5A36]/5 hover:border-[#FF5A36] border border-transparent transition-all group"
                  >
                    <span className="text-sm font-semibold text-[#111111] group-hover:text-[#FF5A36] block">
                      {item.label}
                    </span>
                    <span className="text-xs text-[#737373] flex items-center gap-1 mt-1">
                      Browse now <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Display */}
          {query && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-[#737373] font-semibold">
                  Found {results.length} results for "{query}"
                </span>
                {results.length > 0 && (
                  <button
                    onClick={() => {
                      navigate(`/shop?search=${encodeURIComponent(query)}`);
                      onClose();
                    }}
                    className="text-xs font-semibold text-[#FF5A36] hover:underline"
                  >
                    View all in Shop →
                  </button>
                )}
              </div>

              {results.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sm text-[#737373] mb-3">No products match your search query.</p>
                  <button
                    onClick={() => {
                      navigate('/shop');
                      onClose();
                    }}
                    className="px-4 py-2 text-xs font-semibold bg-[#111111] text-white rounded-lg hover:bg-[#FF5A36] transition-colors"
                  >
                    Explore All Products
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="cursor-pointer group flex sm:flex-col items-center sm:items-start gap-3 p-2 rounded-xl hover:bg-[#F7F7F5] transition-colors border border-transparent hover:border-[#E8E8E8]"
                    >
                      <div className="w-16 h-16 sm:w-full sm:h-40 rounded-lg overflow-hidden shrink-0 bg-[#F7F7F5]">
                        <ProductImage
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-semibold text-[#737373] block truncate">
                          {product.category}
                        </span>
                        <h4 className="text-sm font-semibold text-[#111111] truncate group-hover:text-[#FF5A36] transition-colors">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-1 mt-0.5 text-xs text-[#737373]">
                          <Star className="w-3 h-3 text-[#FF5A36] fill-[#FF5A36]" />
                          <span>{product.rating}</span>
                          <span>({product.reviews})</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-sm font-bold text-[#111111] tabular-nums">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.oldPrice && (
                            <span className="text-xs text-[#737373] line-through tabular-nums">
                              ${product.oldPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
