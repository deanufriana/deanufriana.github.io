<script lang="ts" setup>
import { simpleIcon } from "@/constants/url";
import icons from "@/data/icons.json";
</script>


<template>
  <div id="about" class="flex gap-4 flex-col p-6 bg-gray-600 text-white">
    <h1 class="text-5xl font-bold">About</h1>
    <p class="text-base">
      A technology enthusiast is endlessly driven by the pursuit of continuous
      learning and exploration in the ever-evolving world of technology
    </p>
    <div class="flex flex-wrap gap-2">
      <div v-for="icon in icons" :key="icon">
        <img width="32" height="32" :src="`${simpleIcon}/${icon}`" :alt="icon" />
      </div>
    </div>
  </div>
</template>
