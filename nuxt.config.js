export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'server',
  /*server: {
    port: process.env.PORT,
    host: process.env.HOST,
    serverUrl: process.env.API_URL
  },*/

  ssr: false, //for spa mode


  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'sensorslog - log your iot\'s measurements. A Free iot backend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Free Web App/API to record your iot\'s measurements. A Free iot backend' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/scss/main.scss',
    '@/assets/scss/custom.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/vue-pwd-meter.js', mode: 'client' },
     {src: '~/plugins/filters.js', mode: 'client'},
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    //
    '@nuxtjs/auth',
    //
    '@nuxtjs/fontawesome',
    '@nuxtjs/color-mode',
    'nuxt-cookie-control',
    '@nuxtjs/moment',
    '@nuxtjs/toast',
    '@nuxtjs/recaptcha'
  ],

  bootstrapVue: {
    icons: true // Install the IconsPlugin (in addition to BootStrapVue plugin
  },

  toast: {
    position: 'bottom-right',
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL,
    redirectError: {
      401: '/login',
      404: '/notfound'
    }
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      //callback: '/login',
      home: '/dashboard'
    },
    /*watchLoggedIn: true,
    rewriteRedirects: false,
    resetOnError: true,*/
    strategies: {
      local: {
        url: process.env.API_URL,
        client_id: process.env.APP_CLIENT_ID,
        client_secret: process.env.APP_CLIENT_SECRET,
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'access_token' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get', propertyName: false }
        },
        token_key: 'access_token',
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    },
    localStorage: true
  },

  /*router: {
    middleware: ['auth']
  },*/

   /**
   * Loading Setup
   */
  loading: {
    name: 'chasing-dots',
    color: '#ff5638',
    background: 'white',
    height: '4px'
  },// /loading
  /**
   * Page Transition
   */
  pageTransition: {
    name: 'page',
    mode: 'out-in',
    beforeEnter (el) {
      console.log('Before enter...');
    }
  },

  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  },

  // Content module configuration (https://go.nuxtjs.dev/content-config)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  recaptcha: {
    hideBadge: false, // Hide badge element (v3 & v2 via size=invisible)
    language: 'en',   // Recaptcha language (v2)
    siteKey: process.env.RECAPTCHA_KEY,    // Site key for requests
    version: 3,     // Version
    size: 'compact'        // Size: 'compact', 'normal', 'invisible' (v2)
  },
  publicRuntimeConfig: {
    recaptcha: {
      /* reCAPTCHA options */
      siteKey: process.env.RECAPTCHA_KEY // for example
    }
  }
}
