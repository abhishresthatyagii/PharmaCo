import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,           // default dev server port
    open: true,           // auto-open browser
    strictPort: true,     // fail if port is already in use
  },
  resolve: {
    alias: {
      '@': '/src',        // allows imports like "@/components/Button"
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',   // ensure modern JS support in deps
    },
  },
  build: {
    target: 'esnext',     // output modern JS
    outDir: 'dist',       // build output folder
    sourcemap: true,      // helpful for debugging
  },
})
