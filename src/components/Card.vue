<script setup lang="ts">
withDefaults(defineProps<{ isFullHeight?: boolean }>(), { isFullHeight: true });
</script>

<template>
  <div :class="[{}, 'card']">
    <slot />
  </div>
</template>
