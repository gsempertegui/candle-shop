import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export interface PaymentOption {
  id: string
  name: string
  description: string
  fee: number
  icon: string
}

export const paymentOptions: PaymentOption[] = [
  {
    id: "stripe",
    name: "💳 Tarjeta de Crédito",
    description: "Visa, MasterCard, American Express",
    fee: 2.9,
    icon: "/images/icons/stripe.ico"
  },
  {
    id: "paypal",
    name: "🐧 PayPal",
    description: "Paga con tu cuenta PayPal",
    fee: 3.49,
    icon: "/images/icons/paypal-svgrepo-com.svg"
  },
  {
    id: "cod",
    name: "📦 Contra Entrega",
    description: "Paga en efectivo al recibir",
    fee: 0,
    icon: "/images/icons/cash-on-delivery-svgrepo-com.svg"
  },
  {
    id: "transfer",
    name: "🏦 Transferencia",
    description: "Banco de Guayaquil, Banco del Pichincha, Banco del Pacífico",
    fee: 0,
    icon: "/images/icons/bank-transfer-svgrepo-com.svg"
  }
]

export interface PaymentResult {
  success: boolean
  message?: string
  url?: string // Para Stripe
}

export async function processPayment(method: string, amount: number, items: any[]): Promise<PaymentResult> {
  switch (method) {
    case "stripe":
      return await processStripe(amount, items)
    case "paypal":
      return { success: true, message: "PayPal: Botones renderizados" }
    case "cod":
      return { success: true, message: "✅ Pedido confirmado. Paga al recibir." }
    case "transfer":
      return { success: true, message: "📧 Instrucciones enviadas a tu email." }
    default:
      throw new Error("Método no válido")
  }
}

async function processStripe(amount: number, items: any[]): Promise<PaymentResult> {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, items })
  })
  const { url } = await response.json()
  return { success: true, url }
}