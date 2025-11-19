export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  },
  css: [
    "~/assets/styles/global.scss",
    "~/assets/styles/_variables.scss",
    "~/assets/styles/_fonts.scss",
    "~/assets/styles/_forms.scss",
    "~/assets/styles/_animation.scss",
  ],
  app: {
    layoutTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Book Drizzle",
      htmlAttrs: {
        lang: "ru",
      },
    },
  },
});
