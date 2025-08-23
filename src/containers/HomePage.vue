<script lang="ts" setup>
import Button from "@/components/ui/button/Button.vue";
import { useTypewriter } from "@/composables/string";
import resume from "@/data/resume.json";
import { computed } from "vue";

const texts = computed(() => {
  const positions = new Set(resume.work.map((job) => job.position));
  return Array.from(positions);
});

const { typedText } = useTypewriter(texts.value, {
  typingSpeed: 100,
  deletingSpeed: 50,
  pauseDuration: 2000,
  startDelay: 500,
});

const yearExperience = computed(() => {
  const getYear = new Date().getFullYear();
  const firstJob = new Date(
    resume.work[resume.work.length - 1].startDate
  ).getFullYear();
  const yearExperience = getYear - firstJob;
  return yearExperience;
});
</script>

<template>
  <div class="h-screen bg-gray-800 text-white flex justify-center items-center">
    <div class="flex gap-2 flex-col p-6">
      <h4 class="text-2xl font-bold">Hello,</h4>
      <h1 class="text-5xl font-bold">
        I am <span class="text-blue-600">Devi Adi Nufriana</span>
      </h1>
      <p class="text-base">
        a <span class="text-blue-600 typewriter">{{ typedText }}</span> with
        {{ yearExperience }} year of experience
      </p>
      <div class="flex gap-2">
        <a href="#about">
          <Button size="lg">Found out more</Button>
        </a>
        <a href="https://www.linkedin.com/in/devinufriana">
          <Button size="lg" variant="secondary">Hire me</Button>
        </a>
      </div>
    </div>
  </div>
</template>
