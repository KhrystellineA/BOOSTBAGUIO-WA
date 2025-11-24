module.exports = function (ctx) {
  return {
    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#property-sourcefiles
    sourceFiles: {
      rootComponent: 'src/App.vue',
      router: 'src/router/index',
      store: 'src/store/index',
      indexHtmlTemplate: 'src/index.template.html',
      ssrServerEntry: 'src-ssr/entry.js'
    },

    // https://v2.quasar.dev/quasar-cli-webpack/prefetch-feature
    // preFetch: true,

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#property-build
    build: {
      vueRouterMode: 'history', // available values: 'hash', 'history'

      // https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/configuring-ssr
      ssr: {
        pwa: false
      },

      // https://v2.quasar.dev/quasar-cli-webpack/developing-pwa/configuring-pwa
      pwa: {
        workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
        workboxOptions: {
          skipWaiting: true,
          clientsClaim: true,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg|gif|webp)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                }
              }
            },
            {
              urlPattern: /^https:\/\/.*\.(?:json)$/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 // 1 day
                }
              }
            }
          ]
        },

        // for the custom service-connection.js
        manifest: {
          name: 'Boost Baguio',
          short_name: 'BoostBaguio',
          description: 'A commuter-centric navigation and tourism platform for Baguio City',
          display: 'standalone',
          orientation: 'portrait',
          background_color: '#2E5D3E', // Forest green
          theme_color: '#2E5D3E', // Forest green
          icons: [
            {
              src: 'icons/icon-128x128.png',
              sizes: '128x128',
              type: 'image/png'
            },
            {
              src: 'icons/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'icons/icon-256x256.png',
              sizes: '256x256',
              type: 'image/png'
            },
            {
              src: 'icons/icon-384x384.png',
              sizes: '384x384',
              type: 'image/png'
            },
            {
              src: 'icons/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      },

      // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#property-build
      distDir: ctx.mode.spa ? 'dist/spa' : undefined,
      
      // extend webpack config here
      extendWebpack (cfg) {
        // cfg.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /node_modules/,
        //   options: {
        //     fix: true
        //   }
        // })
      }
    },

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#property-devserver
    devServer: {
      https: false,
      port: 8080,
      open: true // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#property-framework
    framework: {
      config: {},

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: [
        'Notify',
        'Loading',
        'Dialog',
        'AppFullscreen'
      ]
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
                      // (gets superseded if process.env.PORT is specified at runtime)

      maxAge: 1000 * 60 * 60 * 24 * 30, // 1 month

      // Fully control the client's store hydration/unhydration
      // store: {
      //   clone: false, // clone the store object or use reference (recommended if using纳秒级 immutable state)
      //   reducers: undefined // Optional; we can define which 'getters' functions of the store
      //                        // should be included in the hydration (state serialization)
      // }
    },

    boot: [
      'supabase',
      'axios',
      'workbox'
      // other boot files...
    ],
  }
}