import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: './',
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          nested: resolve(__dirname,'es/index.html'),
        },
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
    },
    define: {
      BASEURL: JSON.stringify(env.BASEURL) || [],
    },
  }
})