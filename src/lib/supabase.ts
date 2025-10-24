import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase env vars')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos de datos
export interface Candle {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  scent: string
  size: string
  stock: number
  created_at: string
  popularity: number
}

// Obtener todos los productos
export async function getCandles(): Promise<Candle[]> {
  const { data, error } = await supabase
    .from('candles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching the whole candles: ', error)
    throw error
  }
  return data || []
}

// Get popular products
export async function fetchPopularCandles(limit: number = 4): Promise<Candle[]> {
  let query = supabase
    .from('candles')
    .select('*')
    .limit(limit)
    .order('popularity', { ascending: false })

  const { data, error } = await query

  if (error) {
    console.error('Error fetching popular candles: ', error)
    throw error
  }

  return data || []
}

// Get products by range (for infinite load)
export async function fetchCandlesByRange(from: number, to: number): Promise<Candle[]> {
  console.log('supabase.ts: from=', from,' to=', to)
  const { data, error } = await supabase
    .from('candles')
    .select('*')
    .range(from, to)
    .order('id', { ascending: true })
  
  if (error) {
    console.error('Error fetching popular candles: ', error)
    throw error
  }

  return data || []
}

// Get total candles count
export async function getTotalCandlesCount(): Promise<number> {
  const { count, error } = await supabase
    .from('candles')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('Error fetching candles count: ', error)
    throw error
  }

  return count || 0
}
