<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <div
    :style="{
      fontSize: 160,
      background: 'black',
      width: '100%',
      height: '100%',
      display: 'flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'Inter, sans-serif',
    }"
  >
    <div
      :style="{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
      }"
    >
      <span :style="{ fontWeight: 600 }">{{ title }}</span>
      <span :style="{ fontSize: 40, fontWeight: 300 }">
        {{ description }}
      </span>
    </div>
  </div>
</template>
