import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/chaski-trip/',
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && (/marker-icon|marker-shadow|layers-2x|layers/).test(assetInfo.name)) {
            return 'leaflet/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  }
})
