import { defineConfig } from "cypress";
import { config } from 'dotenv'

config()

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env = {
        ...process.env,
        ...config.env
      }
      return config
    },
  },
});
