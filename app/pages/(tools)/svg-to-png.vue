<script setup lang="ts">
defineOgImageComponent("General", {
  title: "SVG ➡️ PNG",
  description: "The only simple SVG converter.",
});
definePageMeta({
  layout: "tools",
});

const title = "SVG to PNG converter - QuickPic";
const description = "Convert SVGs to PNGs. Also makes them bigger.";

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});
</script>

<template>
  <div>
    <SvgTool />
  </div>
</template>
