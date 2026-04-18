<script lang="ts" setup>
import resumeEn from "@/data/resume.json";
import resumeId from "@/data/resume.id.json";
import { useTranslations, type ui } from "@/i18n/ui";
import { computed } from "vue";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), { lang: "en" });
const t = useTranslations(props.lang);

const resume = computed(() => (props.lang === "id" ? resumeId : resumeEn));
</script>

<template>
  <section
    id="projects"
    class="py-20 sm:py-28"
  >
    <div class="mx-auto max-w-6xl px-6">
      <!-- Section Header -->
      <div class="mb-10 flex items-end justify-between">
        <div>
          <span class="text-muted-foreground text-xs font-semibold tracking-widest uppercase">{{
            t("projects.label")
          }}</span>
          <h2 class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {{ t("projects.heading") }}
          </h2>
          <p class="text-muted-foreground mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
            {{ t("projects.subtitle") }}
          </p>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <a
          v-for="(project, index) in resume.projects"
          :key="project.name"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group glass-card card-hover relative flex flex-col gap-4 rounded-2xl p-6 no-underline"
          :style="{ animationDelay: `${(index + 1) * 0.1}s` }"
        >
          <!-- Project Header -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1">
              <h3
                class="text-foreground text-xl font-bold transition-colors group-hover:text-emerald-500"
              >
                {{ project.name }}
              </h3>
              <div class="mt-1.5 flex items-center gap-2">
                <span
                  class="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-emerald-500 uppercase"
                >
                  {{ t("projects.openSource") }}
                </span>
                <span
                  class="text-muted-foreground text-[10px] font-medium tracking-wider uppercase"
                >
                  {{ new Date(project.startDate).getFullYear() }}
                </span>
              </div>
            </div>
            <!-- Arrow icon -->
            <div
              class="bg-accent transform rounded-lg p-2 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line
                  x1="7"
                  y1="17"
                  x2="17"
                  y2="7"
                />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </div>

          <!-- Description -->
          <p
            v-if="project.description"
            class="text-muted-foreground text-sm leading-relaxed"
          >
            {{ project.description }}
          </p>
          <p
            v-else
            class="text-muted-foreground text-sm leading-relaxed italic"
          >
            {{ t("projects.personal") }}
          </p>

          <!-- Link label -->
          <div class="text-muted-foreground mt-auto flex items-center gap-2 pt-2 text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <span class="transition-colors group-hover:text-emerald-500">{{
              project.url.replace("https://", "").replace("http://", "")
            }}</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
