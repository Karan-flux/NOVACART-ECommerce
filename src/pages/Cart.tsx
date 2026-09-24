import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft, Truck, Check, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductImage } from '../components/ProductImage';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getSubtotal,
    getDiscount,
    getShipping,
    getCartTotal,
    promoCode,
    applyPromoCode,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShipping();
  const total = getCartTotal();

  const freeShippingThreshold = 50.0;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    const res = applyPromoCode(inputCode);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) setInputCode('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-[#F7F7F5] border border-[#E8E8E8] flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-[#737373]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-sm text-[#737373] mt-2 max-w-md mx-auto">
          Explore our trending catalog to discover premium footwear, tailored streetwear, acoustics, and home aesthetics.
        </p>
        <div className="mt-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF5A36] hover:bg-[#FF7048] text-white rounded-xl text-sm font-bold shadow-md transition-all"
          >
            <span>Start Shopping Now</span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#FF5A36] block mb-1">
              Your Review
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">
              Shopping Cart ({cart.reduce((c, i) => c + i.quantity, 0)} items)
            </h1>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-[#111111] hover:text-[#FF5A36] flex items-center gap-1.5 transition-colors hidden sm:inline-flex"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        {/* Free Shipping Tracker */}
        <div className="p-4 bg-[#F7F7F5] rounded-2xl border border-[#E8E8E8]">
          <div className="flex items-center justify-between text-xs sm:text-sm mb-2 font-medium">
            <span className="flex items-center gap-2 text-[#111111]">
              <Truck className="w-4 h-4 text-[#FF5A36]" />
              {amountNeeded > 0 ? (
                <>
                  Add <strong className="text-[#FF5A36] font-bold">${amountNeeded.toFixed(2)}</strong> more to unlock Free Worldwide Shipping!
                </>
              ) : (
                <span className="text-emerald-600 font-semibold flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> You unlocked Free Worldwide Express Shipping!
                </span>
              )}
            </span>
            <span className="text-xs text-[#737373] tabular-nums font-semibold">
              {Math.round(progressToFreeShipping)}%
            </span>
          </div>
          <div className="w-full bg-[#E8E8E8] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#FF5A36] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: Cart Items Table / List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="border border-[#E8E8E8] rounded-3xl overflow-hidden divide-y divide-[#E8E8E8]">
              {cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-white"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => navigate(`/product/${item.product.id}`)}
                    className="w-24 h-24 rounded-2xl overflow-hidden bg-[#F7F7F5] border border-[#E8E8E8] shrink-0 cursor-pointer"
                  >
                    <ProductImage
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Title & metadata */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-[#737373] tracking-wider block">
                      {item.product.category}
                    </span>
                    <h3
                      onClick={() => navigate(`/product/${item.product.id}`)}
                      className="text-sm sm:text-base font-bold text-[#111111] hover:text-[#FF5A36] transition-colors cursor-pointer truncate"
                    >
                      {item.product.name}
                    </h3>
                    <div className="text-xs text-[#737373] mt-1 space-x-3">
                      {item.selectedColor && <span>Color: <strong>{item.selectedColor}</strong></span>}
                      {item.selectedSize && <span>Size: <strong>{item.selectedSize}</strong></span>}
                    </div>
                    <div className="text-xs text-[#111111] font-semibold mt-1 tabular-nums">
                      ${item.product.price.toFixed(2)} each
                    </div>
                  </div>

                  {/* Stepper */}
                  <div className="flex items-center border border-[#E8E8E8] rounded-xl bg-[#F7F7F5] p-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                      className="w-7 h-7 flex items-center justify-center text-[#737373] hover:text-[#111111] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold tabular-nums text-[#111111]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                      className="w-7 h-7 flex items-center justify-center text-[#737373] hover:text-[#111111] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line total */}
                  <div className="text-right min-w-[90px]">
                    <span className="text-base sm:text-lg font-black text-[#111111] tabular-nums block">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                      className="text-xs text-[#737373] hover:text-red-500 inline-flex items-center gap-1 mt-1 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={clearCart}
                className="text-xs text-[#737373] hover:text-red-600 font-semibold underline"
              >
                Clear entire cart
              </button>
              <Link
                to="/shop"
                className="sm:hidden text-xs font-bold text-[#111111] hover:text-[#FF5A36] flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* RIGHT: Order Summary Card */}
          <div className="lg:col-span-4">
            <div className="bg-[#F7F7F5] rounded-3xl p-6 sm:p-7 border border-[#E8E8E8] sticky top-24 space-y-6">
              <h3 className="text-lg font-bold text-[#111111]">
                Order Summary
              </h3>

              {/* Promo Code input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Promo Code (NOVA20)"
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] bg-white text-xs text-[#111111] outline-none focus:border-[#111111]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#111111] hover:bg-[#FF5A36] text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p className={`text-xs ${promoMessage.isError ? 'text-red-500' : 'text-emerald-600 font-medium'}`}>
                  {promoMessage.text}
                </p>
              )}

              {/* Price rows */}
              <div className="space-y-3 text-xs text-[#737373] pt-2 border-t border-[#E8E8E8]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#111111] tabular-nums">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount Code ({promoCode})</span>
                    <span className="tabular-nums">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-[#111111] tabular-nums">
                    {shipping === 0 ? (
                      <span className="text-emerald-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Sales Tax</span>
                  <span className="font-medium text-[#111111] tabular-nums">Calculated at checkout</span>
                </div>

                <div className="flex justify-between text-base font-black text-[#111111] pt-3 border-t border-[#E8E8E8]">
                  <span>Estimated Total</span>
                  <span className="text-xl tabular-nums text-[#FF5A36]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-[#FF5A36] hover:bg-[#FF7048] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-[11px] text-[#737373] flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#737373]" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
