'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

export default function Navbar() {
  const { cartCount } = useCart()

  return(
    <nav className='bg-white shadow-lg border-b'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center py-4'>
          {/* LOGO */}
          <Link href="/" className='text-2x1 text-gray-700 font-medium hover:text-amber-600 flex items-center'>
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2L3 6v11a2 2 0 002 2h8a2 2 0 002-2V6l-7-4z"/>
            </svg>
            Candle Shop
          </Link>
          {/* MENÚ */}
          <div className='flex items-center space-x-8'>
            <Link 
              href="/products" 
              className='text-gray-700 hover:text-amber-600 font-medium flex items-center'
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
              Productos
            </Link>

            {/* CARRITO CON CONTADOR */}
            <Link href="/cart" className='relative text-gray 700 font-medium flex items-center hover:text-amber-600'>
              <svg className="w-5 h-5 mr-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m-1.6 0L4 13M16 13l-2 2m0 0l-2-2m2 2v4m0 0H9m3 0H9" />
              </svg>              
              {cartCount > 0 && (
                <span className={`absolute -bottom-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold ${
                  cartCount <= 9 ? 'h-6 w-8 right-3' :
                  cartCount <= 99 ? 'h-6 w-10 right-2 text-sm' :
                  cartCount <= 999 ? 'h-6 w-12 right-1 text-sm' :
                  'h-6 w-14 right-0 text-sm'
                }`}>
                  ${cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}