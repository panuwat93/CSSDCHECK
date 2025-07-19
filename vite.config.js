import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'OK Check อุปกรณ์เวรตู้',
        short_name: 'OK Check',
        description: 'แอปตรวจเช็คอุปกรณ์เวรตู้และบันทึกลง Google Sheet',
        theme_color: '#1565c0',
        background_color: '#f5f7fa',
        display: 'standalone',
        start_url: '.',
        icons: [
          {
            src: '/vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
        ],
      },
    }),
  ],
})
