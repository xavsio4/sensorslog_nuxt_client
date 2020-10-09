export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  /*server: {
    port: process.env.PORT,
    host: process.env.HOST,
    serverUrl: process.env.API_URL
  },*/


  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'sensorslog - log your iot\'s measurements',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Free Web App/API to record your iot\'s measurements' }
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
    // '@nuxt/content',
    //
    '@nuxtjs/auth',
    //
    '@nuxtjs/fontawesome',
    '@nuxtjs/pwa',
    '@nuxtjs/color-mode',
    'nuxt-cookie-control'
  ],

  bootstrapVue: {
    icons: true // Install the IconsPlugin (in addition to BootStrapVue plugin
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



  // Content module configuration (https://go.nuxtjs.dev/content-config)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
