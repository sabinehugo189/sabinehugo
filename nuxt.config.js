import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/content', '@vueuse/nuxt'],
  typescript: {
    shim: false,
  },
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'ie=edge',
        },
      ],
      link: {
        rel: 'icon',
        href: 'favicon.svg',
      },
      script: [
        {
          children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${process.env.GOOGLE_TM_ID}');`,
        },
      ],
      htmlAttrs: {
        lang: 'de',
      },
    },
  },
  content: { navigation: { fields: ['label'] } },
});
