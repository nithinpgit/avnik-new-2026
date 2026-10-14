import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

const normalizeBasePath = value => {
  const raw = value || '/admin'
  const withLeadingSlash = raw.startsWith('/') ? raw : `/${raw}`

  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_DEV_PROXY_TARGET || 'http://admin-backend:8081'
  const base = normalizeBasePath(env.VITE_APP_BASE_PATH)

  return {
    base,
    plugins: [react({ include: '**/*.{jsx,js}' })],
    esbuild: {
      jsx: 'automatic',
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: []
    },
    define: {
      'process.env': {}
    },
    resolve: {
      dedupe: ['react', 'react-dom', 'styled-components'],
      alias: {
        '@src': path.resolve(__dirname, 'src'),
        '@styles': path.resolve(__dirname, 'src/@core/scss'),
        '@components': path.resolve(__dirname, 'src/@core/components'),
        '@layouts': path.resolve(__dirname, 'src/@core/layouts'),
        '@store': path.resolve(__dirname, 'src/redux'),
        '@configs': path.resolve(__dirname, 'src/configs'),
        '@hooks': path.resolve(__dirname, 'src/utility/hooks'),
        '@utils': path.resolve(__dirname, 'src/utility/Utils.js'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        stream: 'stream-browserify',
        crypto: 'crypto-browserify',
        buffer: 'buffer',
        process: 'process/browser'
      }
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'styled-components',
        'react-data-table-component'
      ],
      esbuildOptions: {
        jsx: 'automatic',
        loader: {
          '.js': 'jsx'
        },
        define: {
          global: 'globalThis'
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: true
          })
        ]
      }
    },
    build: {
      rollupOptions: {
        plugins: [rollupNodePolyFill()]
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions'],
          includePaths: [
            'node_modules',
            'src/assets',
            'src/@core/scss/base',
            'src/@core/scss/base/bootstrap-extended'
          ]
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      watch: {
        usePolling: env.CHOKIDAR_USEPOLLING === 'true'
      },
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true
        },
        '/images': {
          target: proxyTarget,
          changeOrigin: true
        },
        '/socket.io': {
          target: proxyTarget,
          changeOrigin: true,
          ws: true
        }
      }
    }
  }
})
