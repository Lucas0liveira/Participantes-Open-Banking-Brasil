import { fileURLToPath, URL } from 'node:url'
import { createVuePlugin } from 'vite-plugin-vue2'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [createVuePlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
  },
})
