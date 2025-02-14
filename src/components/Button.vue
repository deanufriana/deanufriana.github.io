<script setup lang="ts">
type variant = "primary" | "secondary";

withDefaults(defineProps<{ variant?: variant }>(), {
  variant: "primary",
});

</script>

<template>
  <button :class="[variant, 'btn-primary']">
    <slot />
  </button>
</template>

<style scoped>
@import "./css/button.css";
</style>