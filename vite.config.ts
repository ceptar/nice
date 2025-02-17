import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import { remixPWA } from '@remix-pwa/dev';
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path';

installGlobals();

export default defineConfig({
         ssr: {
         noExternal: ['@apollo/client'],
     },
  server: {
    port: 3000,
    allowedHosts: ['discobabes.store', 'discobabes.club']
  },
  plugins: [
    remix({
      ignoredRouteFiles: ['**/*.module.scss'],
    }),
    tsconfigPaths(),
    remixPWA(),
  ],
  resolve: {
    alias: {
      '~/*': path.resolve(__dirname, './app/*'),
      '~/src/*': path.resolve(__dirname, './src/*'),
      '@/*': path.resolve(__dirname, './app/*'),
    },
  },
});






// /* eslint-disable import/no-extraneous-dependencies */
// import { vitePlugin as remix } from '@remix-run/dev';
// import { defineConfig } from 'vite';
// import tsconfigPaths from 'vite-tsconfig-paths';
// import { netlifyPlugin } from '@netlify/remix-adapter/plugin';

// export default defineConfig({
//     ssr: {
//         noExternal: ['@apollo/client'],
//     },
//     plugins: [
//         remix({
//             future: {
//                 v3_fetcherPersist: true,
//                 v3_lazyRouteDiscovery: true,
//                 v3_relativeSplatPath: true,
//                 v3_singleFetch: true,
//                 v3_throwAbortReason: true,
//             },
//             ignoredRouteFiles: ['**/*.module.scss'],
//         }),
//         netlifyPlugin(),
//         tsconfigPaths(),
//     ],
//     resolve: {
//         alias: { '~': __dirname },
//     },
//     server: {
//         allowedHosts: ['discobabes.store', 'localhost', '8m858c-5173.csb.app', 'rzkr4l-5173.csb.app', 'discobabes.club', '212.132.115.241'],
//         port: 3000,
//     },
//     optimizeDeps: {
//         include: ['@radix-ui/react-select', '@radix-ui/react-slider'],
//     },
//     css: { preprocessorOptions: { scss: { api: 'modern' } } },
//     build: {
//         rollupOptions: {
//             output: {
//                 manualChunks(id) {
//                     if (id.endsWith('.css') || id.endsWith('.scss')) {
//                         return 'styles';
//                     }
//                 },
//             },
//         },
//     },
// });
