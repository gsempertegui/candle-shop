'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import ProductCard from '@/components/ProductCard'
import { Candle, getTotalCandlesCount } from '@/lib/supabase'
import { fetchCandlesByRange } from '@/lib/supabase'

export default function Products() {
  const [candles, setCandles] = useState<Candle[]>([])
  //const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [productsLoaded, setProductsLoaded] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef(1)

  const itemsPerPage = 4 // amount of products by load

  // Function to load products using the data layer...
  const fetchCandles = useCallback(async () => {
    //console.log('inicio fetchCandles')
    if (isLoading || !hasMore) 
      return
    setIsLoading(true)
    console.log('fetchCandles - page:', pageRef.current)
  
    try {
      // Check if there is more products, get total of products once
      let total = totalCount
      if (totalCount === 0) {
        total = await getTotalCandlesCount()
        //console.log('total=', total)
        setTotalCount(total)
        if (total <= 0) {
          setHasMore(false)
          setIsLoading(false)
          return
        }
      }
      //console.log('fetchCandles step III')

      const from = (pageRef.current - 1) * itemsPerPage
      //const to = from + itemsPerPage - 1
      const to = from + Math.min(itemsPerPage - 1, total - 1)
      //console.log('from=', from,' to=', to, ' totalCount=', totalCount)

      // If full load, stop
      if (from >= total!) {
        setHasMore(false)
        setIsLoading(false)
        return
      }

      //console.log('fetchCandles step IV')

      // 'to' can't exceed totalCount
      //const adjustedTo = Math.min(to, total! - 1)

      // Call data function
      //console.log('from=', from,' to=', to)
      const newCandles = await fetchCandlesByRange(from, to)

      //console.log('newCandles.length=', newCandles.length)


      setCandles((prev: Candle[]) => {
        const existingIds = new Set(prev.map( c => c.id))
        const uniqueNew = newCandles.filter(c => !existingIds.has(c.id))
        //console.log(`Agregando ${uniqueNew.length} productos únicos`)
        return [...prev, ...uniqueNew]
      })

      pageRef.current += 1
      //setPage((prev) => prev + 1)

      // MARCA DE PRODUCTOS CARGADOS
      setProductsLoaded(true)

      if (newCandles.length === 0 || from + newCandles.length >= total) {
        //console.log('no actualizó setCandles')
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error fetching candles:', error)
    } finally {
      setIsLoading(false)
      //console.log('fetchCandles step V')
    }
  }, [isLoading, hasMore, totalCount])

  // Initial load
  useEffect(() => {
    //console.log('Entró a carga inicial useEffect')
    //if (hasMore) {
    fetchCandles()
    //console.log('Carga inicial useEffect llamó a: fetchCandles()')
    //}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Setup IntersectionObserver
  useEffect(() => {
    if (!productsLoaded || !hasMore || isLoading || !loadMoreRef.current) {
      return
    }

    //console.log('IntersectionObserver useEffect: fetchCandles()')

    const currentLoadMoreRef = loadMoreRef.current

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          //console.log(' Scroll REAL detectado!!!')
          fetchCandles()
        }
      },
      { 
        root: null, // use the viewport as the root
        rootMargin: '100px',
        threshold: 1.0 
      }
    )

    if (currentLoadMoreRef) {
      observerRef.current.observe(currentLoadMoreRef)
    }

    return () => {
      if (currentLoadMoreRef && observerRef.current) {
        observerRef.current.unobserve(currentLoadMoreRef)
      }
    }
  }, [productsLoaded, fetchCandles, hasMore, isLoading])

  //console.log(' RENDER - candles.length:', candles.length)
  return(
    <main className='min-h-screen'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        {/* Título de la página */}
        <h1 className='text-3x1 sm:text-4xl font-bold text-center mb-4 sm:mb-6 lg:mb-8'>
          Nuestra Colección
        </h1>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {candles.map((candle) => (
            <ProductCard key={candle.id} product={candle}/>
          ))}
        
        {/* MAS ESPACIO ANTES DEL OBSERVER... */}
        <div style={{ height: '200px' }}></div>

        </section>
        {hasMore && (
          <div ref={loadMoreRef} 
            className='flex justify-center py-8 rounde-lg shadow-md'
            style={{ minHeight: '100px' }}
          >
            {isLoading ? (
              <p className='text-gray-600'>Cargando más velas...</p>
            ) : (
              <p className='text-gray-600'>Desplázate hacia abajo para cargar más...</p>
            )}
          </div>
        )}
        {!hasMore && candles.length > 0 && (
          <p className="text-center text-gray-600 py-4">
            Mostrando todos los {totalCount} productos
          </p>
        )}
      </div>
    </main>
  )
}