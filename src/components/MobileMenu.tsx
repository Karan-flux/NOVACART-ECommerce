import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, ArrowRight, Heart, ShoppingBag, ShieldCheck, HelpCircle } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/products';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onOpenSearch }) => {
  const { getWishlistCount } = useWishlist();
  const { getCartCount, setIsCartOpen } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="p-5 border-b border-[#E8E8E8] flex items-center justify-between">
          <NavLink to="/" onClick={onClose} className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight text-[#111111]">
              Nova<span className="text-[#FF5A36]">Cart</span>
            </span>
          </NavLink>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F7F7F5] text-[#737373] hover:text-[#111111]"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links Navigation */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#737373] tracking-wider block mb-2 px-2">
              Menu
            </span>
            {[
              { to: '/', label: 'Home' },
              { to: '/shop', label: 'Shop All' },
              { to: '/shop?filter=new', label: 'New Arrivals' },
              { to: '/shop?filter=bestseller', label: 'Best Sellers' },
              { to: '/about', label: 'About' },
              { to: '/blog', label: 'Blog' },
              { to: '/contact', label: 'Contact' },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#FF5A36]/10 text-[#FF5A36]'
                      : 'text-[#111111] hover:bg-[#F7F7F5]'
                  }`
                }
              >
                <span>{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#737373]" />
              </NavLink>
            ))}
          </div>

          {/* Categories Quick List */}
          <div className="pt-4 border-t border-[#E8E8E8]">
            <span className="text-[10px] uppercase font-bold text-[#737373] tracking-wider block mb-3 px-2">
              Shop by Category
            </span>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <NavLink
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  onClick={onClose}
                  className="px-3 py-2 rounded-lg bg-[#F7F7F5] hover:bg-[#111111] hover:text-white transition-colors text-xs font-medium text-[#111111] text-center"
                >
                  {cat.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-[#E8E8E8] space-y-2">
            <button
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-[#111111] hover:bg-[#F7F7F5]"
            >
              <span>Search Catalog</span>
              <span className="text-xs text-[#FF5A36] font-semibold">Instant Search</span>
            </button>

            <NavLink
              to="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-[#111111] hover:bg-[#F7F7F5]"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#FF5A36]" /> Wishlist
              </span>
              <span className="text-xs bg-[#F7F7F5] border border-[#E8E8E8] px-2 py-0.5 rounded-full font-semibold">
                {getWishlistCount()}
              </span>
            </NavLink>

            <button
              onClick={() => {
                onClose();
                setIsCartOpen(true);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-[#111111] hover:bg-[#F7F7F5]"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#FF5A36]" /> Shopping Bag
              </span>
              <span className="text-xs bg-[#FF5A36] text-white px-2 py-0.5 rounded-full font-semibold">
                {getCartCount()}
              </span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-5 border-t border-[#E8E8E8] bg-[#F7F7F5] text-xs text-[#737373] space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FF5A36]" />
            <span>100% Secure Shopping Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#737373]" />
            <span>Need Help? support@novacart.shop</span>
          </div>
        </div>
      </div>
    </div>
  );
};
