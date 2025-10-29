'use client'

import { createContext, useContext, useCallback, useMemo, useState, ReactNode } from 'react'
import { Candle } from '@/lib/supabase'

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

  const addToCart = useCallback((product: Candle) => {
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
  },[])

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id))
  },[])

//  const clearCart = () => {
//    setCart([])
//  }

  const clearCart = useCallback(() => {
    setCart([]);
  }, []); // El array de dependencias está vacío porque no depende de ninguna variable externa

  const updateQuantity = useCallback((id: string, quantity: number): void => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart((prev: CartItem[]): CartItem[] =>
      prev.map(item =>
        item.product.id === id ? { ...item, quantity } : item
      )
    )
  },[removeFromCart])

  //const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const getTotal = useCallback((): number => {
    return parseFloat(
      cart
        .reduce((sum: number, item: CartItem) => 
          sum + (item.product.price * item.quantity), 0)
        .toFixed(2)
    )
  },[cart])

  const cartCount = parseFloat(cart
          .reduce((sum, item) => 
            sum + (item.product.price * item.quantity), 0)
          .toFixed(2))

  console.log('CartContext => typeof(cartCount)=', typeof(cartCount))

  // 1. Usa useMemo para memoizar el valor del contexto
  const contextValue = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotal,
      cartCount,
      clearCart
    }),
    [cart, addToCart, removeFromCart, updateQuantity, getTotal, cartCount, clearCart],
  )

  return (
    <CartContext.Provider value={contextValue}>
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