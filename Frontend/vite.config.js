import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const rootDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@shared': resolve(rootDir, 'src/src/shared'),
      '@features': resolve(rootDir, 'src/src/features'),
    },
  },
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_DEV_API_URL || 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
