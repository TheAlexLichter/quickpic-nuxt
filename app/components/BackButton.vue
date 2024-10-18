<template>
  <div class="fixed top-4 left-4 z-50">
      <NuxtLink
        to="/"
        class="px-3 py-1 text-gray-400 hover:text-gray-200 text-sm font-medium rounded-md transition-colors duration-200 flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back
      </NuxtLink>
    </div>
</template>