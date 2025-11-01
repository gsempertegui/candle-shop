'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SpeedInsights } from "@vercel/speed-insights/next"

//import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'
import Navbar from '@/components/Navbar'


const inter = Inter({ subsets: ['latin'] })

//export const metadata: Metadata = {
//  title: 'George\'s Candle Shop - Velas Aromáticas Premium',
//  description: 'E-commerce de velas aromáticas hechas con amor y esencias naturales',
//}

export default function RootLayout({
  children,
  }: {
    children: React.ReactNode
}) {
  const pathname = usePathname()

  useEffect(() => {
    if (['/products', '/checkout'].includes(pathname)) {
      const link = document.createElement('link')
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
  }, [pathname])

  useEffect(() => {
    if (window.location.pathname.includes('/checkout')) {
      import('@paypal/react-paypal-js')
    }
  }, [])

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <footer>
            <div className="text-center">
              <p>&copy; 2025 George Sempértegui. Asistencia de IA por Grok y Gemini.</p>
            </div>
          </footer>          
        </CartProvider>
      </body>
    </html>
  )
}