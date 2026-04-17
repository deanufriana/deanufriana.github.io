<script lang="ts" setup>
import { useTypewriter } from "@/composables/string";
import resume from "@/data/resume.json";
import { computed, ref } from "vue";

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
    resume.work[resume.work.length - 1].startDate,
  ).getFullYear();
  return getYear - firstJob;
});

const copied = ref(false);

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(resume.basics.email);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy email:", err);
  }
};
</script>

<template>
  <section
    id="home"
    class="min-h-screen flex items-center justify-center relative overflow-hidden"
  >
    <!-- Subtle background gradient -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="max-w-6xl mx-auto px-6 relative z-10">
      <div class="flex flex-col gap-6">
        <div class="flex justify-between items-center">
          <!-- Role Label -->
          <div
            class="animate-fade-in-up opacity-0"
            style="animation-delay: 0.2s; animation-fill-mode: forwards"
          >
            <span
              class="text-sm md:text-base font-medium text-muted-foreground tracking-widest uppercase"
              >{{ resume.basics.label }}</span
            >
          </div>
          <!-- Available for Work Badge -->
          <div
            class="animate-fade-in-up opacity-0"
            style="animation-delay: 0.1s; animation-fill-mode: forwards"
          >
            <div
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 badge-pulse"
            >
              <span
                class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
              ></span>
              <span
                class="text-xs md:text-sm font-semibold text-emerald-500 tracking-wider uppercase"
                >Available for Work</span
              >
            </div>
          </div>
        </div>

        <!-- Main Heading -->
        <div
          class="animate-fade-in-up opacity-0"
          style="animation-delay: 0.3s; animation-fill-mode: forwards"
        >
          <h1
            class="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
          >
            I'm
            <span
              class="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent"
              >{{ resume.basics.name }}</span
            >
          </h1>
        </div>

        <!-- Subtitle with typewriter -->
        <div
          class="animate-fade-in-up opacity-0 max-w-2xl"
          style="animation-delay: 0.4s; animation-fill-mode: forwards"
        >
          <p class="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A
            <span class="text-foreground font-medium typewriter">{{
              typedText
            }}</span>
            with {{ yearExperience }}+ years of experience.
          </p>
        </div>

        <!-- CTA Buttons -->
        <div
          class="animate-fade-in-up opacity-0 flex flex-wrap items-center justify-center gap-4 mt-2"
          style="animation-delay: 0.5s; animation-fill-mode: forwards"
        >
          <a
            :href="`mailto:${resume.basics.email}`"
            class="inline-flex items-center gap-2 px-7 py-3 bg-foreground text-background text-sm font-semibold rounded-full hover:opacity-90 transition-all hover:scale-105 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Hire Me
          </a>
          <button
            @click="copyEmail"
            class="inline-flex items-center gap-2 px-7 py-3 border border-border text-sm font-semibold rounded-full hover:bg-accent transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <svg
              v-if="!copied"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path
                d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {{ copied ? "Copied!" : "Copy Email" }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
