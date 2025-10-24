'use client'

import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { paymentOptions, processPayment, PaymentResult } from '@/lib/payments'
import Link from 'next/link'

export default function Checkout() {
  const { cart, getTotal } = useCart()
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState('')
  const total = getTotal()

  // PayPal handlers
  const createPayPalOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [{
        amount: { value: total.toFixed(2) }
      }]
    })
  }

  const onPayPalApprove = async (data: any, actions: any) => {
    setIsProcessing(true)
    try {
      const details = await actions.order.capture()
      setStatus('✅ ¡Pago PayPal exitoso!')
      setTimeout(() => router.push('/success'), 1500)
    } catch (error) {
      setStatus('❌ Error en PayPal')
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePayment = async () => {
    if (!selectedMethod || selectedMethod === 'paypal') return
    setIsProcessing(true)
    setStatus('')

    try {
      const result: PaymentResult = await processPayment(selectedMethod, total, cart)
      if (result.url) {
        window.location.href = result.url // Stripe redirect
      } else {
        setStatus(result.message || '✅ Proceso completado')
        setTimeout(() => router.push('/success'), 1500)
      }
    } catch (error) {
      setStatus('❌ Error en el pago')
    } finally {
      setIsProcessing(false)
    }
  }

  if (cart.length === 0) {
    router.push('/cart')
    return null
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Finalizar Compra</h1>
          <Link href="/cart" className="text-amber-600 hover:underline">← Volver al carrito</Link>
        </div>

        {/* RESUMEN */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
          <div className="space-y-3 mb-6">
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between py-2">
                <span>{item.product.name} × {item.quantity}</span>
                <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between text-xl font-bold text-gray-800">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* MÉTODOS DE PAGO */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>
          
          <div className="space-y-3 mb-6">
            {paymentOptions.map((option) => (
              <label 
                key={option.id} 
                className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="radio"
                  value={option.id}
                  checked={selectedMethod === option.id}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="mr-3 w-4 h-4 text-amber-600"
                />
                <div className="flex items-center space-x-3 flex-1">
                  <img src={option.icon} alt={option.name} className="w-8 h-8 rounded" />
                  <div>
                    <div className="font-medium text-gray-800">{option.name}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>

          {/* PAYPAL BUTTONS */}
          {selectedMethod === 'paypal' && (
            <PayPalScriptProvider 
              options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                currency: 'USD',
                intent: 'capture'
              }}
            >
              <PayPalButtons
                style={{ layout: 'vertical', color: 'gold', shape: 'rect' }}
                createOrder={createPayPalOrder}
                onApprove={onPayPalApprove}
                disabled={isProcessing}
              />
            </PayPalScriptProvider>
          )}

          {/* BOTÓN PARA OTROS MÉTODOS */}
          {selectedMethod && selectedMethod !== 'paypal' && (
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold transition-colors"
            >
              {isProcessing ? "Procesando..." : `💳 Pagar $${total.toFixed(2)}`}
            </button>
          )}

          {status && (
            <p className={`mt-4 text-center font-semibold p-3 rounded ${
              status.includes('✅') ? 'bg-green-100 text-green-800' : 
              status.includes('❌') ? 'bg-red-100 text-red-800' : 
              'bg-blue-100 text-blue-800'
            }`}>
              {status}
            </p>
          )}
        </div>
      </div>
    </main>
  )
}