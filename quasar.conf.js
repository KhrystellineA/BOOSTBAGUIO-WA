<<<<<<< HEAD
// Full config: https://quasar.dev/quasar-cli/quasar-conf-js
module.exports = function (ctx) {
  return {
    // ... other config
    
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: [
      'supabase',
      // other boot files...
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.scss'
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      config: {},

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-us',

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ['Notify']
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ts
    supportTS: false,

    // https://quasar.dev/quasar-cli/cli-documentation/prefetch-feature
    // preFetch: true,

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: true // opens browser window automatically
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history', // available values: 'hash', 'history'
      showProgress: true,
      gzip: false,
      analyze: false,
      preloadChunks: true,
      extractCSS: false,

      // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
      pwa: {
        workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
        workboxOptions: {
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\.boostbaguio\.ph\//,
=======
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
>>>>>>> 087f50da7c842a2106733d044b895b61efee36a6
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 50,
<<<<<<< HEAD
                  maxAgeSeconds: 24 * 60 * 60 // 1 day
                }
              }
            },
            {
              urlPattern: /^https:\/\/tiles\.boostbaguio\.ph\//,
              handler: 'CacheFirst',
              options: {
                cacheName: 'map-tiles',
                expiration: {
                  maxEntries: 1000,
                  maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
=======
                  maxAgeSeconds: 60 * 60 * 24 // 1 day
>>>>>>> 087f50da7c842a2106733d044b895b61efee36a6
                }
              }
            }
          ]
        },

<<<<<<< HEAD
        // for manifest.json
        manifest: {
          name: 'Boost Baguio',
          short_name: 'BoostBaguio',
          description: 'Your ultimate guide to navigating Baguio City',
          display: 'standalone',
          orientation: 'portrait',
          background_color: '#FFFFFF',
          theme_color: '#2E5D3E',
=======
        // for the custom service-connection.js
        manifest: {
          name: 'Boost Baguio',
          short_name: 'BoostBaguio',
          description: 'A commuter-centric navigation and tourism platform for Baguio City',
          display: 'standalone',
          orientation: 'portrait',
          background_color: '#2E5D3E', // Forest green
          theme_color: '#2E5D3E', // Forest green
>>>>>>> 087f50da7c842a2106733d044b895b61efee36a6
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
<<<<<<< HEAD
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
=======
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
>>>>>>> 087f50da7c842a2106733d044b895b61efee36a6
    devServer: {
      https: false,
      port: 8080,
      open: true // opens browser window automatically
    },

<<<<<<< HEAD
    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      // all boot files execute by default
      boot: [
        'supabase'
      ],

      // all CSS Stylus files in "quasar-variables" and "quasar-variables-extended"
      css: [
        'app.styl'
      ],

      // Quasar plugins
      plugins: ['Notify']
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: false,

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ts
    supportTS: false,

    // https://quasar.dev/quasar-cli/cli-documentation/prefetch-feature
    // preFetch: true
=======
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
>>>>>>> 087f50da7c842a2106733d044b895b61efee36a6
  }
}