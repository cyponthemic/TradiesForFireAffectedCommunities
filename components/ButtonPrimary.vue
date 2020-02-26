<template>
  <button
    @click="$emit('click')"
    class="min-w-240 bg-transparent hover:bg-white text-white hover:text-primary font-bold py-6 px-4 border-2 rounded-full border-white hover:border-blue rounded w-full"
  >
    <span class="relative pl-16">
      <slot></slot>
    </span>
  </button>
</template>
<style>
.min-w-240 {
  min-width: 240px;
}
</style>
