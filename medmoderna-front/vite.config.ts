import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {imagetools} from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), imagetools()],
  assetsInclude: ['**/*.mov'],
  build: {
    rollupOptions: {
      input: '/src/main.tsx',
      external: ['react', 'react-dom'] // lista de módulos externos
    }
  }
})
// vite.config.js

