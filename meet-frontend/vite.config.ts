import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const rootDir = dirname(fileURLToPath(import.meta.url))

/** pdf.js loads the worker as type:module; some hosts serve .mjs with wrong MIME type. */
function copyPdfWorkerAsJs() {
  const src = resolve(rootDir, 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs')
  const dest = resolve(rootDir, 'public/pdf.worker.min.js')
  mkdirSync(dirname(dest), { recursive: true })
  copyFileSync(src, dest)
}

const devProxyTarget =
  process.env.VITE_DEV_PROXY_TARGET?.trim() ||
  process.env.DOCKER_API_PROXY?.trim() ||
  'http://meet-backend:3000'

const mediaserverProxyTarget =
  process.env.VITE_MEDIA_PROXY_TARGET?.trim() ||
  'http://host.docker.internal:3001'

const usePolling =
  process.env.CHOKIDAR_USEPOLLING === '1' || process.env.CHOKIDAR_USEPOLLING === 'true'

// https://vite.dev/config/
export default defineConfig({
  base: '/join/',
  plugins: [
    react(),
    {
      name: 'copy-pdf-worker',
      buildStart() {
        copyPdfWorkerAsJs()
      },
    },
  ],
  server: {
    host: process.env.VITE_BIND_ALL === '1' ? '0.0.0.0' : true,
    port: 5173,
    strictPort: true,
    // Headless recorder (meet-recorder) loads the app via http://meet-frontend:5173/join/record
    allowedHosts: true,
    watch: usePolling ? { usePolling: true, interval: 800 } : undefined,
    proxy: {
      '/socket.io': {
        target: devProxyTarget,
        changeOrigin: true,
        ws: true,
      },
      '/meet/api': {
        target: devProxyTarget,
        changeOrigin: true,
      },
      '/uploads': {
        target: process.env.VITE_STATIC_PROXY_TARGET?.trim() || 'http://proxy:7000',
        changeOrigin: true,
      },
      // Media served by edge nginx from shared volumes (not Nest streaming)
      '/static': {
        target: process.env.VITE_STATIC_PROXY_TARGET?.trim() || 'http://proxy:7000',
        changeOrigin: true,
      },
      '/mediasoup-socket.io': {
        target: mediaserverProxyTarget,
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
