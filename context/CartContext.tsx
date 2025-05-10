import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { CartItem, Product } from '@/types/product';
import { useProducts } from './ProductContext';

type CartContextType = {
  items: CartItem[];
  addToCart: (productId: string, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  cartProducts: (Product & { quantity: number; color?: string; size?: string })[];
};

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  subtotal: 0,
  cartProducts: [],
});

export const useCart = () => useContext(CartContext);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { products } = useProducts();
  const [totalItems, setTotalItems] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [cartProducts, setCartProducts] = useState<(Product & { quantity: number; color?: string; size?: string })[]>([]);

  // Update cart calculations whenever items or products change
  useEffect(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(count);

    // Map cart items to their product details
    const cartWithDetails = items.map(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) return null;

      const price = product.discountPrice || product.price;
      return {
        ...product,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      };
    }).filter(Boolean) as (Product & { quantity: number; color?: string; size?: string })[];

    setCartProducts(cartWithDetails);

    // Calculate subtotal
    const total = cartWithDetails.reduce(
      (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
      0
    );
    setSubtotal(total);
  }, [items, products]);

  const addToCart = (productId: string, quantity = 1, color?: string, size?: string) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => 
          item.productId === productId && 
          item.color === color && 
          item.size === size
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { productId, quantity, color, size }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        cartProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};