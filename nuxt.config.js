export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT
  },
  head: {
    title: 'Tradies For Fire Affected Communities',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        hid: `og:title`,
        property: 'og:title',
        content: 'Tradies For Fire Affected Communities'
      },
      {
        hid: `og:url`,
        property: 'og:url',
        content: 'https://tradiesforfireaffectedcommunities.com'
      },
      {
        hid: `og:type`,
        property: 'og:type',
        content: 'website'
      },
      {
        hid: `og:image`,
        property: 'og:image',
        content:
          'https://tradiesforfireaffectedcommunities.com/TFFAC_Red_Updated-01.png'
      },
      {
        hid: `fb:app_id`,
        property: 'fb:app_id',
        content: '2676850799027408'
      },
      {
        hid: `og:description`,
        property: 'og:description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/leaflet/1/leaflet.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/vendor.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', 'nuxt-leaflet'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: ['lodash-es'],
    extractCss: true,
    extend(config, ctx) {}
  }
}
