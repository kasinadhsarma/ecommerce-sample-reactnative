import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '@/types/product';
import { useProducts } from './ProductContext';

type CartProduct = Product & {
  quantity: number;
  color?: string;
  size?: string;
};

type CartContextType = {
  cartProducts: CartProduct[];
  addToCart: (productId: string, quantity: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string, color?: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
};

const CartContext = createContext<CartContextType>({
  cartProducts: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  subtotal: 0,
  totalItems: 0,
});

export const useCart = () => useContext(CartContext);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const { getProductById } = useProducts();

  // Calculate subtotal
  const subtotal = cartProducts.reduce(
    (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
    0
  );

  // Calculate total number of items
  const totalItems = cartProducts.reduce((sum, item) => sum + item.quantity, 0);

  // Add product to cart
  const addToCart = (productId: string, quantity: number, color?: string, size?: string) => {
    const product = getProductById(productId);
    
    if (!product) return;

    // Check if the product already exists in cart with the same color/size
    const existingItemIndex = cartProducts.findIndex(
      (item) => 
        item.id === productId && 
        item.color === color && 
        item.size === size
    );

    if (existingItemIndex !== -1) {
      // Update quantity if it already exists
      const updatedCart = [...cartProducts];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartProducts(updatedCart);
    } else {
      // Add new item if it doesn't exist
      setCartProducts([
        ...cartProducts,
        {
          ...product,
          quantity,
          color,
          size,
        },
      ]);
    }
  };

  // Remove product from cart
  const removeFromCart = (productId: string, color?: string, size?: string) => {
    setCartProducts(
      cartProducts.filter(
        (item) => 
          !(item.id === productId && 
            item.color === color && 
            item.size === size)
      )
    );
  };

  // Update product quantity
  const updateQuantity = (productId: string, quantity: number, color?: string, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }

    const updatedCart = cartProducts.map((item) => {
      if (
        item.id === productId && 
        item.color === color && 
        item.size === size
      ) {
        return { ...item, quantity };
      }
      return item;
    });

    setCartProducts(updatedCart);
  };

  // Clear the cart
  const clearCart = () => {
    setCartProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};