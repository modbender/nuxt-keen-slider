---
title: Usage
description: Use the auto-imported useKeenSlider composable — the returned refs, the slider instance API, navigation, reactive options, and events.
sidebar:
  order: 3
---

Everything you do at runtime goes through the `useKeenSlider()` composable. It's auto-imported, so you can call it from any component without an import statement.

## The composable

`useKeenSlider(options, plugins?)` returns a tuple of two refs:

```vue
<script setup>
const [container, slider] = useKeenSlider({
  loop: true,
})
</script>
```

| Returned ref | Description |
| --- | --- |
| `container` | A template ref. Bind it to your wrapping `.keen-slider` element with `ref="container"`. |
| `slider` | A ref to the live slider instance, or `null` until the slider has mounted on the client. |

It takes two arguments:

| Argument | Type | Description |
| --- | --- | --- |
| `options` | object \| `Ref` | The slider configuration (see [Configuration](/nuxt-keen-slider/configuration/)). Pass a `ref`/`computed` to make options reactive. |
| `plugins` | array | **Optional.** An array of plugin functions for extending the slider — for example, autoplay. |

## The required markup

The composable doesn't render anything itself — you provide the markup and bind the container ref. The contract is two CSS classes:

```vue
<template>
  <div ref="container" class="keen-slider">
    <div class="keen-slider__slide">Slide 1</div>
    <div class="keen-slider__slide">Slide 2</div>
    <div class="keen-slider__slide">Slide 3</div>
  </div>
</template>
```

- The wrapper carries `keen-slider` and the `container` ref.
- Each direct child carrying `keen-slider__slide` becomes a slide.

:::caution
The slides must be **direct children** of the container element. Wrapping them in another element breaks the slider's measurement. If you render slides with `v-for`, put the `v-for` directly on the `.keen-slider__slide` element.
:::

## The slider instance

The second returned ref, `slider`, exposes the Keen Slider instance once it's mounted. It's `null` during SSR and the first render, so always guard access with optional chaining (`slider?.`) or a `v-if`.

Common members:

| Member | Description |
| --- | --- |
| `slider.next()` | Move to the next slide. |
| `slider.prev()` | Move to the previous slide. |
| `slider.moveToIdx(idx, absolute?, options?)` | Move to a specific slide index. |
| `slider.track.details` | Current track state — `abs` (absolute index), `rel` (relative index), `progress`, `slides`, and more. |
| `slider.on(event, handler)` | Subscribe to a slider event. |
| `slider.update(options?)` | Recalculate the slider (e.g. after the slides change). |
| `slider.destroy()` | Tear the slider down. |
| `slider.options` | The resolved options object. |

## Navigation controls

Add buttons that drive the slider instance. Guard with `slider?.` since the ref starts as `null`:

```vue
<template>
  <div ref="container" class="keen-slider">
    <div class="keen-slider__slide">1</div>
    <div class="keen-slider__slide">2</div>
    <div class="keen-slider__slide">3</div>
  </div>

  <button :disabled="!slider" @click="slider?.prev()">Previous</button>
  <button :disabled="!slider" @click="slider?.next()">Next</button>
</template>

<script setup>
const [container, slider] = useKeenSlider({
  loop: true,
})
</script>
```

## Reactive options

If you pass a `ref` or `computed` as the options argument, the slider updates automatically whenever those values change — no manual `update()` call needed:

```vue
<script setup>
import { ref, computed } from 'vue'

const perView = ref(3)

const options = computed(() => ({
  loop: true,
  slides: { perView: perView.value },
}))

const [container, slider] = useKeenSlider(options)

function showMore() {
  perView.value = 5 // slider re-renders automatically
}
</script>
```

## Events

Subscribe to slider events through the instance. Because `slider` is `null` until mount, `watch` it and attach handlers once it exists:

```vue
<script setup>
import { ref, watch } from 'vue'

const currentSlide = ref(0)

const [container, slider] = useKeenSlider({ loop: true })

watch(slider, (instance) => {
  if (!instance) return

  instance.on('slideChanged', (s) => {
    currentSlide.value = s.track.details?.rel ?? 0
  })
}, { immediate: true })
</script>
```

Useful events include `created`, `slideChanged`, `dragStarted`, `dragEnded`, `animationStarted`, `animationEnded`, `updated`, and `destroyed`.

:::tip
`track.details.rel` is the current slide index relative to the visible window (handy for dots), while `track.details.abs` is the absolute index across loops. Use `rel` for "which dot is active."
:::

## Next steps

- [Configuration](/nuxt-keen-slider/configuration/) — every option you can pass to `useKeenSlider()`.
- [Examples](/nuxt-keen-slider/examples/basic/) — copy-paste, end-to-end recipes.
