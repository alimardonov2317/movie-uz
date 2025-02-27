import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      devOptions: {
        enabled: false,
      },
      manifest: {
        name: "Movie uz",
        short_name: "Movies uz",
        description: "Movie uz",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/BILETICK.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/BILETICK_512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    })

  ],
})
