export type ModuleOptions = object

declare module 'nuxt-keen-slider' {
  interface NuxtConfig {
    splide?: ModuleOptions
  }

  interface NuxtOptions {
    splide?: ModuleOptions
  }
}
