export interface ModuleOptions {}

declare module "nuxt-keen-slider" {
  interface NuxtConfig {
    splide?: ModuleOptions;
  }

  interface NuxtOptions {
    splide?: ModuleOptions;
  }
}
