import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/certificate-printer-frontend/'
})

//https://calimits.github.io/certificate-printer-frontend/
