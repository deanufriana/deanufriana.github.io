<script lang="ts" setup>
import resumeEn from "@/data/resume.json";
import resumeId from "@/data/resume.id.json";
import { useTranslations, type ui } from "@/i18n/ui";
import { computed } from "vue";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), { lang: "en" });
const t = useTranslations(props.lang);

const resume = computed(() => props.lang === 'id' ? resumeId : resumeEn);

const formatDate = (date: string | undefined | null) => {
  if (!date) return t('experience.present');
  return new Date(date).toLocaleDateString(props.lang === 'id' ? "id-ID" : "en-US", {
    year: "numeric",
    month: "short",
  });
};
</script>

<template>
  <section id="experience" class="py-20 sm:py-28" style="background-color: var(--section-alt-bg);">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Section Header -->
      <div class="flex items-end justify-between mb-10">
        <div>
          <span class="text-xs font-semibold text-muted-foreground tracking-widest uppercase">{{ t('experience.label') }}</span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-2">{{ t('experience.heading') }}</h2>
        </div>
      </div>

      <!-- Experience Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(work, index) in resume.work"
          :key="work.name"
          class="group relative rounded-2xl bg-card p-6 card-hover flex flex-col gap-4"
          :style="{ animationDelay: `${(index + 1) * 0.1}s` }"
        >
          <!-- Company Header -->
          <div class="flex items-start justify-between gap-3">
            <div>
              <a
                :href="work.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xl font-bold text-foreground group-hover:text-emerald-500 transition-colors"
              >
                {{ work.name }}
              </a>
              <p class="text-sm text-muted-foreground mt-1">
                {{ formatDate(work.startDate) }} — {{ work.endDate ? formatDate(work.endDate) : t('experience.present') }}
              </p>
            </div>
            <!-- Arrow icon -->
            <div class="p-2 rounded-lg bg-accent opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"/>
                <polyline points="7 7 17 7 17 17"/>
              </svg>
            </div>
          </div>

          <!-- Role Badge -->
          <span class="inline-flex self-start items-center px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            {{ work.position }}
          </span>

          <!-- Summary -->
          <p class="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {{ work.summary }}
          </p>

          <!-- Skills Tags -->
          <div class="flex flex-wrap gap-1.5 mt-auto pt-2">
            <span
              v-for="skill in work.skills"
              :key="skill"
              class="px-2 py-0.5 text-[10px] font-medium rounded-full border border-border text-muted-foreground"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
