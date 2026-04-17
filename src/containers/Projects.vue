<script lang="ts" setup>
import resumeEn from "@/data/resume.json";
import resumeId from "@/data/resume.id.json";
import { useTranslations, type ui } from "@/i18n/ui";
import { computed } from "vue";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), { lang: "en" });
const t = useTranslations(props.lang);

const resume = computed(() => props.lang === 'id' ? resumeId : resumeEn);
</script>

<template>
  <section id="projects" class="py-20 sm:py-28">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Section Header -->
      <div class="flex items-end justify-between mb-10">
        <div>
          <span class="text-xs font-semibold text-muted-foreground tracking-widest uppercase">{{ t('projects.label') }}</span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-2">{{ t('projects.heading') }}</h2>
          <p class="text-sm sm:text-base text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            {{ t('projects.subtitle') }}
          </p>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          v-for="(project, index) in resume.projects"
          :key="project.name"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative rounded-2xl p-6 glass-card card-hover flex flex-col gap-4 no-underline"
          :style="{ animationDelay: `${(index + 1) * 0.1}s` }"
        >
          <!-- Project Header -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1">
              <h3 class="text-xl font-bold text-foreground group-hover:text-emerald-500 transition-colors">
                {{ project.name }}
              </h3>
              <div class="flex items-center gap-2 mt-1.5">
                <span class="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                  {{ t('projects.openSource') }}
                </span>
                <span class="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  {{ new Date(project.startDate).getFullYear() }}
                </span>
              </div>
            </div>
            <!-- Arrow icon -->
            <div class="p-2 rounded-lg bg-accent opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"/>
                <polyline points="7 7 17 7 17 17"/>
              </svg>
            </div>
          </div>

          <!-- Description -->
          <p v-if="project.description" class="text-sm text-muted-foreground leading-relaxed">
            {{ project.description }}
          </p>
          <p v-else class="text-sm text-muted-foreground leading-relaxed italic">
            {{ t('projects.personal') }}
          </p>

          <!-- Link label -->
          <div class="flex items-center gap-2 mt-auto pt-2 text-xs text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            <span class="group-hover:text-emerald-500 transition-colors">{{ project.url.replace('https://', '').replace('http://', '') }}</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
