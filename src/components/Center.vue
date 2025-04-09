<script setup lang="ts">
import "./css/center.css";
withDefaults(defineProps<{ isFullHeight?: boolean, id?: string }>(), { isFullHeight: true });
</script>

<template>
  <div :id="id" :class="[{ 'h-screen': isFullHeight }, 'center']">
    <slot />
  </div>
</template>
