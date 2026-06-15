---
title: Installation
description: Install Nuxt Keen Slider, register it in nuxt.config, and build your first slider with the auto-imported useKeenSlider composable.
sidebar:
  order: 2
---

Getting Nuxt Keen Slider running takes two steps: add the module, then build a slider with the auto-imported `useKeenSlider()` composable. There's no component to mount and no stylesheet to import — the module handles both.

## 1. Add the module

The quickest way is the Nuxt CLI, which installs the package and adds it to your `nuxt.config` for you:

```bash
npx nuxi@latest module add nuxt-keen-slider
```

### Manual install

If you'd rather install it by hand, add the package with your preferred package manager:

```bash
# pnpm
pnpm add nuxt-keen-slider
```

```bash
# npm
npm install nuxt-keen-slider
```

```bash
# yarn
yarn add nuxt-keen-slider
```

Then add `'nuxt-keen-slider'` to the `modules` array in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-keen-slider'],
})
```

## 2. Build a slider

The module auto-imports the `useKeenSlider()` composable, so you can use it in any component without an import line. It returns a tuple: a template ref for the container, and a ref to the slider instance.

Create a component anywhere in your app — for example `components/MySlider.vue`:

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

Two pieces of markup are required:

- The **container** element must carry the `keen-slider` class and the `ref` returned by the composable.
- Each **slide** must be a direct child carrying the `keen-slider__slide` class.

Then drop the component into a page:

```vue
<template>
  <MySlider />
</template>
```

That's it — you now have a working, touch-enabled carousel.

## No CSS import needed

You don't have to import any stylesheet. The module adds `keen-slider/keen-slider.css` to `nuxt.options.css` for you, so the slider is styled correctly out of the box. It also adds `keen-slider` to `build.transpile` so the package works under Nuxt's server-side rendering.

:::tip
For the best Lighthouse / PageSpeed score and the lowest layout shift, wrap your slider in Nuxt's built-in `<ClientOnly>` component. This keeps the slider out of the server-rendered HTML, avoiding a flash before hydration. It won't suit every use case, so test it for yours.

```vue
<template>
  <ClientOnly>
    <MySlider />
  </ClientOnly>
</template>
```

Note: this trick relies on `<ClientOnly>`, not on naming the file `.client.vue` — the `.client` extension behaves differently and tends not to give the same result.
:::

## Next steps

- [Usage](/nuxt-keen-slider/usage/) — the slider instance, navigation, dots, and events.
- [Configuration](/nuxt-keen-slider/configuration/) — every option you can pass to `useKeenSlider()`.
