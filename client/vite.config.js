import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: "https://real-time-chat-sujit-patel.vercel.app",
    proxy: {
      "/api": {
        target: "https://real-time-chat-o5jx.onrender.com",
        // target: "http://localhost:4000",
        changeOrigin: true,
        secure: true,
      },
    }
  },
  plugins: [react()],
})
