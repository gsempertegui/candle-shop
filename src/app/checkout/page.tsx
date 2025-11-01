'use client'

//import dynamic from 'next/dynamic'

import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from '@paypal/paypal-js'
import { paymentOptions, processPayment, PaymentResult } from '@/lib/payments'
import Link from 'next/link'
import Image from 'next/image'

export default function Checkout() {
  const { cart, getTotal } = useCart()
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState('')
  const total = getTotal()
  const totalStr = total.toFixed(2)

  // PayPal handlers
  const createPayPalOrder = (data: CreateOrderData, actions: CreateOrderActions) => {
    return actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: { 
          currency_code: 'USD',
          value: totalStr,
        },
      }]
    })
  }

  const onPayPalApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    setIsProcessing(true)
    try {
      if (actions.order) {
        const details = await actions.order.capture()
        //console.log('Pago exitoso:', details)
        setStatus(`✅ ¡Pago exitoso! ID de transacción: ${details.id}`)
        setTimeout(() => router.push('/success'), 1500)
      } else {
        // Maneja el caso en que actions.order no está definido
        console.error('El objeto actions.order no está disponible.')
        setStatus('❌ Error: El proceso de pago no pudo completarse.')
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message); // Acceso seguro a .message
        setStatus('❌ Error en PayPal: ' + error.message)
      } else {
        // Maneja el caso en el que el error no sea una instancia de Error
        console.error('Ocurrió un error desconocido', error);
        setStatus('❌ Error desconocido en PayPal: ' + error)
      }      
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
      if (error instanceof Error) {
        console.error(error.message); // Acceso seguro a .message
        setStatus('❌ Error en el pago: ' + error.message)
      } else {
        // Maneja el caso en el que el error no sea una instancia de Error
        console.error('Ocurrió un error desconocido', error);
        setStatus('❌ Error desconocido en el pago: ' + error)
      }      
    } finally {
      setIsProcessing(false)
    }
  }

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart')
      return
    }
  }, [cart, router])

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
                  <Image 
                    src={option.icon} 
                    alt={option.name} 
                    width={64} height={64} 
                    style={{ objectFit: 'contain'}}
                    className="rounded" />
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