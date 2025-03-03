
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
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
})
