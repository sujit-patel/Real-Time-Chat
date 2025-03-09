import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: "4000",
    proxy: {
      "/api": {
        target: "https://real-time-chat-9fh3.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    }
  },
  plugins: [react()],
})
