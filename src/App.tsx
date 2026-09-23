import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { CategoryPage } from './pages/Category';
import { ProductDetails } from './pages/ProductDetails';
import { CartPage } from './pages/Cart';
import { WishlistPage } from './pages/Wishlist';
import { CheckoutPage } from './pages/Checkout';
import { AboutPage } from './pages/About';
import { BlogPage } from './pages/Blog';
import { ContactPage } from './pages/Contact';

// Scroll to top helper on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen flex flex-col bg-white text-[#111111] antialiased selection:bg-[#FF5A36] selection:text-white">
            <ScrollToTop />
            {/* Top Bar Banner */}
            <AnnouncementBar />

            {/* Sticky Navigation */}
            <Navbar />

            {/* Main Application Routes */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />
                {/* Fallback */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>

            {/* Global Slide-Over Cart Drawer */}
            <CartDrawer />

            {/* Global Multi-Column Footer */}
            <Footer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
