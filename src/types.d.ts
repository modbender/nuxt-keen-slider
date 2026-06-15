export type ModuleOptions = object

declare module 'nuxt-keen-slider' {
  interface NuxtConfig {
    keenSlider?: ModuleOptions
  }

  interface NuxtOptions {
    keenSlider?: ModuleOptions
  }
}
