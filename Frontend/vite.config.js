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
      // Dev-only workaround: the backend doesn't send
      // Access-Control-Allow-Origin, so browser requests to it are
      // blocked by CORS. Routing /api/* through the Vite dev server
      // makes the request same-origin from the browser's perspective —
      // Vite then forwards it server-to-server, which isn't subject to
      // CORS. Doesn't apply to `vite preview` or the production build;
      // that still needs the backend to send the header.
      '/api': {
        target: 'https://latitude-apron-winter.ngrok-free.dev',
        changeOrigin: true,
      },
    },
  },
})
