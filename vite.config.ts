
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
  base: './', // Configurer Vite pour utiliser des chemins relatifs
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
  optimizeDeps: {
    // Exclure complètement les modules natifs pour éviter les erreurs de compilation
    exclude: ['better-sqlite3', 'pg', 'mysql', 'mysql2', 'sqlite3', 'node-gyp']
  },
  define: {
    // Ajouter cette section pour fournir process.env au code côté client
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    },
    // Polyfill pour 'process' utilisé par certains packages
    'process': {
      env: {},
      nextTick: (callback: () => void) => setTimeout(callback, 0),
    },
    // Ajouter des polyfills vides pour éviter les erreurs
    'global': {},
    'fs': {},
    'path': {},
    'os': {},
  },
}))
