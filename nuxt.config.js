export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
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
        content: 'https://tradiesforfireaffectedcommunities.netlify.com/'
      },
      {
        hid: `og:image`,
        property: 'og:image',
        content: '/TFFAC_Red_Updated-01.png'
      },
      {
        hid: `og:description`,
        property: 'og:description',
        content: ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
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
  modules: [],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
