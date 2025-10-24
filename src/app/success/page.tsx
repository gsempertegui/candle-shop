'use client'

import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Success() {
  const { clearCart } = useCart()

  // Ejecutar clearCart SOLO al montar
  useEffect(() => {
    clearCart() // ✅ UNA SOLA VEZ
  }, []) // ✅ CORCHETES VACÍOS = 1 EJECUCIÓN

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-md text-center">
        <div className="bg-green-100 p-8 rounded-full mb-6 inline-block">
          <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-green-800 mb-4">¡Compra Exitosa!</h1>
        <p className="text-gray-600 mb-8">Tu pedido ha sido confirmado. Recibirás un email con los detalles.</p>
        <Link
          href="/"
          className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 font-semibold transition-colors"
        >
          🏠 Volver al inicio
        </Link>
      </div>
    </main>
  )
}