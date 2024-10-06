<script setup lang="ts">
defineOgImageComponent("General", {
  title: "Square Image Generator",
});

definePageMeta({
  layout: 'tools'
})

const title = "Square Image Generator - QuickPic";
const description =
  "Have an image you wish was square? We gotchu. Good for YouTube Community posts especially";

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <div>
    <SquareTool />
  </div>
</template>
