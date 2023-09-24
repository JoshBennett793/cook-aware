import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  define: {
    'process.env.API_ID': import.meta.env.API_ID,
    'process.env.API_KEY': import.meta.env.API_KEY
  }
})
