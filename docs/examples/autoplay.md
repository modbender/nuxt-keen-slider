---
title: Autoplay
description: Advance slides automatically with a Keen Slider plugin that starts on creation, pauses while dragging, and cleans up on destroy.
sidebar:
  order: 3
---

Keen Slider has no built-in autoplay option — instead, autoplay is added with a **plugin**, passed as the second argument to `useKeenSlider()`. A plugin is just a function that receives the slider instance and hooks into its lifecycle events. This pattern keeps the core lightweight and the behavior fully under your control.

## Full component

```vue
<!-- components/AutoplaySlider.vue -->
<template>
  <div ref="container" class="keen-slider">
    <div
      v-for="slide in slides"
      :key="slide"
      class="keen-slider__slide slide"
    >
      {{ slide }}
    </div>
  </div>
</template>

<script setup>
const slides = [1, 2, 3, 4, 5]

// A plugin: advance every 2.5s, pause while the user is dragging,
// and clear the timer when the slider is torn down.
function autoplay(slider) {
  let timer

  function clear() {
    clearTimeout(timer)
  }

  function next() {
    clear()
    timer = setTimeout(() => {
      slider.next()
    }, 2500)
  }

  slider.on('created', () => {
    slider.container.addEventListener('mouseover', clear)
    slider.container.addEventListener('mouseout', next)
    next()
  })
  slider.on('dragStarted', clear)
  slider.on('animationEnded', next)
  slider.on('updated', next)
  slider.on('destroyed', clear)
}

const [container] = useKeenSlider(
  {
    loop: true,
    slides: { perView: 1 },
  },
  [autoplay],
)
</script>

<style scoped>
.slide {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 240px;
  font-size: 48px;
  color: #fff;
  background: #3f61ff;
}
</style>
```

## How the plugin works

- **`useKeenSlider(options, plugins)`** — the second argument is an array of plugin functions. Each receives the slider instance.
- **`created`** — fires once when the slider is ready. We start the timer and wire up hover handlers that pause autoplay while the pointer is over the slider.
- **`dragStarted`** — the user is interacting, so we stop the timer.
- **`animationEnded` / `updated`** — re-arm the timer after each transition (and after responsive re-layouts) so it keeps cycling.
- **`destroyed`** — clear the timer so it doesn't fire after the component unmounts.

:::caution
Always clear your interval/timeout on the `destroyed` event. Without it, the timer keeps firing against a torn-down slider after the component unmounts, which leaks memory and can throw. The `destroyed` hook above handles this.
:::

## A reusable autoplay plugin

To use the same autoplay across several sliders, extract it into a composable or utility and pass it wherever you need it:

```ts
// composables/useAutoplay.ts
export function autoplayPlugin(interval = 2500) {
  return (slider: any) => {
    let timer: ReturnType<typeof setTimeout>
    const clear = () => clearTimeout(timer)
    const next = () => {
      clear()
      timer = setTimeout(() => slider.next(), interval)
    }
    slider.on('created', next)
    slider.on('dragStarted', clear)
    slider.on('animationEnded', next)
    slider.on('destroyed', clear)
  }
}
```

```vue
<script setup>
import { autoplayPlugin } from '~/composables/useAutoplay'

const [container] = useKeenSlider({ loop: true }, [autoplayPlugin(4000)])
</script>
```

:::tip
Set `loop: true` for a seamless autoplay loop — otherwise the slider stops at the last slide. To pause on hover, add `mouseover`/`mouseout` listeners on `slider.container` inside the `created` hook, as shown in the full component above.
:::

## Next steps

- [Navigation and Dots](/nuxt-keen-slider/examples/navigation-and-dots/) — combine autoplay with manual controls.
- [Configuration](/nuxt-keen-slider/configuration/) — `loop`, `mode`, and responsive `breakpoints`.
