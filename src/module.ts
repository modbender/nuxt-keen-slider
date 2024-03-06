import { defineNuxtModule, addImports, createResolver } from "@nuxt/kit";

import { name, version } from "../package.json";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "keenSlider",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options, nuxt) {
    addImports({
      name: "useKeenSlider",
      from: "keen-slider/vue",
    });

    nuxt.options.css = [
      ...(nuxt.options.css || []),
      "keen-slider/keen-slider.css",
    ];

    nuxt.options.build.transpile = [
      ...(nuxt.options.build?.transpile || []),
      "keen-slider",
    ];
  },
});
