
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: './', // Configure Vite to use relative paths
  server: {
    host: "::",
    port: 8080,
    // Support pour HTTPS en développement
    https: mode === 'development' ? {
      // Ces options ne sont utilisées qu'en développement
      // En production, vous utiliserez les certificats Let's Encrypt
    } : false,
    // Configurer les en-têtes MIME correctement
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/javascript; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
    // Activer CORS
    cors: true,
  },
  build: {
    // Assurer que le manifest est généré pour le déploiement
    manifest: true,
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
        },
        format: 'es', // Format ES modules explicite
      },
    },
  },
  define: {
    // Add this section to provide process.env to the client-side code
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      // Add any other environment variables your app needs
    },
    // Polyfill for 'process' used by pg
    'process': {
      env: {},
      // Add other process properties if needed
      nextTick: (callback: () => void) => setTimeout(callback, 0),
    },
  },
}))
