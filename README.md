<h1 align="center">
Nuxt Keen Slider
</h1>

<p align="center">
<a href="https://npmjs.com/package/nuxt-keen-slider"><img src="https://img.shields.io/npm/v/nuxt-keen-slider/latest.svg?style=flat&colorA=020420&colorB=00DC82" alt="Nuxt Keen Slider - NPM Package" /></a>
<a href="https://npmjs.com/package/nuxt-keen-slider"><img src="https://img.shields.io/npm/dm/nuxt-keen-slider.svg?style=flat&colorA=020420&colorB=00DC82" alt="Nuxt Keen Slider - NPM Package Downloads" /></a>
<a href="https://npmjs.com/package/nuxt-keen-slider"><img src="https://img.shields.io/npm/l/nuxt-keen-slider.svg?style=flat&colorA=020420&" alt="Nuxt Keen Slider License" /></a>
<a href="https://nuxt.com"><img src="https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js" alt="Nuxt Keen Slider - Nuxt" /></a>
</p>

<p align="center">
Easy, lightweight slider or carousel creations.
</p>

<p align="center">
<img src="https://camo.githubusercontent.com/cdcc9bea5403b1c2038a27dfde6046532a5ed1f85e783767c7a19222561510e1/68747470733a2f2f6b65656e2d736c696465722e696f2f696d616765732f636172642e676966" alt="Nuxt Keen Slider - Preview 1" />
<img src="https://camo.githubusercontent.com/f8b084dc85c136039f043370b8916b855f82e2720fd2355fedc16f010d746aff/68747470733a2f2f6b65656e2d736c696465722e696f2f696d616765732f64656d6f322e676966" alt="Nuxt Keen Slider - Preview 2" />
</p>


-----
- [🧪 &nbsp;Examples](https://keen-slider.io/examples)
- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 &nbsp;Online playground](https://stackblitz.com/github/modbender/nuxt-keen-slider?file=playground%2Fapp.vue)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

- ✊**Great Performance**: Best Lighthouse Perfomance, Lowest CLS
- ⚡**Lightweight**: No dependencies, Fast loading
- 📱**Mobile First**: Supports multi touch and is fully responsive
- ⚔️**Compatible**: Works in all common browsers, including >= IE 10 and React Native
- 🗼**Extensible**: Rich but simple API

## Quick Setup

1. Add `nuxt-keen-slider` dependency to your project

    ```bash
    # Using pnpm
    pnpm add -D nuxt-keen-slider

    # Using yarn
    yarn add --dev nuxt-keen-slider

    # Using npm
    npm install --save-dev nuxt-keen-slider
    ```

2. Add `nuxt-keen-slider` to the `modules` section of `nuxt.config.ts`

    ```js
    export default defineNuxtConfig({
      modules: [
        'nuxt-keen-slider'
      ]
    })
    ```

3. Create a component with name of your wish, ex. `Slider.vue`

    ```xml
    <template>
      <div ref="container" class="keen-slider">
        <div class="keen-slider__slide number-slide1">1</div>
        <div class="keen-slider__slide number-slide2">2</div>
        <div class="keen-slider__slide number-slide3">3</div>
        <div class="keen-slider__slide number-slide4">4</div>
        <div class="keen-slider__slide number-slide5">5</div>
        <div class="keen-slider__slide number-slide6">6</div>
      </div>
    </template>

    <script setup>
    const [container, slider] = useKeenSlider({
      loop: true,
      mode: "free",
      slides: {
        perView: 3,
        spacing: 15,
      },
    });
    </script>

    <style>
    [class^="number-slide"],
    [class*=" number-slide"] {
      background: grey;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 50px;
      color: #fff;
      font-weight: 500;
      height: 300px;
      max-height: 100vh;
    }

    .number-slide1 {
      background: rgb(64, 175, 255);
      background: linear-gradient(
        128deg,
        rgba(64, 175, 255, 1) 0%,
        rgba(63, 97, 255, 1) 100%
      );
    }

    .number-slide2 {
      background: rgb(255, 75, 64);
      background: linear-gradient(
        128deg,
        rgba(255, 154, 63, 1) 0%,
        rgba(255, 75, 64, 1) 100%
      );
    }

    .number-slide3 {
      background: rgb(182, 255, 64);
      background: linear-gradient(
        128deg,
        rgba(182, 255, 64, 1) 0%,
        rgba(63, 255, 71, 1) 100%
      );
      background: linear-gradient(
        128deg,
        rgba(189, 255, 83, 1) 0%,
        rgba(43, 250, 82, 1) 100%
      );
    }

    .number-slide4 {
      background: rgb(64, 255, 242);
      background: linear-gradient(
        128deg,
        rgba(64, 255, 242, 1) 0%,
        rgba(63, 188, 255, 1) 100%
      );
    }

    .number-slide5 {
      background: rgb(255, 64, 156);
      background: linear-gradient(
        128deg,
        rgba(255, 64, 156, 1) 0%,
        rgba(255, 63, 63, 1) 100%
      );
    }
    .number-slide6 {
      background: rgb(64, 76, 255);
      background: linear-gradient(
        128deg,
        rgba(64, 76, 255, 1) 0%,
        rgba(174, 63, 255, 1) 100%
      );
    }
    </style>
    ```

4. Add the component anywhere you want

    ```xml
    <template>
      <Slider />
    </template>
    ```

That's it! You can now use Nuxt Keen Slider in your Nuxt app ✨

-----

> [!NOTE]  OPTIONAL
> I have seen **absolute 0 CLS**, maximum performance by wrapping the `Slider` component with `ClientOnly`.  
> Seems to stop working if the component is created with .client.vue extension.    
> You could try the same if you are having Lighthouse/PageSpeed score issues and you are aiming for maximum performance.
>
> **Remember**, this could not work depending on use case.

```xml
<template>
  <ClientOnly>
    <Slider />
  </ClientOnly>
</template>
```

## Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm run dev:prepare

# Develop with the playground
pnpm run dev

# Build the playground
pnpm run dev:build

# Run ESLint
pnpm run lint

# Run Vitest
pnpm run test
pnpm run test:watch

# Release new version
npm run release
```
