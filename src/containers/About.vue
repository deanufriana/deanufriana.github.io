<script lang="ts" setup>
import { useResume } from "@/composables/resume";
import { useTranslations, type ui } from "@/i18n/ui";
import { useScrollReveal } from "@/composables/reveal";
import { Download } from "lucide-vue-next";
import { computed } from "vue";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), { lang: "en" });
const t = useTranslations(props.lang);
const { resume, yearsOfExperience, stats } = useResume(props.lang);

const allSkills = computed(() => resume.value.skills.flatMap((s) => s.keywords));

const { elementRef: sectionRef } = useScrollReveal();
</script>

<template>
  <section
    id="about"
    ref="sectionRef"
    class="reveal py-20 sm:py-28"
  >
    <div class="mx-auto max-w-6xl px-6">
      <!-- Section Label -->
      <div
        class="animate-fade-in-up opacity-0"
        style="animation-delay: 0.1s; animation-fill-mode: forwards"
      >
        <span class="text-muted-foreground text-xs font-semibold tracking-widest uppercase">{{
          t("about.label")
        }}</span>
      </div>

      <div class="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
        <!-- Left: Main content -->
        <div class="flex flex-col gap-6 lg:col-span-3">
          <h2 class="text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {{ t("about.heading") }}
            <span
              class="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent"
              >{{ resume.basics.name.split(" ")[0] }}</span
            >
          </h2>

          <p class="text-muted-foreground text-base leading-relaxed sm:text-lg">
            {{ resume.basics.summary }}
          </p>

          <div class="mt-2 flex flex-wrap gap-3">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://registry.jsonresume.org/deanufriana"
              class="bg-foreground text-background inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:scale-105 hover:opacity-90 active:scale-95"
            >
              <Download :size="16" />
              {{ t("about.downloadCv") }}
            </a>
          </div>
        </div>

        <!-- Right: Skills & Info -->
        <div class="flex flex-col gap-8 lg:col-span-2">
          <!-- Info Cards -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-card border-border card-hover rounded-xl border p-4">
              <p class="text-2xl font-bold sm:text-3xl">{{ yearsOfExperience }}+</p>
              <p class="text-muted-foreground mt-1 text-xs tracking-wider uppercase">
                {{ t("about.yearsExp") }}
              </p>
            </div>
            <div class="bg-card border-border card-hover rounded-xl border p-4">
              <p class="text-2xl font-bold sm:text-3xl">{{ stats.companies }}+</p>
              <p class="text-muted-foreground mt-1 text-xs tracking-wider uppercase">
                {{ t("about.companies") }}
              </p>
            </div>
            <div class="bg-card border-border card-hover rounded-xl border p-4">
              <p class="text-2xl font-bold sm:text-3xl">{{ stats.projects }}+</p>
              <p class="text-muted-foreground mt-1 text-xs tracking-wider uppercase">
                {{ t("about.projects") }}
              </p>
            </div>
            <div class="bg-card border-border card-hover rounded-xl border p-4">
              <p class="text-2xl font-bold sm:text-3xl">
                {{ t("about.privacyValue") }}
              </p>
              <p class="text-muted-foreground mt-1 text-xs tracking-wider uppercase">
                {{ t("about.privacyLabel") }}
              </p>
            </div>
          </div>

          <!-- Skills -->
          <div>
            <h3 class="text-muted-foreground mb-4 text-sm font-semibold tracking-widest uppercase">
              {{ t("about.techStack") }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in allSkills"
                :key="skill"
                class="border-border bg-card text-foreground hover:bg-accent rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
