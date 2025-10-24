import Link from 'next/link'
import { fetchPopularCandles, Candle } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'

export default async function Home() {
  let candles: Candle[] = []
  
  try {
    candles = await fetchPopularCandles()
  } catch (error) {
    console.error('Error fetching popular candles:', error)
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-1 pt-10">
          <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-5xl lg:text-6x1 md:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-8">
              Velas Aromáticas
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto mb-1">
              Descubre nuestra colección de velas artesanales con esencias naturales que transforman tu hogar
            </p>
            <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
              <Link
                href="/products"
                className="bg-primary-700 border-2 border-gray-400 hover:bg-primary-900 
                                  hover:border-gray-300 focus:outline-none focus:border-gray-500
                                  focus:shadow-lg active:shadow-sm active:translate-y-0.5
                                  text-base sm:text-lg shadow-md hover:shadow-lg 
                                  active:border-gray-500 text-gray-500 px-8 py-3 rounded-lg text-lg 
                                  font-semibold transition-all duration-300">
                Explorar Colección
              </Link>
            </div>
          </div>
        </section>

        {/* Productos Destacados */}
        <section className="py-1 bg-white">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-12">Productos Destacados</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {candles.slice(0, 8).map((candle) => (
                <ProductCard key={candle.id} product={candle} />
              ))}
            </div>
            {candles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No hay productos disponibles en este momento.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}