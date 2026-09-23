import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ArrowRight,
  Share2,
  ChevronRight,
  Package,
} from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductImage } from '../components/ProductImage';
import { ProductCard } from '../components/ProductCard';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  // Sync state if id changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedColor(product.colors?.[0]?.name || '');
    setSelectedSize(product.sizes?.[0] || '');
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShowCopiedToast(true);
    setTimeout(() => setShowCopiedToast(false), 2000);
  };

  // Related products from same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-20">
      {/* Breadcrumb Bar */}
      <div className="bg-[#F7F7F5] border-b border-[#E8E8E8] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-[#737373]">
          <Link to="/" className="hover:text-[#111111] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A3A3A3]" />
          <Link to="/shop" className="hover:text-[#111111] transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A3A3A3]" />
          <Link
            to={`/category/${product.category.toLowerCase().replace(' ', '-')}`}
            className="hover:text-[#111111] transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A3A3A3]" />
          <span className="text-[#111111] font-semibold truncate max-w-[200px]">
            {product.name}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* LEFT: Product Image Gallery (Sticky on desktop) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image */}
            <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden bg-[#F7F7F5] border border-[#E8E8E8] shadow-xs group">
              <ProductImage
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />

              {/* Discount / New Badge */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.badge && (
                  <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider bg-[#111111] text-white rounded-lg shadow-sm">
                    {product.badge}
                  </span>
                )}
                {product.discount && (
                  <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider bg-[#FF5A36] text-white rounded-lg shadow-sm">
                    -{product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Share & Wishlist in overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-white/90 backdrop-blur-xs text-[#111111] hover:bg-white hover:text-[#FF5A36] transition-colors shadow-xs"
                  title="Copy link"
                  aria-label="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded-full transition-all shadow-xs ${
                    inWishlist
                      ? 'bg-[#FF5A36] text-white'
                      : 'bg-white/90 backdrop-blur-xs text-[#111111] hover:bg-white hover:text-[#FF5A36]'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
                </button>
              </div>

              {showCopiedToast && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#111111] text-white text-xs px-3 py-1.5 rounded-lg shadow-lg">
                  Link copied to clipboard!
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden bg-[#F7F7F5] border-2 shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#FF5A36] ring-2 ring-[#FF5A36]/20'
                        : 'border-[#E8E8E8] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Contiguous Purchase Module */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
            <div>
              {/* Category & Stock status */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="uppercase font-bold tracking-wider text-[#FF5A36]">
                  {product.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock & Ready to Ship
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#FF5A36] text-[#FF5A36]'
                          : 'text-[#E8E8E8]'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#111111]">{product.rating}</span>
                <span className="text-xs text-[#737373]">·</span>
                <a
                  href="#reviews"
                  onClick={() => setActiveTab('reviews')}
                  className="text-xs font-semibold text-[#737373] hover:text-[#111111] underline"
                >
                  {product.reviews} customer reviews
                </a>
              </div>

              {/* Price Block */}
              <div className="flex items-baseline gap-3 mt-4 pt-4 border-t border-[#E8E8E8]">
                <span className="text-3xl font-black text-[#111111] tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-[#737373] line-through tabular-nums">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
                {product.discount && (
                  <span className="text-xs font-bold text-[#FF5A36] bg-[#FF5A36]/10 px-2.5 py-1 rounded-full">
                    Save {product.discount}%
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-[#737373] mt-3 leading-relaxed">
                {product.shortDescription || product.description}
              </p>
            </div>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#111111]">Color:</span>
                  <span className="font-medium text-[#737373]">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                        selectedColor === color.name
                          ? 'border-[#111111] ring-2 ring-[#111111]/20 scale-110'
                          : 'border-transparent hover:scale-105'
                      }`}
                      title={color.name}
                    >
                      <span
                        className="w-full h-full rounded-full block border border-black/10 shadow-xs"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#111111]">Select Size:</span>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className="text-xs text-[#737373] hover:text-[#111111] underline"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-all ${
                        selectedSize === size
                          ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                          : 'bg-white text-[#111111] border-[#E8E8E8] hover:border-[#111111]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & CTA Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity stepper */}
                <div className="flex items-center border border-[#E8E8E8] rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-base font-bold text-[#737373] hover:text-[#111111]"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-9 text-center text-xs font-bold tabular-nums text-[#111111]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-base font-bold text-[#737373] hover:text-[#111111]"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-[#FF5A36] hover:bg-[#FF7048] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart — ${(product.price * quantity).toFixed(2)}</span>
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-[#111111] hover:bg-black text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Buy Now with Instant Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {addedToast && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Item added to your cart!</span>
                </div>
              )}
            </div>

            {/* Shipping & Returns Details Bar */}
            <div className="p-4 bg-[#F7F7F5] rounded-2xl border border-[#E8E8E8] space-y-3 text-xs text-[#737373]">
              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 text-[#FF5A36] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#111111] font-semibold block">
                    Free Worldwide Shipping
                  </strong>
                  <span>Delivered in 2–4 business days with carbon-neutral courier tracking.</span>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-2 border-t border-[#E8E8E8]">
                <RotateCcw className="w-4 h-4 text-[#FF5A36] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#111111] font-semibold block">
                    30-Day Hassle-Free Returns
                  </strong>
                  <span>Return unworn items with original packaging for a full instant refund.</span>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-2 border-t border-[#E8E8E8]">
                <ShieldCheck className="w-4 h-4 text-[#FF5A36] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#111111] font-semibold block">
                    Authenticity & Warranty Guaranteed
                  </strong>
                  <span>100% genuine guaranteed with standard 1-year product warranty.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Description / Specifications / Reviews */}
        <div className="mt-16 pt-10 border-t border-[#E8E8E8]">
          <div className="flex items-center gap-6 border-b border-[#E8E8E8] pb-4">
            <button
              onClick={() => setActiveTab('desc')}
              className={`text-sm font-bold transition-colors relative py-2 ${
                activeTab === 'desc'
                  ? 'text-[#111111]'
                  : 'text-[#737373] hover:text-[#111111]'
              }`}
            >
              Product Description
              {activeTab === 'desc' && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#FF5A36]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`text-sm font-bold transition-colors relative py-2 ${
                activeTab === 'specs'
                  ? 'text-[#111111]'
                  : 'text-[#737373] hover:text-[#111111]'
              }`}
            >
              Technical Specifications
              {activeTab === 'specs' && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#FF5A36]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              id="reviews"
              className={`text-sm font-bold transition-colors relative py-2 ${
                activeTab === 'reviews'
                  ? 'text-[#111111]'
                  : 'text-[#737373] hover:text-[#111111]'
              }`}
            >
              Customer Reviews ({product.reviews})
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#FF5A36]" />
              )}
            </button>
          </div>

          <div className="py-8">
            {activeTab === 'desc' && (
              <div className="max-w-3xl space-y-4 text-xs sm:text-sm text-[#737373] leading-relaxed">
                <p>{product.description}</p>
                <p>
                  Every detail of the {product.name} is engineered to balance modern utility with timeless visual elegance. Backed by NovaCart's rigorous quality assurance standards, this piece undergoes comprehensive structural and durability tests before reaching your hands.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-[#F7F7F5] rounded-xl border border-[#E8E8E8]">
                    <h4 className="font-bold text-[#111111] mb-1">Sustainable Sourcing</h4>
                    <p className="text-xs">
                      Manufactured adhering to certified fair labor and responsible environmental principles.
                    </p>
                  </div>
                  <div className="p-4 bg-[#F7F7F5] rounded-xl border border-[#E8E8E8]">
                    <h4 className="font-bold text-[#111111] mb-1">Lifetime Support</h4>
                    <p className="text-xs">
                      Our customer care specialists are available 24/7 to resolve sizing and care inquiries.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-3xl">
                {product.specifications ? (
                  <div className="border border-[#E8E8E8] rounded-2xl overflow-hidden divide-y divide-[#E8E8E8]">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-3 p-3.5 text-xs sm:text-sm">
                        <span className="font-bold text-[#111111]">{key}</span>
                        <span className="col-span-2 text-[#737373]">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#737373]">
                    Standard commercial specifications apply. Contact support for customized dimensions.
                  </p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-3xl space-y-6">
                {/* Rating Overview */}
                <div className="p-6 bg-[#F7F7F5] rounded-2xl border border-[#E8E8E8] flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-center sm:text-left">
                    <span className="text-4xl font-black text-[#111111] tabular-nums">
                      {product.rating}
                    </span>
                    <div className="flex items-center justify-center sm:justify-start gap-1 my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FF5A36] text-[#FF5A36]" />
                      ))}
                    </div>
                    <span className="text-xs text-[#737373]">
                      Based on {product.reviews} verified purchases
                    </span>
                  </div>

                  <div className="flex-1 w-full max-w-xs space-y-1.5 text-xs">
                    {[
                      { stars: 5, pct: '88%' },
                      { stars: 4, pct: '9%' },
                      { stars: 3, pct: '2%' },
                      { stars: 2, pct: '1%' },
                      { stars: 1, pct: '0%' },
                    ].map((row) => (
                      <div key={row.stars} className="flex items-center gap-2">
                        <span className="w-7 text-[#737373]">{row.stars} ★</span>
                        <div className="flex-1 h-2 bg-[#E8E8E8] rounded-full overflow-hidden">
                          <div
                            className="bg-[#FF5A36] h-full rounded-full"
                            style={{ width: row.pct }}
                          />
                        </div>
                        <span className="w-8 text-right text-[#737373] tabular-nums">
                          {row.pct}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Verified Reviews */}
                <div className="space-y-4 pt-2">
                  {[
                    {
                      name: 'Alexander V.',
                      rating: 5,
                      date: '2 weeks ago',
                      title: 'Exceeded my expectations entirely',
                      comment:
                        'The build quality and tactile feel are outstanding. Sizing is spot on and the packaging was immaculate. NovaCart has become my go-to store.',
                    },
                    {
                      name: 'Elena Rostova',
                      rating: 5,
                      date: '1 month ago',
                      title: 'Flawless design and lightning-fast delivery',
                      comment:
                        'Arrived in Tokyo in 3 business days! The color matches the studio photography exactly. Super comfortable and stylish.',
                    },
                  ].map((rev, i) => (
                    <div key={i} className="p-4 rounded-xl border border-[#E8E8E8] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#111111]">{rev.name}</span>
                        <span className="text-[11px] text-[#737373]">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(rev.rating)].map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 fill-[#FF5A36] text-[#FF5A36]" />
                        ))}
                      </div>
                      <h5 className="text-xs font-bold text-[#111111]">{rev.title}</h5>
                      <p className="text-xs text-[#737373] leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#E8E8E8]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF5A36] block mb-1">
                  You Might Also Like
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#111111]">
                  Related In {product.category}
                </h3>
              </div>
              <Link
                to={`/category/${product.category.toLowerCase().replace(' ', '-')}`}
                className="text-xs font-bold text-[#111111] hover:text-[#FF5A36] flex items-center gap-1"
              >
                <span>View More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
