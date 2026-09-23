import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  CreditCard,
  Truck,
  PackageCheck,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { ProductImage } from '../components/ProductImage';

export const CheckoutPage: React.FC = () => {
  const { cart, getSubtotal, getDiscount, getShipping, getCartTotal, promoCode, clearCart } = useCart();
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState('shopper@example.com');
  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Morgan');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('Seattle');
  const [state, setState] = useState('WA');
  const [zip, setZip] = useState('98101');
  const [country, setCountry] = useState('United States');
  const [shippingSpeed, setShippingSpeed] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  const subtotal = getSubtotal();
  const baseShipping = getShipping();
  const extraShipping = shippingSpeed === 'express' ? 14.99 : 0;
  const shippingTotal = baseShipping + extraShipping;
  const discount = getDiscount();
  const finalTotal = Math.max(0, subtotal - discount + shippingTotal);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const randomOrder = `NC-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderConfirmed(randomOrder);
      clearCart();

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF5A36', '#FF7048', '#111111', '#FFFFFF'],
        });
      } catch (err) {
        // Fallback
      }
    }, 1500);
  };

  if (orderConfirmed) {
    return (
      <div className="bg-[#F7F7F5] min-h-screen py-16 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E8E8] shadow-xl text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase font-bold text-[#FF5A36] tracking-wider">
            Order Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111111] mt-1">
            Thank you for your order!
          </h1>
          <p className="text-xs sm:text-sm text-[#737373] mt-2">
            A confirmation receipt and courier tracking details have been sent to{' '}
            <strong className="text-[#111111]">{email}</strong>.
          </p>

          <div className="my-6 p-4 rounded-2xl bg-[#F7F7F5] border border-[#E8E8E8] text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#737373]">Order Number:</span>
              <span className="font-mono font-bold text-[#111111]">{orderConfirmed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#737373]">Estimated Delivery:</span>
              <span className="font-semibold text-[#111111]">
                {shippingSpeed === 'express' ? '1–2 Business Days' : '2–4 Business Days'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#737373]">Payment Status:</span>
              <span className="font-semibold text-emerald-600">Paid (${finalTotal.toFixed(2)})</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/shop"
              className="flex-1 py-3.5 bg-[#FF5A36] hover:bg-[#FF7048] text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="flex-1 py-3.5 bg-[#F7F7F5] hover:bg-[#E8E8E8] text-[#111111] rounded-xl text-xs font-bold transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-[#111111]">No items in checkout</h2>
        <p className="text-xs text-[#737373] mt-2 mb-6">
          Your cart is currently empty. Please add items before proceeding.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-[#111111] text-white rounded-xl text-xs font-bold hover:bg-[#FF5A36] transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24">
      {/* Checkout Navbar */}
      <div className="bg-white border-b border-[#E8E8E8] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="text-xl font-black tracking-tight text-[#111111]">
            Nova<span className="text-[#FF5A36]">Cart</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#737373]">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold text-[#111111]">Secure SSL Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#111111] transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Cart
        </Link>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* LEFT: Shipping & Payment Details */}
            <div className="lg:col-span-7 space-y-8">
              {/* Section 1: Contact */}
              <div className="p-6 rounded-3xl border border-[#E8E8E8] bg-[#F7F7F5]/30 space-y-4">
                <h3 className="text-base font-bold text-[#111111] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-xs flex items-center justify-center">
                    1
                  </span>
                  Contact Information
                </h3>
                <div>
                  <label className="text-xs font-bold text-[#111111] block mb-1">
                    Email address for receipt
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E8] bg-white text-xs text-[#111111] outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              {/* Section 2: Delivery Address */}
              <div className="p-6 rounded-3xl border border-[#E8E8E8] bg-[#F7F7F5]/30 space-y-4">
                <h3 className="text-base font-bold text-[#111111] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-xs flex items-center justify-center">
                    2
                  </span>
                  Shipping Address
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#111111] block mb-1">First name</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] bg-white text-xs text-[#111111] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#111111] block mb-1">Last name</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] bg-white text-xs text-[#111111] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#111111] block mb-1">Street address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] bg-white text-xs text-[#111111] outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#111111] block mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] bg-white text-xs text-[#111111] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#111111] block mb-1">State / Prov</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] bg-white text-xs text-[#111111] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#111111] block mb-1">Postal code</label>
                    <input
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] bg-white text-xs text-[#111111] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Shipping Method */}
              <div className="p-6 rounded-3xl border border-[#E8E8E8] bg-[#F7F7F5]/30 space-y-3">
                <h3 className="text-base font-bold text-[#111111] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-xs flex items-center justify-center">
                    3
                  </span>
                  Shipping Speed
                </h3>

                <div
                  onClick={() => setShippingSpeed('standard')}
                  className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    shippingSpeed === 'standard'
                      ? 'border-[#FF5A36] bg-white shadow-xs'
                      : 'border-[#E8E8E8] bg-white/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-[#FF5A36]" />
                    <div>
                      <span className="text-xs font-bold text-[#111111] block">
                        Standard Courier (2–4 Business Days)
                      </span>
                      <span className="text-[11px] text-[#737373]">
                        Carbon neutral global transit with live map tracking
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#111111]">
                    {baseShipping === 0 ? 'FREE' : `$${baseShipping.toFixed(2)}`}
                  </span>
                </div>

                <div
                  onClick={() => setShippingSpeed('express')}
                  className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    shippingSpeed === 'express'
                      ? 'border-[#FF5A36] bg-white shadow-xs'
                      : 'border-[#E8E8E8] bg-white/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-[#FF5A36]" />
                    <div>
                      <span className="text-xs font-bold text-[#111111] block">
                        Priority Overnight / Air Express (1–2 Days)
                      </span>
                      <span className="text-[11px] text-[#737373]">
                        Guaranteed next-morning dispatch with signature required
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#111111]">+$14.99</span>
                </div>
              </div>

              {/* Section 4: Payment */}
              <div className="p-6 rounded-3xl border border-[#E8E8E8] bg-[#F7F7F5]/30 space-y-4">
                <h3 className="text-base font-bold text-[#111111] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-xs flex items-center justify-center">
                    4
                  </span>
                  Payment Method
                </h3>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      paymentMethod === 'card'
                        ? 'border-[#111111] bg-[#111111] text-white shadow-xs'
                        : 'border-[#E8E8E8] bg-white text-[#737373]'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      paymentMethod === 'apple'
                        ? 'border-[#111111] bg-[#111111] text-white shadow-xs'
                        : 'border-[#E8E8E8] bg-white text-[#737373]'
                    }`}
                  >
                    <span>Apple Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      paymentMethod === 'paypal'
                        ? 'border-[#111111] bg-[#111111] text-white shadow-xs'
                        : 'border-[#E8E8E8] bg-white text-[#737373]'
                    }`}
                  >
                    <span>PayPal</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-bold text-[#111111] block mb-1">
                        Card number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] bg-white text-xs text-[#111111] font-mono outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-[#111111] block mb-1">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] bg-white text-xs text-[#111111] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#111111] block mb-1">CVC</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] bg-white text-xs text-[#111111] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Order Summary Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-[#F7F7F5] rounded-3xl p-6 sm:p-8 border border-[#E8E8E8] sticky top-24 space-y-5">
                <h3 className="text-base font-bold text-[#111111]">
                  Order Items ({cart.length})
                </h3>

                {/* Items list */}
                <div className="divide-y divide-[#E8E8E8] max-h-64 overflow-y-auto pr-1">
                  {cart.map((item, idx) => (
                    <div key={idx} className="py-3 first:pt-0 flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-[#E8E8E8] shrink-0">
                        <ProductImage
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#111111] truncate">
                          {item.product.name}
                        </h4>
                        <span className="text-[11px] text-[#737373] block">
                          Qty: {item.quantity} · {item.selectedColor || 'Standard'}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#111111] tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price calculations */}
                <div className="space-y-2 pt-3 border-t border-[#E8E8E8] text-xs text-[#737373]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#111111] tabular-nums">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promo Discount ({promoCode})</span>
                      <span className="tabular-nums">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-[#111111] tabular-nums">
                      {shippingTotal === 0 ? 'FREE' : `$${shippingTotal.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black text-[#111111] pt-3 border-t border-[#E8E8E8]">
                    <span>Total Due</span>
                    <span className="text-xl tabular-nums text-[#FF5A36]">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Place Order CTA */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-[#FF5A36] hover:bg-[#FF7048] disabled:bg-[#737373] text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <span>Processing Payment...</span>
                  ) : (
                    <span>Place Order · ${finalTotal.toFixed(2)}</span>
                  )}
                </button>

                <div className="text-center text-[11px] text-[#737373] flex items-center justify-center gap-1.5 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Backed by NovaCart 30-Day Money Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
