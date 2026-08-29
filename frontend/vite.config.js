import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/SIH-2026-P2/',
  plugins: [react()],
  server: {
    host: true, // Listen on all local IPs (fixes HMR on mobile devices)
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
