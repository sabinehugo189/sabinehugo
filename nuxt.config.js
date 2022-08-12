import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
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
        {
          id: 'Cookiebot',
          src: 'https://consent.cookiebot.com/uc.js',
          'data-cbid': 'a19ea317-f1ca-447c-889e-9d8b4465037a',
          'data-blockingmode': 'auto',
        },
      ],
      htmlAttrs: {
        lang: 'de',
      },
    },
  },
  content: { navigation: { fields: ['label'] } },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/content', '@vueuse/nuxt'],
  typescript: {
    shim: false,
  },
  hooks: {
    'vite:extendConfig'(config, { isServer }) {
      if (isServer) {
        // Workaround for netlify issue
        // https://github.com/nuxt/framework/issues/6204
        config.build.rollupOptions.output.inlineDynamicImports = true;
      }
    },
  },
});
