import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'George\'s Candle Shop - Velas Aromáticas Premium',
  description: 'E-commerce de velas aromáticas hechas con amor y esencias naturales',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}