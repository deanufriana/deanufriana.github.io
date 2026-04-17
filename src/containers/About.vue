<script lang="ts" setup>
import resumeEn from "@/data/resume.json";
import resumeId from "@/data/resume.id.json";
import { useTranslations, type ui } from "@/i18n/ui";
import { computed } from "vue";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), { lang: "en" });
const t = useTranslations(props.lang);

const resume = computed(() => props.lang === 'id' ? resumeId : resumeEn);
const allSkills = computed(() => resume.value.skills.flatMap((s) => s.keywords));
</script>

<template>
  <section id="about" class="py-20 sm:py-28">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Section Label -->
      <div class="animate-fade-in-up opacity-0" style="animation-delay: 0.1s; animation-fill-mode: forwards;">
        <span class="text-xs font-semibold text-muted-foreground tracking-widest uppercase">{{ t('about.label') }}</span>
      </div>

      <div class="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        <!-- Left: Main content -->
        <div class="lg:col-span-3 flex flex-col gap-6">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            {{ t('about.heading') }} <span class="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">{{ resume.basics.name.split(' ')[0] }}</span>
          </h2>

          <p class="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {{ resume.basics.summary }}
          </p>

          <div class="flex flex-wrap gap-3 mt-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://registry.jsonresume.org/deanufriana"
              class="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-semibold rounded-full hover:opacity-90 transition-all hover:scale-105 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {{ t('about.downloadCv') }}
            </a>
          </div>
        </div>

        <!-- Right: Skills & Info -->
        <div class="lg:col-span-2 flex flex-col gap-8">
          <!-- Info Cards -->
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-card border border-border card-hover">
              <p class="text-2xl sm:text-3xl font-bold">
                {{ new Date().getFullYear() - new Date(resume.work[resume.work.length - 1].startDate).getFullYear() }}+
              </p>
              <p class="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{{ t('about.yearsExp') }}</p>
            </div>
            <div class="p-4 rounded-xl bg-card border border-border card-hover">
              <p class="text-2xl sm:text-3xl font-bold">{{ resume.work.length }}+</p>
              <p class="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{{ t('about.companies') }}</p>
            </div>
            <div class="p-4 rounded-xl bg-card border border-border card-hover">
              <p class="text-2xl sm:text-3xl font-bold">{{ resume.projects.length }}+</p>
              <p class="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{{ t('about.projects') }}</p>
            </div>
            <div class="p-4 rounded-xl bg-card border border-border card-hover">
              <p class="text-2xl sm:text-3xl font-bold">{{ t('about.privacyValue') }}</p>
              <p class="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{{ t('about.privacyLabel') }}</p>
            </div>

          </div>

          <!-- Skills -->
          <div>
            <h3 class="text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-4">{{ t('about.techStack') }}</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in allSkills"
                :key="skill"
                class="px-3 py-1.5 text-xs font-medium rounded-full border border-border bg-card text-foreground hover:bg-accent transition-colors"
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
