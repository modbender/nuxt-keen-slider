---
title: Basic
description: A minimal end-to-end slider — register the module and build a looping, multi-slide carousel with the auto-imported composable.
sidebar:
  order: 1
---

The smallest complete setup: register the module, then build a slider with `useKeenSlider()`. No component to mount, no stylesheet to import.

## 1. Register the module

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-keen-slider'],
})
```

## 2. Build the slider

```vue
<!-- components/NumberSlider.vue -->
<template>
  <div ref="container" class="keen-slider">
    <div class="keen-slider__slide number-slide">1</div>
    <div class="keen-slider__slide number-slide">2</div>
    <div class="keen-slider__slide number-slide">3</div>
    <div class="keen-slider__slide number-slide">4</div>
    <div class="keen-slider__slide number-slide">5</div>
    <div class="keen-slider__slide number-slide">6</div>
  </div>
</template>

<script setup>
const [container] = useKeenSlider({
  loop: true,
  mode: 'free',
  slides: {
    perView: 3,
    spacing: 15,
  },
})
</script>

<style scoped>
.number-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  font-size: 50px;
  font-weight: 500;
  color: #fff;
  background: #3f61ff;
}
</style>
```

## 3. Use it on a page

```vue
<!-- app.vue -->
<template>
  <NumberSlider />
</template>
```

You now have a touch-enabled carousel showing three slides at a time, looping infinitely, with free-glide dragging.

:::tip
`useKeenSlider()` is auto-imported — you never write an import for it. The module also injects the stylesheet, so the slides are laid out correctly with no CSS import on your side.
:::

## Rendering slides with `v-for`

Real apps usually render slides from data. Put the `v-for` directly on the `.keen-slider__slide` element so the slides stay direct children of the container:

```vue
<template>
  <div ref="container" class="keen-slider">
    <div
      v-for="image in images"
      :key="image.id"
      class="keen-slider__slide"
    >
      <img :src="image.src" :alt="image.alt">
    </div>
  </div>
</template>

<script setup>
const images = [
  { id: 1, src: '/img/1.jpg', alt: 'First' },
  { id: 2, src: '/img/2.jpg', alt: 'Second' },
  { id: 3, src: '/img/3.jpg', alt: 'Third' },
]

const [container] = useKeenSlider({
  loop: true,
  slides: { perView: 1 },
})
</script>
```

## Next steps

- [Navigation and Dots](/nuxt-keen-slider/examples/navigation-and-dots/) — prev/next buttons and a clickable dot indicator.
- [Autoplay](/nuxt-keen-slider/examples/autoplay/) — advance slides automatically with a plugin.
