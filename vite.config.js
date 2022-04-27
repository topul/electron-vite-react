import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.IS_DEV !== 'true' ? './' : '/',
  build: {
    outDir: 'app/build',
    emptyOutDir: true,
  }
})
