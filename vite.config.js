import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: 'demo',
  build: {
    outDir: 'demo_dist',
  },
  resolve: {
    alias: {
      '/@/': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ['focus-trap'],
  },
  plugins: [vue()],
})
