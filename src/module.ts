import { defineNuxtModule, addImports } from "@nuxt/kit";

import type { ModuleOptions } from "./types";

import { name, version } from "../package.json";

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "keenSlider",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, nuxt) {
    addImports({
      name: "useKeenSlider",
      from: "keen-slider/vue.es",
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
