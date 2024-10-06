<template>
  <div
    class="flex flex-col justify-between min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]"
  >
    <BackButton />
    <main class="flex-grow flex flex-col items-center justify-center">
      <slot />
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
