import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item or increment quantity
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        // increment quantity
        return prev.map((item) =>
          item.name === product.name ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  // Update quantity directly
  const updateQty = (product, change) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === product.name ? { ...item, qty: item.qty + change } : item
        )
        .filter((item) => item.qty > 0) // remove if qty drops to 0
    );
  };

  const removeItem = (product) => {
    setCart((prev) => prev.filter((item) => item.name !== product.name));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeItem, totalPrice, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
