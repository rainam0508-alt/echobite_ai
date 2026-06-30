import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('echoCart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('echoUser')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [toast, setToast] = useState({ message: '', visible: false })

  useEffect(() => {
    localStorage.setItem('echoCart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: (i.qty || 1) + 1 } : i
        )
      }
      return [...prev, { ...item, qty: 1 }]
    })
    showToast(`${item.name} added to cart! 🛒`)
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
    showToast('Item removed')
  }

  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id)
    } else {
      setCart((prev) =>
        prev.map((i) => (i.id === id ? { ...i, qty } : i))
      )
    }
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * (item.qty || 1), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.qty || 1), 0)
  }

  const login = (email, password) => {
    const userData = { email, name: email.split('@')[0] }
    setUser(userData)
    localStorage.setItem('echoUser', JSON.stringify(userData))
    showToast('Login successful! ✓')
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('echoUser')
    showToast('Logged out successfully')
  }

  const showToast = (message) => {
    setToast({ message, visible: true })
    setTimeout(() => setToast({ message: '', visible: false }), 2000)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        user,
        login,
        logout,
        toast,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
