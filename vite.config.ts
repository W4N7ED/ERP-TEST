
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { componentTagger } from "lovable-tagger"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: "::",
    port: 8080,
    // Configurer les en-têtes MIME correctement
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/javascript; charset=utf-8',
    },
    // Activer CORS
    cors: true,
  },
  build: {
    // Assurer que le manifest est généré pour le déploiement
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
        },
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
