<template>
  <button
    @click="$emit('click')"
    class="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 border-b-4 border-blue-dark hover:border-blue rounded"
  >
    <slot></slot>
  </button>
</template>
