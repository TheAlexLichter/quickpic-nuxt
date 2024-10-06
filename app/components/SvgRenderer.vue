<script setup lang="ts">
const { svgContent } = defineProps<{
  svgContent: string;
}>();

const containerRef = useTemplateRef("container");

watchEffect(() => {
  if (!containerRef.value) {
    return
  }
  containerRef.value.innerHTML = svgContent;
  const svgElement = containerRef.value.querySelector("svg");
  if (svgElement) {
    svgElement.setAttribute("width", "100%");
    svgElement.setAttribute("height", "auto");
  }
});
</script>

<template>
  <div ref="container" />
</template>
