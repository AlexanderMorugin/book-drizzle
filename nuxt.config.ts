export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxt/fonts", "nuxt-toast"],
  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    regAwsAccessKeyId: process.env.REG_AWS_ACCESS_KEY_ID,
    regAwsSecretKey: process.env.REG_AWS_SECRET_KEY,
    regAwsBucketName: process.env.REG_AWS_BUCKET_NAME,
    regAwsRegion: process.env.REG_AWS_REGION,
    regAwsEndpoint: process.env.REG_AWS_API_ENDPOINT,
  },
  css: [
    "~/assets/styles/global.scss",
    "~/assets/styles/_variables.scss",
    "~/assets/styles/_fonts.scss",
    "~/assets/styles/_forms.scss",
    "~/assets/styles/_animation.scss",
  ],
  app: {
    // pageTransition: { name: "page", mode: "out-in" },
    // layoutTransition: { name: "layout", mode: "out-in" },
    head: {
      title: "Book Drizzle",
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, minimum-scale=1, user-scalable=no",
        },
        { name: "description", content: "My Drizzle Book" },
      ],
      htmlAttrs: {
        lang: "ru",
      },
    },
  },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
  // routeRules: {
  //   "/": { swr: true },
  // },
});
