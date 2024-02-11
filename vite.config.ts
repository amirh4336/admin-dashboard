import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// @ts-expect-error path has no type in ts
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // @ts-expect-error cant know it is a key name
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },
  plugins: [react()],
})
