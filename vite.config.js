import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { config } from 'dotenv'

// const env = config().parsed

export default defineConfig(() => {
  return {
    plugins: [react()],
    // define: {
    //   API_ID: env.API_ID,
    //   API_KEY: env.API_KEY
    // }
  }
})
