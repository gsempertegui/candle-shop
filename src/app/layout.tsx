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
          <main>{children}</main>
          <footer className='bg-gray-800 text-white text-center py-4 mt-12'>
            <p>Empoderado por <a href="https:77x.ai" target="_blank" className='text-amber-400 hover:underline'>Grok</a> &copy; 2025</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}