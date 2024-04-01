import { defineConfig } from 'vitest/config';
// import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
      plugins: [
        react(), 
//         VitePWA({
//             registerType: 'prompt',
//             includeAssets: ['favicon.ico', 'logo.png', 'logo.svg'],
//             manifest: {
//                 name: 'React-vite-app',
//                 short_name: 'react-vite-app',
//                 description: 'I am a simple vite app',
//                 icons: [
//                         {
//                             src: '/logo.png',
//                             sizes: '192x192',
//                             type: 'image/png',
//                             purpose: 'favicon',
//                         },
//                         {
//                             src: '/logo.png',
//                             sizes: '512x512',
//                             type: 'image/png',
//                             purpose: 'favicon',
//                         },
//                         {
//                             src: '/logo.png',
//                             sizes: '180x180',
//                             type: 'image/png',
//                             purpose: 'apple touch icon',
//                         },
//                         {
//                             src: '/logo.png',
//                             sizes: '512x512',
//                             type: 'image/png',
//                             purpose: 'any maskable',
//                         },
//                 ],
//                 theme_color: '#181818',
//                 background_color: '#e0cc3b',
//                 display: 'standalone',
//                 scope: '/',
//                 start_url: '/',
//                 orientation: 'portrait',
//             },
//   }),
     ],
      test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: '',
            css: true,
      },
      server: { hmr: {overlay: false} },
});