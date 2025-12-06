import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'LiNYA - Linis na Yaman ng Bayan',
        short_name: 'LiNYA',
        description: 'Creating mutual accountability in Philippine society',
        theme_color: '#1B4D3E',
        background_color: '#FDF8F3',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: '/icons/icon.svg', sizes: 'any', type: 'image/svg+xml' }
        ]
      },
      workbox: { globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'] }
    })
  ],
  server: { port: 3000, host: true },
  build: { outDir: 'dist', sourcemap: false, minify: 'terser' }
})