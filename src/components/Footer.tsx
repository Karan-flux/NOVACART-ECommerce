import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Socials */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="text-2xl font-black tracking-tight text-white inline-flex items-center">
              Nova<span className="text-[#FF5A36]">Cart</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36] ml-1 mb-2" />
            </Link>
            <p className="text-xs sm:text-sm text-[#A3A3A3] max-w-sm leading-relaxed">
              Modern shopping for modern lifestyles. High-performance streetwear, studio acoustics, minimalist interiors, and daily essentials engineered with exceptional taste.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF5A36] flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF5A36] flex items-center justify-center text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#x"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF5A36] flex items-center justify-center text-white transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF5A36] flex items-center justify-center text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-white">
              Shop
            </h4>
            <ul className="space-y-2 text-xs text-[#A3A3A3]">
              <li>
                <Link to="/shop?filter=new" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=bestseller" className="hover:text-white transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/category/fashion" className="hover:text-white transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/category/electronics" className="hover:text-white transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=sale" className="text-[#FF5A36] font-semibold hover:underline">
                  Summer Sale (-70%)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-[#A3A3A3]">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Editorial Blog
                </Link>
              </li>
              <li>
                <Link to="/about#story" className="hover:text-white transition-colors">
                  Our Story & Values
                </Link>
              </li>
              <li>
                <Link to="/about#careers" className="hover:text-white transition-colors">
                  Careers <span className="text-[10px] bg-[#FF5A36] text-white px-1.5 py-0.2 rounded-full font-bold ml-1">Hiring</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Help & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-white">
              Help
            </h4>
            <ul className="space-y-2 text-xs text-[#A3A3A3]">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  FAQ & Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Shipping Rates & Delivery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  30-Day Hassle-Free Returns
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737373]">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span>© 2026 NovaCart Inc. All rights reserved.</span>
            <span>·</span>
            <span>Designed for Modern Lifestyles</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] tracking-wider text-[#A3A3A3]">
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono">VISA</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono">MC</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono">AMEX</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono">APPLE PAY</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/10 hover:bg-[#FF5A36] text-white transition-colors"
              aria-label="Scroll back to top"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
