import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ProductImage } from './ProductImage';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    getSubtotal,
    getDiscount,
    getShipping,
    getCartTotal,
    getCartCount,
    promoCode,
    applyPromoCode,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMsg, setPromoMsg] = useState<{ text: string; isError: boolean } | null>(null);
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const discount = getDiscount();
  const total = getCartTotal();
  const freeShippingThreshold = 50.0;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    const res = applyPromoCode(inputCode);
    setPromoMsg({ text: res.message, isError: !res.success });
    if (res.success) {
      setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleViewFullCart = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
          {/* Header */}
          <div className="p-5 border-b border-[#E8E8E8] flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#FF5A36]" />
              <h2 className="text-lg font-bold text-[#111111]">Your Shopping Cart</h2>
              <span className="text-xs bg-[#F7F7F5] border border-[#E8E8E8] text-[#111111] px-2 py-0.5 rounded-full font-semibold">
                {getCartCount()}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-[#F7F7F5] text-[#737373] hover:text-[#111111] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Bar */}
          <div className="px-5 py-3 bg-[#F7F7F5] border-b border-[#E8E8E8]">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span className="flex items-center gap-1.5 text-[#111111]">
                <Truck className="w-3.5 h-3.5 text-[#FF5A36]" />
                {amountNeeded > 0 ? (
                  <>
                    Add <strong className="text-[#FF5A36] font-bold">${amountNeeded.toFixed(2)}</strong> for Free Shipping
                  </>
                ) : (
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> You unlocked Free Worldwide Shipping!
                  </span>
                )}
              </span>
              <span className="text-[11px] text-[#737373]">{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full bg-[#E8E8E8] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#FF5A36] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#E8E8E8]">
            {cart.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#F7F7F5] border border-[#E8E8E8] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#737373]" />
                </div>
                <h3 className="text-base font-bold text-[#111111] mb-1">Your cart is waiting</h3>
                <p className="text-xs text-[#737373] max-w-xs mb-6">
                  Explore our latest arrivals, sneakers, streetwear and essentials.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="px-5 py-2.5 bg-[#111111] hover:bg-[#FF5A36] text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`} className="py-4 first:pt-0 flex gap-3.5">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F7F7F5] shrink-0 border border-[#E8E8E8]">
                    <ProductImage
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            navigate(`/product/${item.product.id}`);
                          }}
                          className="text-sm font-semibold text-[#111111] hover:text-[#FF5A36] transition-colors truncate cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                          className="text-[#737373] hover:text-red-500 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#737373] mt-0.5 space-x-2">
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border border-[#E8E8E8] rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                          className="p-1.5 text-[#737373] hover:text-[#111111] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2 tabular-nums text-[#111111]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                          className="p-1.5 text-[#737373] hover:text-[#111111] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#111111] tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Controls & Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E8E8E8] bg-white space-y-3.5">
              {/* Promo code input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Coupon (try NOVA20)"
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[#E8E8E8] focus:border-[#111111] outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#F7F7F5] hover:bg-[#111111] hover:text-white text-xs font-semibold rounded-lg border border-[#E8E8E8] transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoMsg && (
                <p className={`text-[11px] ${promoMsg.isError ? 'text-red-500' : 'text-emerald-600 font-medium'}`}>
                  {promoMsg.text}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#737373]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#111111] tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount ({promoCode})</span>
                    <span className="tabular-nums">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-[#111111] tabular-nums">
                    {shipping === 0 ? <span className="text-emerald-600">FREE</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#111111] pt-2 border-t border-[#E8E8E8]">
                  <span>Total</span>
                  <span className="text-base tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 bg-[#FF5A36] hover:bg-[#FF7048] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleViewFullCart}
                  className="w-full py-2 bg-transparent hover:bg-[#F7F7F5] text-[#111111] rounded-xl text-xs font-semibold border border-[#E8E8E8] transition-colors text-center block"
                >
                  View Full Cart & Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
