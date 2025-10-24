'use client'

import { useCart } from "@/contexts/CartContext"
import Link from "next/link"
import Image from "next/image"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart()

  if (cart.length === 0) {
    return(
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3x1 font-bold text-center mb-8">Tu Carrito</h1>
          <div className="text-center py-12">
            <p className="text-x1 text-gray-600 mb-4">Tu carrito está vacío</p>
            <Link
              href="/products"
              className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700"
            >
              Ver Productos
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return(
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="ext-3x1 font-bold text-center mb-8">Tu Carrito</h1>

        <div className="max-w-4x1 mx-auto space-y-4 mb-8">
          {cart.map((item) => (
            <div key={item.product.id} className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <Image
                src={item.product.image_url || '/placeholder-candle.jpg'}
                alt={item.product.name}
                width={80}
                height={80}
                className="rounded mr-4"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">${item.product.price}</p>
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
                  className="w-16 text-center border rounded"
                />
                <span className="font-semibold">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  🗑 Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4x1 mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2x1 font-bold mb-4">
            Total: ${Number(getTotal().toFixed(2))}
          </h2>
          <Link
            href="/checkout"
            className="block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 font-semibold transition-colors"
          >
            💳 Proceder al pago (${getTotal().toFixed(2)})
          </Link>
        </div>
      </div>
    </main>
  )
}