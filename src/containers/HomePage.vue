<script lang="ts" setup>
import { computed, onMounted } from "vue";
import companies from "@/data/companies.json";
import Button from "@/components/Button.vue";
import Center from "@/components/Center.vue";

onMounted(() => {
  document.documentElement.setAttribute(
    "data-theme",
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
});

const yearExperience = computed(() => {
  const getYear = new Date().getFullYear();
  const firstJob = new Date(
    companies[companies.length - 1].date.start
  ).getFullYear();
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
        a <span class="mark">Software Engineer</span> with
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
