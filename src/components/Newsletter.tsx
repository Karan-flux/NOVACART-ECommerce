import React, { useState } from 'react';
import { Mail, Check, Sparkles } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#E8E8E8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#FF5A36]/10 text-[#FF5A36] flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight">
          Get 10% Off Your First Order
        </h2>

        <p className="text-sm sm:text-base text-[#737373] mt-3 max-w-xl mx-auto leading-relaxed">
          Join the NovaCart community for new arrivals, exclusive offers, early access to limited capsule drops, and style inspiration.
        </p>

        {subscribed ? (
          <div className="mt-8 p-6 bg-[#F7F7F5] border border-[#E8E8E8] rounded-2xl max-w-md mx-auto animate-in fade-in duration-300">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#111111]">Welcome to NovaCart!</h4>
            <p className="text-xs text-[#737373] mt-1">
              Your 10% off code has been unlocked:
            </p>
            <div className="mt-3 p-2 bg-white border border-dashed border-[#FF5A36] rounded-xl font-mono text-sm font-bold text-[#FF5A36]">
              WELCOME10
            </div>
            <span className="text-[11px] text-[#737373] mt-2 block">
              Auto-applies at checkout on your first purchase.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-[#E8E8E8] focus:border-[#111111] text-xs sm:text-sm text-[#111111] outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 bg-[#111111] hover:bg-[#FF5A36] text-white rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-xs shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Subscribe</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-[#737373] mt-3">
              By subscribing, you agree to receive marketing emails from NovaCart. You may unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
