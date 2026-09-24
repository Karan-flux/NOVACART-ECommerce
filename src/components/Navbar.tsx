import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  Menu,
  ChevronDown,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { CATEGORIES } from "../data/products";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";

export const Navbar: React.FC = () => {
  const { getCartCount, setIsCartOpen } = useCart();
  const { getWishlistCount } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-[#E8E8E8]"
            : "bg-white border-b border-[#E8E8E8]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* LEFT: NovaCart Brand */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg text-[#111111] hover:bg-[#F7F7F5] transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link
              to="/"
              className="text-xl sm:text-2xl font-black tracking-tight text-[#111111] hover:opacity-90 transition-opacity flex items-center"
            >
              Nova<span className="text-[#FF5A36]">Cart</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF5A36] ml-1 mb-2"></span>
            </Link>
          </div>

          {/* CENTER: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#111111]">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-colors hover:text-[#FF5A36] py-1 ${isActive ? "text-[#FF5A36] font-semibold" : "text-[#111111]"}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `transition-colors hover:text-[#FF5A36] py-1 ${isActive ? "text-[#FF5A36] font-semibold" : "text-[#111111]"}`
              }
            >
              Shop
            </NavLink>

            <NavLink
              to="/shop?filter=new"
              className={({ isActive }) =>
                `transition-colors hover:text-[#FF5A36] py-1 ${isActive ? "text-[#FF5A36] font-semibold" : "text-[#111111]"}`
              }
            >
              New Arrivals
            </NavLink>

            <NavLink
              to="/shop?filter=bestseller"
              className={({ isActive }) =>
                `transition-colors hover:text-[#FF5A36] py-1 ${isActive ? "text-[#FF5A36] font-semibold" : "text-[#111111]"}`
              }
            >
              Best Sellers
            </NavLink>

            {/* Categories with Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
              onMouseLeave={() => setIsCategoryDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 hover:text-[#FF5A36] transition-colors py-1 cursor-pointer font-medium"
                onClick={() => navigate("/shop")}
              >
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#737373] group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-white rounded-xl shadow-xl border border-[#E8E8E8] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-[#737373] tracking-wider border-b border-[#E8E8E8] mb-1">
                    Featured Categories
                  </div>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.id}`}
                      onClick={() => setIsCategoryDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#111111] hover:bg-[#F7F7F5] hover:text-[#FF5A36] transition-colors rounded-lg mx-1"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-[#737373] font-normal">
                        {cat.count}
                      </span>
                    </Link>
                  ))}
                  <div className="p-2 border-t border-[#E8E8E8] mt-1 bg-[#F7F7F5]/50">
                    <Link
                      to="/shop"
                      onClick={() => setIsCategoryDropdownOpen(false)}
                      className="block text-center text-xs font-bold text-[#FF5A36] hover:underline"
                    >
                      View All Collections →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `transition-colors hover:text-[#FF5A36] py-1 ${isActive ? "text-[#FF5A36] font-semibold" : "text-[#111111]"}`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `transition-colors hover:text-[#FF5A36] py-1 ${isActive ? "text-[#FF5A36] font-semibold" : "text-[#111111]"}`
              }
            >
              Blog
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `transition-colors hover:text-[#FF5A36] py-1 ${isActive ? "text-[#FF5A36] font-semibold" : "text-[#111111]"}`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-full hover:bg-[#F7F7F5] text-[#111111] transition-colors"
              aria-label="Search catalog"
              title="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-2.5 rounded-full hover:bg-[#F7F7F5] text-[#111111] transition-colors relative hidden sm:flex items-center justify-center"
              aria-label="View wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#111111] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="p-2.5 rounded-full hover:bg-[#F7F7F5] text-[#111111] transition-colors hidden sm:flex items-center justify-center"
              aria-label="Account details"
              title="My Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-full hover:bg-[#F7F7F5] text-[#111111] transition-colors relative flex items-center justify-center ml-0.5"
              aria-label="View shopping cart"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF5A36] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums shadow-xs animate-in zoom-in-50 duration-200">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Account Info Modal */}
      {isAccountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-[#F7F7F5] border border-[#E8E8E8] flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6 text-[#111111]" />
            </div>
            <h3 className="text-center text-lg font-bold text-[#111111]">
              NovaCart VIP Member
            </h3>
            <p className="text-center text-xs text-[#737373] mt-1 mb-5">
              Welcome back! Enjoy member-exclusive preview discounts and free
              global shipping.
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#F7F7F5] rounded-xl flex items-center justify-between">
                <span className="text-[#737373]">Account Status</span>
                <span className="font-semibold text-emerald-600">
                  Active VIP
                </span>
              </div>
              <div className="p-3 bg-[#F7F7F5] rounded-xl flex items-center justify-between">
                <span className="text-[#737373]">Member Tier</span>
                <span className="font-semibold text-[#111111]">
                  Platinum Shopper
                </span>
              </div>
              <div className="p-3 bg-[#F7F7F5] rounded-xl flex items-center justify-between">
                <span className="text-[#737373]">Active Coupon</span>
                <span className="font-mono font-bold text-[#FF5A36]">
                  NOVA20 (20% OFF)
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => {
                  setIsAccountModalOpen(false);
                  navigate("/wishlist");
                }}
                className="flex-1 py-2.5 bg-[#F7F7F5] hover:bg-[#E8E8E8] text-[#111111] rounded-xl text-xs font-semibold transition-colors"
              >
                My Wishlist
              </button>
              <button
                onClick={() => setIsAccountModalOpen(false)}
                className="flex-1 py-2.5 bg-[#111111] hover:bg-[#FF5A36] text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
