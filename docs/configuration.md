---
title: Configuration
description: Every option you can pass to the useKeenSlider composable — loop, mode, slides, vertical, rtl, drag, and the per-breakpoint overrides.
sidebar:
  order: 4
---

Nuxt Keen Slider has **no `nuxt.config` module options** — the module's only job is to wire up the composable, the stylesheet, and SSR transpilation. You configure each slider by the options object you pass to `useKeenSlider()`. That means every slider on a page is configured independently.

```vue
<script setup>
const [container] = useKeenSlider({
  loop: true,
  mode: 'snap',
  slides: {
    perView: 3,
    spacing: 15,
  },
})
</script>
```

:::tip
Pass a `ref` or `computed` as the options argument instead of a plain object and the slider re-renders automatically when those values change — see [Reactive options](/nuxt-keen-slider/usage/#reactive-options).
:::

## Top-level options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `loop` | `boolean \| { min?, max? }` | `false` | Loop the slides infinitely. |
| `mode` | `'snap' \| 'free' \| 'free-snap'` | `'snap'` | How the slider settles after a drag. `snap` snaps to a slide, `free` glides freely, `free-snap` glides then snaps. |
| `rtl` | `boolean` | `false` | Right-to-left direction. |
| `vertical` | `boolean` | `false` | Orient the slider vertically instead of horizontally. |
| `initial` | `number` | `0` | The slide index to start on. |
| `disabled` | `boolean` | `false` | Disable all interaction. |
| `drag` | `boolean` | `true` | Allow dragging / swiping. |
| `dragSpeed` | `number \| (val) => number` | `1` | Multiplier applied to drag distance. |
| `rubberband` | `boolean` | `true` | Rubber-band resistance at the ends when not looping. |
| `defaultAnimation` | `{ duration?, easing? }` | — | Default transition for programmatic moves. |
| `renderMode` | `'precision' \| 'performance' \| 'custom'` | `'precision'` | How the slider applies transforms. |
| `slides` | `number \| object \| (size, slides) => SlideOpts[]` | — | Slide layout — see below. |
| `breakpoints` | `object` | — | Per-media-query option overrides — see below. |
| `selector` | `string \| (HTMLElement) => HTMLElement[]` | `.keen-slider__slide` | How slides are selected within the container. |

## The `slides` option

The `slides` option controls how many slides are visible and how they're spaced. It accepts a number (shorthand for `perView`) or an object:

```js
const [container] = useKeenSlider({
  slides: {
    perView: 3,     // how many slides are visible at once
    spacing: 15,    // gap between slides, in pixels
    origin: 'auto', // 'auto' | 'center' | number — alignment of the active slide
  },
})
```

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `perView` | `number \| 'auto'` | `1` | Slides visible at once. `'auto'` sizes slides by their own width. |
| `spacing` | `number` | `0` | Gap between slides, in pixels. |
| `origin` | `'auto' \| 'center' \| number` | `'auto'` | Alignment of the active slide within the viewport. |
| `perView: 'auto'` | — | — | Use when slides have varying or content-driven widths. |

## Responsive `breakpoints`

`breakpoints` lets you override any of the top-level options per CSS media query. The key is a media query string; the value is a partial options object that's merged on top of the base options when that query matches:

```js
const [container] = useKeenSlider({
  loop: true,
  slides: { perView: 1, spacing: 10 },
  breakpoints: {
    '(min-width: 640px)': {
      slides: { perView: 2, spacing: 15 },
    },
    '(min-width: 1024px)': {
      slides: { perView: 4, spacing: 20 },
    },
  },
})
```

:::caution
A matching breakpoint **replaces** the options it overrides rather than deep-merging individual fields — so when you override `slides` in a breakpoint, restate every `slides` field you need (e.g. both `perView` and `spacing`), not just the one you're changing.
:::

## Plugins

The second argument to `useKeenSlider()` is an array of plugin functions. Plugins receive the slider instance and can hook into its events — this is how features like autoplay are added:

```js
const [container] = useKeenSlider(
  { loop: true },
  [
    /* plugin functions go here */
  ],
)
```

See [Autoplay](/nuxt-keen-slider/examples/autoplay/) for a complete plugin example.

## Next steps

- [Usage](/nuxt-keen-slider/usage/) — the slider instance, navigation, and events.
- [Examples](/nuxt-keen-slider/examples/basic/) — copy-paste recipes for dots, autoplay, and more.
