import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  showSubtitle?: boolean;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showSubtitle = false,
  onQuickView,
}) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl border border-[#E8E8E8] hover:border-[#111111]/20 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Image Area */}
      <div className="relative w-full aspect-square bg-[#F7F7F5] overflow-hidden">
        {/* Main image / Secondary image on hover */}
        <ProductImage
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Badges: New, Bestseller, Discount */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.badge === 'Bestseller' && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-[#111111] text-white rounded-md shadow-xs">
              Bestseller
            </span>
          )}
          {product.badge === 'New' && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-[#111111] text-white rounded-md shadow-xs">
              New
            </span>
          )}
          {product.discount && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-[#FF5A36] text-white rounded-md shadow-xs">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 ${
            inWishlist
              ? 'bg-[#FF5A36] text-white shadow-md'
              : 'bg-white/90 text-[#111111] hover:bg-white hover:text-[#FF5A36] shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
        </button>

        {/* Hover Quick View Overlay Action */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          {onQuickView && (
            <button
              onClick={handleQuickViewClick}
              className="flex-1 py-2 bg-white/95 backdrop-blur-xs hover:bg-white text-[#111111] text-xs font-semibold rounded-xl shadow-md border border-[#E8E8E8] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              Quick View
            </button>
          )}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2 bg-[#111111] hover:bg-[#FF5A36] text-white text-xs font-semibold rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Ratings */}
          <div className="flex items-center justify-between gap-2 text-xs mb-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#737373]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#737373]">
              <Star className="w-3.5 h-3.5 fill-[#FF5A36] text-[#FF5A36]" />
              <span className="font-bold text-[#111111]">{product.rating}</span>
              <span className="text-[11px]">({product.reviews})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-[#111111] line-clamp-1 group-hover:text-[#FF5A36] transition-colors">
            {product.name}
          </h3>

          {/* Optional Subtitle */}
          {showSubtitle && product.shortDescription && (
            <p className="text-xs text-[#737373] line-clamp-1 mt-1">
              {product.shortDescription}
            </p>
          )}
        </div>

        {/* Price & Mobile Add to Cart */}
        <div className="mt-3 pt-2.5 border-t border-[#E8E8E8]/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-[#111111] tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-[#737373] line-through tabular-nums">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Quick Add Button on small viewports */}
          <button
            onClick={handleAddToCart}
            className="p-2 sm:hidden rounded-lg bg-[#111111] text-white active:bg-[#FF5A36] transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
