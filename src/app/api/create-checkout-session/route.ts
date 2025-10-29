import { NextResponse } from 'next/server'
import Stripe from 'stripe'

interface Item {
  name: string;
  image_url: string;
  price: number;
  quantity: number;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  try {
    const { items } = await request.json()

    const lineItems = items.map((item: Item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image_url || '/placeholder-candle.jpg'],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success`,
      cancel_url: `${request.headers.get('origin')}/cart`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message); // Acceso seguro a .message
      return NextResponse.json({ error: 'Error creando sesión: ' + error.message }, { status: 500 })
    } else {
      // Maneja el caso en el que el error no sea una instancia de Error
      console.error('Ocurrió un error desconocido', error);
      return NextResponse.json({ error: 'Error creando sesión' }, { status: 500 });
    }      
  }
}