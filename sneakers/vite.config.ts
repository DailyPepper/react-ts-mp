import { defineConfig } from 'vitest/config';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
      plugins: [
            react(),
            VitePWA({
               registerType: "prompt",
               includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
               manifest: {
                  name: "websitename",
                  short_name: "websitename",
                  description: "Website description(Could be same with index.html file)",
                  theme_color: "#ffffff",
                  start_url: "/",
                  icons: [
                     {
                        src: "logo.png",
                        sizes: "192x192",
                        type: "image/png",
                     },
                     {
                        src: "logo.png",
                        sizes: "512x512",
                        type: "image/png",
                     },
                     {
                        src: "logo.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable",
                     },
                  ],
               },
            }),
         ],
      test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: '',
            css: true,
      },
      server: { hmr: {overlay: false} },
});