<script lang="ts" setup>
import { simpleIcon } from "@/constants/url";
import contacts from "@/data/contacts.json";
</script>

<template>
  <footer class="flex flex-col p-4 shadow-md border-t-4 gap-2 bg-gray-100">
    <h3 class="text-lg font-bold">Contact me</h3>
    <div class="flex gap-4">
      <div v-for="contact in contacts" :key="contact.icon">
        <a :href="contact.url" target="_blank" rel="noopener noreferrer">
          <img width="32" height="32" :src="`${simpleIcon}/${contact.icon}`" :alt="contact.icon" />
        </a>
      </div>
    </div>
  </footer>
</template>
