import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'netlify-dev-spa-fallback',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url === '/index.html' || req.url?.startsWith('/index.html?')) {
            req.url = '/'
          }
          next()
        })
      },
    },
  ],
  appType: 'spa',
  server: {
    strictPort: true,
    hmr: {
      clientPort: 8888,
    },
  },
  build: {
    cssCodeSplit: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
