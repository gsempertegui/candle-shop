'use client'

import Image from 'next/image'
import { Candle } from '../lib/supabase'
import { useCart } from '@/contexts/CartContext'

interface ProductCardProps {
  product: Candle
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
  }

  //console.log('ProductCard: product.id=',product.id)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 max-w-sm mx-auto">
      <div className="relative aspect-square">
        <div>
          <Image
            src={product.image_url}
            alt={product.name}
            width={400}
            height={400}
            priority={false} // Lazy load para mejor performance
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div>
          <span className="absolute top-2 right-2 bg-primary-500 text-black text-xs px-2 py-1 rounded-full">
            ${product.price}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{product.scent} - {product.size}</p>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="mt-4">
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            🛒Añadir al Carrito - ${product.price}
          </button>
        </div>
      </div>
    </div>
  )
}