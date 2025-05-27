<script lang="ts" setup>
import "./css/timeline.css";
import Badge from "./ui/badge/Badge.vue";
defineProps<{
  name: string;
  role: string;
  date: { start: string; end: string };
  jobDesc: string[];
}>();
</script>

<template>
  <div class="timeline">
    <div class="timeline__right">
      <h3>
        {{ name }}
        <Badge class="role">{{ role }}</Badge>
      </h3>
      <time>{{ date.start }} - {{ date.end }}</time>
      <ul>
        <li v-for="job in jobDesc">{{ job }}</li>
      </ul>
    </div>
  </div>
</template>
