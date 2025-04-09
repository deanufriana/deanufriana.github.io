<script lang="ts" setup>
import Card from "@/components/Card.vue";
import Center from "@/components/Center.vue";
import resume from "@/data/resume.json";
import "./css/experience.css";

const formatDate = (date: string | undefined | null) => {
  if (!date) return 'Present';
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};
</script>

<template>
  <Center :is-full-height="false">
    <div class="content" id="experience">
      <h1>Experience</h1>
      <div class="list">
        <Card v-for="work in resume.work" :key="work.name">
          <h3>
            <a :href="work.url" target="_blank">{{ work.name }}</a>
            <span class="role">{{ work.position }}</span>
          </h3>
          <time>{{ formatDate(work.startDate) }} - {{ formatDate(work.endDate) }}</time>
          <hr />
          <p>{{ work.summary }}</p>
          <ol>
            <li v-for="highlight in work.highlights" :key="highlight">
              {{ highlight }}
            </li>
          </ol>
        </Card>
      </div>
    </div>
  </Center>
</template>
