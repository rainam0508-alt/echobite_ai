import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('echoCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('echoUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('echoCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existing = prevCart.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, qty } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.qty, 0);
  };

  const login = (email, password) => {
    const user = { email, name: email.split('@')[0] };
    setUser(user);
    localStorage.setItem('echoUser', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('echoUser');
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      user,
      login,
      logout
    }}>
      {children}
    </CartContext.Provider>
  );
};
