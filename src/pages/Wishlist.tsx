import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { Product } from '../data/products';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product, 1);
    });
    clearWishlist();
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-[#F7F7F5] border border-[#E8E8E8] flex items-center justify-center mx-auto mb-6">
          <Heart className="w-10 h-10 text-[#737373]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">
          Your Wishlist is Empty
        </h1>
        <p className="text-sm text-[#737373] mt-2 max-w-md mx-auto">
          Save your favorite products to keep track of their availability and price drops.
        </p>
        <div className="mt-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#111111] hover:bg-[#FF5A36] text-white rounded-xl text-sm font-bold shadow-md transition-all"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[#F7F7F5] border-b border-[#E8E8E8] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#FF5A36] block mb-1">
              Personal Vault
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">
              Saved Wishlist ({wishlist.length} items)
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleMoveAllToCart}
              className="px-4 py-2.5 bg-[#FF5A36] hover:bg-[#FF7048] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Move All to Cart</span>
            </button>
            <button
              onClick={clearWishlist}
              className="px-4 py-2.5 bg-white border border-[#E8E8E8] hover:bg-red-50 hover:text-red-600 text-xs font-semibold rounded-xl text-[#737373] transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard
                product={product}
                onQuickView={setQuickViewProduct}
              />
            </div>
          ))}
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
