import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Truck, ShieldCheck, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductImage } from './ProductImage';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleViewFullDetails = () => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-[#F7F7F5] text-[#111111] z-20 transition-colors shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Gallery */}
          <div className="bg-[#F7F7F5] p-6 flex flex-col justify-between">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#E8E8E8]">
              <ProductImage
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === i ? 'border-[#FF5A36]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#737373]">
                {product.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#111111] mt-1">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#FF5A36] text-[#FF5A36]'
                          : 'text-[#E8E8E8]'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#111111]">{product.rating}</span>
                <span className="text-xs text-[#737373]">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 mt-3">
                <span className="text-2xl font-black text-[#111111] tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-[#737373] line-through tabular-nums">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
                {product.discount && (
                  <span className="text-xs font-bold text-[#FF5A36] bg-[#FF5A36]/10 px-2 py-0.5 rounded-full">
                    Save {product.discount}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-[#737373] mt-3 line-clamp-3 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-[#111111]">Color:</span>
                    <span className="text-[#737373]">{selectedColor}</span>
                  </div>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 ${
                          selectedColor === c.name ? 'border-[#111111] scale-110' : 'border-transparent'
                        }`}
                        title={c.name}
                      >
                        <span
                          className="w-full h-full rounded-full block border border-black/10 shadow-xs"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-[#111111]">Size:</span>
                    <span className="text-[#737373]">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                          selectedSize === s
                            ? 'bg-[#111111] text-white border-[#111111]'
                            : 'bg-white text-[#111111] border-[#E8E8E8] hover:border-[#111111]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#E8E8E8] space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#E8E8E8] rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-sm font-bold text-[#737373] hover:text-[#111111]"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-sm font-bold text-[#737373] hover:text-[#111111]"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-[#FF5A36] hover:bg-[#FF7048] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart - ${(product.price * quantity).toFixed(2)}
                    </>
                  )}
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-colors ${
                    inWishlist
                      ? 'bg-[#FF5A36] text-white border-[#FF5A36]'
                      : 'bg-white text-[#111111] border-[#E8E8E8] hover:bg-[#F7F7F5]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleViewFullDetails}
                className="w-full text-center text-xs font-semibold text-[#737373] hover:text-[#111111] hover:underline pt-1 block"
              >
                View full specifications & customer reviews →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
