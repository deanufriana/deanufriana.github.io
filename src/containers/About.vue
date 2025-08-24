<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import { simpleIcon } from "@/constants/url";
import icons from "@/data/icons.json";
import resume from "@/data/resume.json";
</script>

<template>
  <div id="about" class="md:py-12 p-4 bg-gray-600 text-white flex flex-row gap-4 mx-auto justify-center">
    <div class="flex-1 max-w-3xl flex gap-4 flex-col">
      <h1 class="text-5xl font-bold">About</h1>
      <p class="text-base">
        {{ resume.basics.summary }}
      </p>
      <div class="flex flex-wrap gap-2">
        <div v-for="icon in icons" :key="icon">
          <img width="32" height="32" :src="`${simpleIcon}/${icon}`" :alt="icon" />
        </div>
      </div>
      <a target="_blank" href="https://registry.jsonresume.org/deanufriana">
        <Button size="lg" variant="secondary">Download CV</Button>
      </a>
    </div>
  </div>
</template>
