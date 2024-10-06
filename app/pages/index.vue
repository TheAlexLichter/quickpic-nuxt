<script setup lang="ts">
defineOgImageComponent("General", {
  title: "QuickPic Nuxt",
  description: "QuickPic but with Nuxt ;)",
});
</script>

<template>
  <div
    class="flex flex-col justify-between min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]"
  >
    <main class="flex-grow flex flex-col items-center justify-center">
      <div>
        Hi. I&apos;m
        <NuxtLink
          href="https://twitter.com/t3dotgg"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:underline"
        >
          Alex</NuxtLink
        >. I did not build these tools but I converted
        <NuxtLink
          href="https://quickpic.t3.gg/"
          rel="noopener noreferrer"
          class="hover:underline"
          target="_blank"
        >
          Theo's application
        </NuxtLink>
        to Nuxt.
      </div>
      <div class="mt-4"></div>
      <NuxtLink to="/svg-to-png" class="text-blue-500 hover:underline">
        SVG to PNG converter
      </NuxtLink>
      <NuxtLink to="/square-image" class="text-blue-500 hover:underline">
        Square image generator
      </NuxtLink>
    </main>
    <footer class="text-center text-sm text-gray-500 mt-8">
      <NuxtLink
        href="https://github.com/manniL/quickpic-nuxt"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:underline"
      >
        View on GitHub
      </NuxtLink>
    </footer>
  </div>
</template>
