import { defineConfig } from 'vite'
import { config } from 'dotenv'
import react from '@vitejs/plugin-react'

const env = config().parsed

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  define: {
    'process.env.API_ID': JSON.stringify(env.API_ID),
    'process.env.API_KEY': JSON.stringify(env.API_KEY)
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/stylesheets/index.scss";'
      }
    }
  }
})
