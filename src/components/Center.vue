<script setup lang="ts">
withDefaults(defineProps<{ isFullHeight?: boolean, id?: string }>(), { isFullHeight: true });
</script>

<template>
  <div :id="id" :class="[{ 'h-screen dark:bg-gray-800  flex justify-center items-center p-4': isFullHeight }, 'center']">
    <slot />
  </div>
</template>
