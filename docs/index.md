---
title: Nuxt Keen Slider
description: A Nuxt module that drops the lightweight, dependency-free Keen Slider carousel into your Nuxt 3 or Nuxt 4 app, with the composable, styles, and transpilation wired up for you.
sidebar:
  order: 1
---

Adding a carousel to a Nuxt app usually means installing a library, importing a composable, remembering to load its stylesheet, and adding it to your build's transpile list so SSR doesn't choke on it. Nuxt Keen Slider does all of that for you.

It's a thin, well-behaved wrapper around the excellent [Keen Slider](https://keen-slider.io/) library — a lightweight, dependency-free carousel with native touch support. Install the module, and the `useKeenSlider()` composable is auto-imported, the CSS is injected, and the package is transpiled for Nuxt's server-side rendering automatically. No plugin wiring, no manual stylesheet import.

## Key features

- **Great performance** — Keen Slider is built for the best Lighthouse score and the lowest Cumulative Layout Shift.
- **Lightweight** — no dependencies and fast loading.
- **Mobile first** — multi-touch support and fully responsive out of the box.
- **Compatible** — works in all common browsers and React Native.
- **Extensible** — a rich but simple API, with a plugin system for things like autoplay.
- **Zero setup in Nuxt** — `useKeenSlider()` is auto-imported, the stylesheet is injected, and the package is transpiled for SSR for you.
- **Nuxt 3 + Nuxt 4** — a single install supports both major versions.

## A 30-second taste

Install the module:

```bash
npx nuxi@latest module add nuxt-keen-slider
```

Then build a slider anywhere — `useKeenSlider()` is auto-imported, so there's no import line:

```vue
<template>
  <div ref="container" class="keen-slider">
    <div class="keen-slider__slide">1</div>
    <div class="keen-slider__slide">2</div>
    <div class="keen-slider__slide">3</div>
  </div>
</template>

<script setup>
const [container] = useKeenSlider({
  loop: true,
  slides: {
    perView: 2,
    spacing: 15,
  },
})
</script>
```

The `container` ref is attached to the wrapping `.keen-slider` element; each direct child carrying the `.keen-slider__slide` class becomes a slide. That's the whole contract.

## How configuration works

Unlike most Nuxt modules, **Keen Slider has no `nuxt.config` options to set**. Every slider is configured at the call site by the options you pass to `useKeenSlider()` — `loop`, `mode`, `slides`, `vertical`, and the rest. This means each slider on a page can be configured independently. See [Configuration](/nuxt-keen-slider/configuration/) for the full option reference.

## Compatibility

| | Supported |
| --- | --- |
| Nuxt Keen Slider | 1.x |
| Nuxt | 3.x and 4.x |
| Keen Slider | 6.x |
| Vue | 3 |

:::tip
Nuxt Keen Slider 1.x supports both Nuxt 3 and Nuxt 4 from the same package — there's nothing extra to configure when you upgrade Nuxt.
:::

## Where to next

- [Installation](/nuxt-keen-slider/installation/) — install the module and write your first slider.
- [Usage](/nuxt-keen-slider/usage/) — the `useKeenSlider()` composable, the slider instance, navigation, and events.
- [Configuration](/nuxt-keen-slider/configuration/) — every option you can pass to `useKeenSlider()`.
