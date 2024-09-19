import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: 'BASEURL',
  // base: 'https://vote.gov/foo/',
  // Empty string or ./ (for embedded deployment)
  base: './',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  resolve: {
    alias: {
      Components: '/src/Components',
      Utils: '/src/Utils',
      Views: '/src/Views',
    }
  }
})