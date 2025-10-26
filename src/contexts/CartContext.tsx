import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  memberPrice?: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('febsin_cart');
    const savedWishlist = localStorage.getItem('febsin_wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === item.size);
      let newCart;
      
      if (existing) {
        newCart = prev.map(i => 
          i.id === item.id && i.size === item.size 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        newCart = [...prev, { ...item, quantity: 1 }];
      }
      
      localStorage.setItem('febsin_cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (id: string, size: string) => {
    setCart(prev => {
      const newCart = prev.filter(item => !(item.id === id && item.size === size));
      localStorage.setItem('febsin_cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    
    setCart(prev => {
      const newCart = prev.map(item =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      );
      localStorage.setItem('febsin_cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('febsin_cart');
  };

  const addToWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) return prev;
      const newWishlist = [...prev, productId];
      localStorage.setItem('febsin_wishlist', JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => {
      const newWishlist = prev.filter(id => id !== productId);
      localStorage.setItem('febsin_wishlist', JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <CartContext.Provider value={{
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      addToWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
