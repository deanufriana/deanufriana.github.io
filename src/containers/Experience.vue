<script lang="ts" setup>
import Badge from "@/components/ui/badge/Badge.vue";
import { Card, CardContent } from "@/components/ui/card";
import resume from "@/data/resume.json";
import "./css/experience.css";

const formatDate = (date: string | undefined | null) => {
  if (!date) return "Present";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};
</script>

<template>
  <div class="flex gap-4 p-4 flex-col">
    <h1 class="text-5xl font-bold">Experience</h1>
    <div class="flex overflow-x-auto snap-x snap-mandatory gap-4">
      <Card v-for="work in resume.work" class="min-w-[90%] snap-start md:min-w-[32%]" :key="work.name">
        <CardContent class="flex flex-col gap-1">
          <h3 class="flex justify-between gap-4">
            <a class="text-2xl md:text-4xl font-bold text-blue-600" :href="work.url" target="_blank">{{ work.name }}</a>
            <span>
              <Badge>{{ work.position }}</Badge>
            </span>
          </h3> 
          <time>{{ formatDate(work.startDate) }} - {{ formatDate(work.endDate) }}</time>
          <hr />
          <p>{{ work.summary }}</p>
          <ol>
            <li v-for="highlight in work.highlights" :key="highlight">
              {{ highlight }}
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
