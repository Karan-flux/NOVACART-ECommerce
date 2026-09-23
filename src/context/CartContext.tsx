import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string, selectedSize?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getShipping: () => number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  promoCode: string;
  promoDiscountPercent: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  lastAddedItem: CartItem | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'novacart_shopping_cart_v1';
const FREE_SHIPPING_THRESHOLD = 50.0;
const STANDARD_SHIPPING_COST = 9.99;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return [
      // Pre-seed 1 item so cart is ready to play with immediately if desired
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscountPercent, setPromoDiscountPercent] = useState(0);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, selectedColor?: string, selectedSize?: string) => {
    const color = selectedColor || product.colors?.[0]?.name || 'Standard';
    const size = selectedSize || product.sizes?.[0] || 'Standard';

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
      }
    });

    const newItem: CartItem = { product, quantity, selectedColor: color, selectedSize: size };
    setLastAddedItem(newItem);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedColor?: string, selectedSize?: string) => {
    setCart((prev) =>
      prev.filter((item) => {
        if (item.product.id !== productId) return true;
        if (selectedColor && item.selectedColor !== selectedColor) return true;
        if (selectedSize && item.selectedSize !== selectedSize) return true;
        return false;
      })
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedColor?: string, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor, selectedSize);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        const matches =
          item.product.id === productId &&
          (!selectedColor || item.selectedColor === selectedColor) &&
          (!selectedSize || item.selectedSize === selectedSize);

        if (matches) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setPromoDiscountPercent(0);
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const getShipping = () => {
    const subtotal = getSubtotal();
    if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) {
      return 0;
    }
    return STANDARD_SHIPPING_COST;
  };

  const getDiscount = () => {
    const subtotal = getSubtotal();
    if (promoDiscountPercent > 0) {
      return (subtotal * promoDiscountPercent) / 100;
    }
    return 0;
  };

  const getCartTotal = () => {
    const subtotal = getSubtotal();
    if (subtotal === 0) return 0;
    const discount = getDiscount();
    const shipping = getShipping();
    return Math.max(0, subtotal - discount + shipping);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const applyPromoCode = (code: string) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'SUMMER20' || cleaned === 'NOVA20') {
      setPromoCode(cleaned);
      setPromoDiscountPercent(20);
      return { success: true, message: '20% off discount applied!' };
    }
    if (cleaned === 'WELCOME10' || cleaned === 'NOVA10') {
      setPromoCode(cleaned);
      setPromoDiscountPercent(10);
      return { success: true, message: '10% welcome discount applied!' };
    }
    if (cleaned === 'FLASH70') {
      setPromoCode(cleaned);
      setPromoDiscountPercent(30);
      return { success: true, message: 'Flash VIP 30% savings applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try NOVA20 or WELCOME10' };
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        getSubtotal,
        getDiscount,
        getShipping,
        isCartOpen,
        setIsCartOpen,
        promoCode,
        promoDiscountPercent,
        applyPromoCode,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
