<script lang="ts" setup>
import Button from "@/components/Button.vue";
import Center from "@/components/Center.vue";
import { useTypewriter } from "@/composables/string";
import resume from "@/data/resume.json";
import { computed, onMounted } from "vue";

const texts = computed(() => {
  // Get unique positions from resume.json
  const positions = new Set(resume.work.map(job => job.position));
  return Array.from(positions);
});

const { typedText } = useTypewriter(texts.value, {
  typingSpeed: 100,
  deletingSpeed: 50,
  pauseDuration: 2000,
  startDelay: 500
});

onMounted(() => {
  document.documentElement.setAttribute(
    "data-theme",
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
});

const yearExperience = computed(() => {
  const getYear = new Date().getFullYear();
  const firstJob = new Date(resume.work[resume.work.length - 1].startDate).getFullYear();
  const yearExperience = getYear - firstJob;
  return yearExperience;
});
</script>

<template>
  <Center>
    <div class="content">
      <h4>Hello,</h4>
      <h1>I am <span class="mark">Devi Adi Nufriana</span></h1>
      <p>
        a <span class="typewriter">{{ typedText }}</span> with
        {{ yearExperience }} year of experience
      </p>
      <div class="groups">
        <a href="#about">
          <Button>Found out more</Button>
        </a>
        <a href="https://www.linkedin.com/in/devinufriana">
          <Button variant="secondary">Hire me</Button>
        </a>
      </div>
    </div>
  </Center>
</template>
