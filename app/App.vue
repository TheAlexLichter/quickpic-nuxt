<script setup lang="ts">
const title = "QuickPic Nuxt - QuickPic built with Nuxt.js";
const description = "A bunch of simple tools for images. All free. No BS.";

useServerHead({
  bodyAttrs: {
    class: "font-geist antialiased",
  },
  link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
});

useSeoMeta({
  title,
  description,
  // Either NuxtSeo SEO Experiments OR set it manually
  ogTitle: title,
  ogDescription: description,
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
