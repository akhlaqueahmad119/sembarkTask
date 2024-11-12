import React, { createContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const loadCartFromLocalStorage = useCallback(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  }, []);

  const [cartItems, setCartItems] = useState(loadCartFromLocalStorage);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = useCallback((product) => {
    setCartItems((prevCartItems) => {
      const existingProduct = prevCartItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return prevCartItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevCartItems, { ...product, qty: 1 }];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== productId)
    );
  }, []);

  const updateCartItemQty = useCallback((id, newQty) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id ? { ...item, qty: newQty } : item
      )
    );
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCartItemQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
