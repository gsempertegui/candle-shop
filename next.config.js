/** @type {import('next').NextConfig} */
const nextConfig = {
// Configuración de imágenes externas
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',  // Para datos de prueba
        port: '',
        pathname: '/**',         // Permite cualquier path
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co', // Supabase Storage
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // Imágenes de placeholder
        port: '',
        pathname: '/**',
      },
      // Agrega más dominios según necesites
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Unsplash (ejemplo)
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Opcional: Habilita App Router experimental (si no está por defecto)
  //experimental: {
  //  appDir: true,
  //},  
}

module.exports = nextConfig
