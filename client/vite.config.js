import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5001,
    proxy: {
      "/api": {
        // target: "https://real-time-chat-o5jx.onrender.com",
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: true,
      },
    }
  },
  plugins: [react()],
})
