'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Candle } from '@/lib/supabase'
import { create } from 'domain'

interface CartItem extends Candle {
  product: Candle
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Candle) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  getTotal: () => number
  cartCount: number
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Candle) => {
    setCart((prev): CartItem[] => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, {product, quantity: 1 }] as CartItem[]
    })
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  const updateQuantity = (id: string, quantity: number): void => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart((prev: CartItem[]): CartItem[] =>
      prev.map(item =>
        item.product.id === id ? { ...item, quantity } : item
      )
    )
  }

  //const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const getTotal = (): number => {
    return parseFloat(
      cart
        .reduce((sum: number, item: CartItem) => 
          sum + (item.product.price * item.quantity), 0)
        .toFixed(2)
    )
  }

  let cartCount = parseFloat(cart
          .reduce((sum, item) => 
            sum + (item.product.price * item.quantity), 0)
          .toFixed(2))

  console.log('CartContext => typeof(cartCount)=', typeof(cartCount))
  
  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotal,
      cartCount,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }
  return context
}