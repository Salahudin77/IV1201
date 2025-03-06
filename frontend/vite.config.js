import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // To use `test` and `expect` as global functions
    environment: 'jsdom', // This is important for React tests
  },
})
