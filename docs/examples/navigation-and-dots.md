---
title: Navigation and Dots
description: Add prev/next buttons and a clickable dot indicator that tracks the active slide using the slider instance and the slideChanged event.
sidebar:
  order: 2
---

A complete slider with arrow buttons and a row of dots that highlight the active slide and jump to it on click. This builds on the slider instance (`slider`) returned by `useKeenSlider()` and its `slideChanged` event.

## Full component

```vue
<!-- components/GallerySlider.vue -->
<template>
  <div class="gallery">
    <div ref="container" class="keen-slider">
      <div
        v-for="slide in slides"
        :key="slide"
        class="keen-slider__slide slide"
      >
        {{ slide }}
      </div>
    </div>

    <div class="controls">
      <button :disabled="!slider" @click="slider?.prev()">←</button>

      <div class="dots">
        <button
          v-for="(_, idx) in slides"
          :key="idx"
          class="dot"
          :class="{ active: current === idx }"
          :aria-label="`Go to slide ${idx + 1}`"
          @click="slider?.moveToIdx(idx)"
        />
      </div>

      <button :disabled="!slider" @click="slider?.next()">→</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const slides = [1, 2, 3, 4, 5]
const current = ref(0)

const [container, slider] = useKeenSlider({
  loop: true,
  slides: { perView: 1 },
})

watch(slider, (instance) => {
  if (!instance) return
  instance.on('slideChanged', (s) => {
    current.value = s.track.details?.rel ?? 0
  })
}, { immediate: true })
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

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 10px;
  height: 10px;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}

.dot.active {
  background: #3f61ff;
  border-color: #3f61ff;
}
</style>
```

## How it works

- **`slider?.prev()` / `slider?.next()`** drive the carousel. The `slider` ref is `null` until the slider mounts on the client, so the buttons are guarded with optional chaining and `:disabled="!slider"`.
- **`slider?.moveToIdx(idx)`** jumps to a specific slide when a dot is clicked.
- **The `slideChanged` event** keeps `current` in sync no matter how the slide changed — button, dot, or swipe. We read `track.details.rel`, the index relative to the visible window, which is what you want for "which dot is active."
- **`watch(slider, ...)`** with `{ immediate: true }` attaches the event listener the moment the instance exists.

:::caution
Subscribe to events inside `watch(slider, ...)`, not at the top of `<script setup>`. The slider instance is `null` during SSR and the first render — calling `slider.on(...)` directly would throw.
:::

:::tip
Use `track.details.rel` for the active-dot index (it resets per loop) and `track.details.abs` when you need the absolute position across loops.
:::

## Next steps

- [Autoplay](/nuxt-keen-slider/examples/autoplay/) — advance slides automatically and pause on interaction.
- [Configuration](/nuxt-keen-slider/configuration/) — `loop`, `mode`, `slides`, and responsive breakpoints.
