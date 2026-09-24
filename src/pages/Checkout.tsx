import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  CreditCard,
  Truck,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

import { useCart } from '../context/CartContext';

const Checkout: React.FC = () => {
  const {
    cart,
    getSubtotal,
    getDiscount,
    getShipping,
    getCartTotal,
    promoCode,
    clearCart,
  } = useCart();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('India');

  const [shippingSpeed, setShippingSpeed] = useState<
    'standard' | 'express'
  >('standard');

  const [paymentMethod, setPaymentMethod] = useState<
    'card' | 'apple' | 'paypal'
  >('card');

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShipping();
  const cartTotal = getCartTotal();

  // Express shipping is only a visual demo option.
  // No real shipping provider is connected.
  const expressShippingCost = 19.99;

  const finalTotal =
    shippingSpeed === 'express' && subtotal > 0
      ? Math.max(0, subtotal - discount + expressShippingCost)
      : cartTotal;

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const handlePlaceOrder = async (event: React.FormEvent) => {
    event.preventDefault();

    if (cart.length === 0) {
      return;
    }

    setIsProcessing(true);

    // Demo-only order creation.
    // No real payment, order API, database, email, or shipping service is used.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const randomOrder = `NC-DEMO-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    setOrderConfirmed(randomOrder);
    setIsProcessing(false);

    clearCart();
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-[#fafafa] text-[#171717]">
        {/* Header */}
        <header className="border-b border-[#e5e5e5] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              to="/"
              className="text-xl font-semibold tracking-tight"
            >
              NovaCart
            </Link>

            <div className="flex items-center gap-2 text-xs text-[#737373]">
              <ShieldCheck className="w-4 h-4" />
              Demo Checkout
            </div>
          </div>
        </header>

        {/* Demo Notice */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 flex gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />

            <div>
              <strong>Demo mode:</strong> No real payment was processed.
              This order exists only inside this demo.
            </div>
          </div>
        </div>

        {/* Confirmation */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="bg-white border border-[#e5e5e5] rounded-2xl p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9 text-green-600" />
            </div>

            <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight">
              Demo Order Created
            </h1>

            <p className="text-[#737373] mt-3 text-sm sm:text-base">
              This is a simulated NovaCart order. No payment has been
              processed.
            </p>

            <div className="mt-8 rounded-xl bg-[#fafafa] border border-[#e5e5e5] p-5">
              <p className="text-xs uppercase tracking-wider text-[#737373]">
                Demo Order ID
              </p>

              <p className="mt-2 font-mono font-semibold text-lg">
                {orderConfirmed}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#e5e5e5] pt-5">
              <span className="text-sm text-[#737373]">
                Demo Total
              </span>

              <span className="font-semibold">
                {formatCurrency(finalTotal)}
              </span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-black text-white px-6 py-3 text-sm font-medium hover:bg-[#262626] transition"
              >
                Continue Shopping
              </Link>

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d4d4d4] bg-white px-6 py-3 text-sm font-medium hover:bg-[#fafafa] transition"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafafa] text-[#171717]">
        <header className="border-b border-[#e5e5e5] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              to="/"
              className="text-xl font-semibold tracking-tight"
            >
              NovaCart
            </Link>

            <span className="text-xs text-[#737373]">
              Demo Checkout
            </span>
          </div>
        </header>

        <main className="max-w-xl mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-white border border-[#e5e5e5] flex items-center justify-center mx-auto">
            <CreditCard className="w-7 h-7 text-[#737373]" />
          </div>

          <h1 className="mt-6 text-2xl font-semibold">
            Your cart is empty
          </h1>

          <p className="mt-2 text-sm text-[#737373]">
            Add products to your cart before starting checkout.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-black text-white px-6 py-3 text-sm font-medium hover:bg-[#262626] transition"
          >
            Browse Products
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#171717]">
      {/* Header */}
      <header className="border-b border-[#e5e5e5] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight"
          >
            NovaCart
          </Link>

          <div className="flex items-center gap-2 text-xs text-[#737373]">
            <ShieldCheck className="w-4 h-4" />
            Demo Checkout
          </div>
        </div>
      </header>

      {/* Demo Warning */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs sm:text-sm text-amber-800 flex gap-3">
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />

          <div>
            <strong>Demo mode:</strong> No real payment will be processed.
            Do not enter real card or payment information.
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm text-[#737373] hover:text-black transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <h1 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight">
            Demo Checkout
          </h1>

          <p className="mt-2 text-sm text-[#737373]">
            Review your order and test the checkout experience.
          </p>
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="grid lg:grid-cols-[1fr_380px] gap-8"
        >
          {/* Left Column */}
          <div className="space-y-6">
            {/* Contact */}
            <section className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-[#f5f5f5] flex items-center justify-center">
                  <span className="text-sm font-semibold">1</span>
                </div>

                <div>
                  <h2 className="font-semibold">
                    Contact Information
                  </h2>

                  <p className="text-xs text-[#737373] mt-0.5">
                    Demo information only
                  </p>
                </div>
              </div>

              <label className="block">
                <span className="text-sm font-medium">
                  Email Address
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="mt-2 w-full h-11 rounded-xl border border-[#d4d4d4] px-4 text-sm outline-none focus:border-black transition"
                />
              </label>
            </section>

            {/* Shipping */}
            <section className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-[#f5f5f5] flex items-center justify-center">
                  <span className="text-sm font-semibold">2</span>
                </div>

                <div>
                  <h2 className="font-semibold">
                    Shipping Address
                  </h2>

                  <p className="text-xs text-[#737373] mt-0.5">
                    Sample checkout information
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <label>
                  <span className="text-sm font-medium">
                    First Name
                  </span>

                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    required
                    autoComplete="given-name"
                    className="mt-2 w-full h-11 rounded-xl border border-[#d4d4d4] px-4 text-sm outline-none focus:border-black transition"
                  />
                </label>

                <label>
                  <span className="text-sm font-medium">
                    Last Name
                  </span>

                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    required
                    autoComplete="family-name"
                    className="mt-2 w-full h-11 rounded-xl border border-[#d4d4d4] px-4 text-sm outline-none focus:border-black transition"
                  />
                </label>

                <label className="sm:col-span-2">
                  <span className="text-sm font-medium">
                    Address
                  </span>

                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street address"
                    required
                    autoComplete="street-address"
                    className="mt-2 w-full h-11 rounded-xl border border-[#d4d4d4] px-4 text-sm outline-none focus:border-black transition"
                  />
                </label>

                <label>
                  <span className="text-sm font-medium">
                    City
                  </span>

                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    required
                    autoComplete="address-level2"
                    className="mt-2 w-full h-11 rounded-xl border border-[#d4d4d4] px-4 text-sm outline-none focus:border-black transition"
                  />
                </label>

                <label>
                  <span className="text-sm font-medium">
                    State
                  </span>

                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    required
                    autoComplete="address-level1"
                    className="mt-2 w-full h-11 rounded-xl border border-[#d4d4d4] px-4 text-sm outline-none focus:border-black transition"
                  />
                </label>

                <label>
                  <span className="text-sm font-medium">
                    PIN / ZIP Code
                  </span>

                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="PIN / ZIP"
                    required
                    autoComplete="postal-code"
                    className="mt-2 w-full h-11 rounded-xl border border-[#d4d4d4] px-4 text-sm outline-none focus:border-black transition"
                  />
                </label>

                <label>
                  <span className="text-sm font-medium">
                    Country
                  </span>

                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    autoComplete="country-name"
                    className="mt-2 w-full h-11 rounded-xl border border-[#d4d4d4] px-4 text-sm outline-none focus:border-black transition bg-white"
                  >
                    <option value="India">India</option>
                    <option value="United States">
                      United States
                    </option>
                    <option value="United Kingdom">
                      United Kingdom
                    </option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </label>
              </div>
            </section>

            {/* Shipping Speed */}
            <section className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Truck className="w-5 h-5" />

                <div>
                  <h2 className="font-semibold">
                    Shipping Speed
                  </h2>

                  <p className="text-xs text-[#737373] mt-0.5">
                    Demo shipping options
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label
                  className={`flex items-center justify-between rounded-xl border p-4 cursor-pointer transition ${
                    shippingSpeed === 'standard'
                      ? 'border-black bg-[#fafafa]'
                      : 'border-[#e5e5e5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingSpeed"
                      value="standard"
                      checked={shippingSpeed === 'standard'}
                      onChange={() =>
                        setShippingSpeed('standard')
                      }
                    />

                    <div>
                      <p className="text-sm font-medium">
                        Standard Shipping
                      </p>

                      <p className="text-xs text-[#737373] mt-1">
                        Demo delivery option
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-semibold">
                    {shipping === 0
                      ? 'Free'
                      : formatCurrency(shipping)}
                  </span>
                </label>

                <label
                  className={`flex items-center justify-between rounded-xl border p-4 cursor-pointer transition ${
                    shippingSpeed === 'express'
                      ? 'border-black bg-[#fafafa]'
                      : 'border-[#e5e5e5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingSpeed"
                      value="express"
                      checked={shippingSpeed === 'express'}
                      onChange={() =>
                        setShippingSpeed('express')
                      }
                    />

                    <div>
                      <p className="text-sm font-medium">
                        Express Shipping
                      </p>

                      <p className="text-xs text-[#737373] mt-1">
                        Demo priority delivery option
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-semibold">
                    {formatCurrency(expressShippingCost)}
                  </span>
                </label>
              </div>
            </section>

            {/* Payment */}
            <section className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-[#f5f5f5] flex items-center justify-center">
                  <span className="text-sm font-semibold">3</span>
                </div>

                <div>
                  <h2 className="font-semibold">
                    Payment Method
                  </h2>

                  <p className="text-xs text-[#737373] mt-0.5">
                    Demo selection only
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 mb-5">
                <div className="flex gap-3">
                  <Lock className="w-5 h-5 text-amber-700 flex-shrink-0" />

                  <div>
                    <p className="text-sm font-medium text-amber-900">
                      No real payment processing
                    </p>

                    <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                      This checkout is a frontend demonstration.
                      Do not enter real card numbers, CVV codes,
                      or other sensitive payment information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`h-11 rounded-xl border text-sm font-medium transition ${
                    paymentMethod === 'card'
                      ? 'border-black bg-black text-white'
                      : 'border-[#d4d4d4] hover:border-black'
                  }`}
                >
                  Card
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple')}
                  className={`h-11 rounded-xl border text-sm font-medium transition ${
                    paymentMethod === 'apple'
                      ? 'border-black bg-black text-white'
                      : 'border-[#d4d4d4] hover:border-black'
                  }`}
                >
                  Apple Pay
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`h-11 rounded-xl border text-sm font-medium transition ${
                    paymentMethod === 'paypal'
                      ? 'border-black bg-black text-white'
                      : 'border-[#d4d4d4] hover:border-black'
                  }`}
                >
                  PayPal
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="mt-5 space-y-4">
                  <label>
                    <span className="text-sm font-medium">
                      Demo Card Number
                    </span>

                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(e.target.value)
                      }
                      placeholder="Do not enter a real card number"
                      inputMode="numeric"
                      autoComplete="off"
                      className="mt-2 w-full h-11 rounded-xl border border-[#d4d4d4] px-4 text-sm outline-none focus:border-black transition"
                    />
                  </label>

                  <div className="grid grid-cols-2 gap-4">
                    <label>
                      <span className="text-sm font-medium">
                        Expiry
                      </span>

                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) =>
                          setCardExpiry(e.target.value)
                        }
                        placeholder="MM/YY"
                        autoComplete="off"
                        className="mt-2 w-full h-11 rounded-xl border border-[#d4d4d4] px-4 text-sm outline-none focus:border-black transition"
                      />
                    </label>

                    <label>
                      <span className="text-sm font-medium">
                        CVC
                      </span>

                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) =>
                          setCardCvc(e.target.value)
                        }
                        placeholder="Demo only"
                        autoComplete="off"
                        className="mt-2 w-full h-11 rounded-xl border border-[#d4d4d4] px-4 text-sm outline-none focus:border-black transition"
                      />
                    </label>
                  </div>
                </div>
              )}

              {paymentMethod === 'apple' && (
                <div className="mt-5 rounded-xl bg-[#fafafa] border border-[#e5e5e5] p-4 text-sm text-[#737373]">
                  Apple Pay is displayed for UI demonstration only.
                  No Apple Pay transaction will be created.
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="mt-5 rounded-xl bg-[#fafafa] border border-[#e5e5e5] p-4 text-sm text-[#737373]">
                  PayPal is displayed for UI demonstration only.
                  No PayPal transaction will be created.
                </div>
              )}
            </section>
          </div>

          {/* Right Column */}
          <aside className="lg:sticky lg:top-6 h-fit">
            <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
              <h2 className="font-semibold text-lg">
                Demo Order Summary
              </h2>

              <div className="mt-5 space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex gap-3"
                  >
                    <div className="w-16 h-16 rounded-xl bg-[#f5f5f5] overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">
                        {item.product.name}
                      </p>

                      <p className="text-xs text-[#737373] mt-1">
                        Qty: {item.quantity}
                      </p>

                      {item.selectedColor && (
                        <p className="text-xs text-[#737373]">
                          Color: {item.selectedColor}
                        </p>
                      )}

                      {item.selectedSize && (
                        <p className="text-xs text-[#737373]">
                          Size: {item.selectedSize}
                        </p>
                      )}
                    </div>

                    <p className="text-sm font-medium">
                      {formatCurrency(
                        item.product.price * item.quantity
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#e5e5e5] mt-6 pt-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#737373]">
                    Subtotal
                  </span>

                  <span>{formatCurrency(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">
                      Discount {promoCode && `(${promoCode})`}
                    </span>

                    <span className="text-green-600">
                      -{formatCurrency(discount)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-[#737373]">
                    Shipping
                  </span>

                  <span>
                    {shippingSpeed === 'express'
                      ? formatCurrency(expressShippingCost)
                      : shipping === 0
                      ? 'Free'
                      : formatCurrency(shipping)}
                  </span>
                </div>

                <div className="border-t border-[#e5e5e5] pt-4 flex justify-between">
                  <span className="font-semibold">
                    Demo Total
                  </span>

                  <span className="text-xl font-semibold">
                    {formatCurrency(finalTotal)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="mt-6 w-full h-12 rounded-xl bg-black text-white text-sm font-medium hover:bg-[#262626] disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Demo Order...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Create Demo Order ·{' '}
                    {formatCurrency(finalTotal)}
                  </>
                )}
              </button>

              <div className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-[#737373]">
                <Lock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />

                <p>
                  This is a demonstration checkout. No payment,
                  order API, inventory reservation, email,
                  shipping request, or database transaction is
                  performed.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-[#e5e5e5] bg-white p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5" />

                <div>
                  <p className="text-sm font-medium">
                    Demo Experience
                  </p>

                  <p className="text-xs text-[#737373] mt-1">
                    No real purchase is made.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </form>
      </main>

      <footer className="border-t border-[#e5e5e5] bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737373]">
            <p>
              © {new Date().getFullYear()} NovaCart. Demo
              storefront.
            </p>

            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              Demo checkout — no real payment processed
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;