<script lang="ts" setup>
import { Badge } from "@/components/ui/badge";
import { useResume } from "@/composables/resume";
import { useTranslations, type ui } from "@/i18n/ui";
import { ArrowUpRight } from "lucide-vue-next";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), { lang: "en" });
const t = useTranslations(props.lang);

const { resume } = useResume(props.lang);

const getProjectYear = (dateStr?: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).getFullYear();
};

const isGitHubUrl = (url: string) => url.includes("github.com");
</script>

<template>
  <section
    id="projects"
    class="animate-fade-in-up enter-delay-2 border-border border-t pt-8"
  >
    <h2 class="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
      {{ t("projects.title") }}
    </h2>

    <p class="text-muted-foreground mb-4 text-sm leading-relaxed">
      {{ t("projects.subtitle") }}
    </p>

    <div class="flex flex-col gap-2">
      <div
        v-for="project in resume.projects"
        :key="project.name"
        class="group hover:bg-sidebar/60 relative -mx-3 flex flex-col gap-2 rounded-lg p-3 transition-colors duration-200"
      >
        <a
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`View project: ${project.name}`"
          class="absolute inset-0 z-10"
        />

        <!-- Project Header -->
        <div class="flex items-start justify-between gap-3">
          <div class="flex flex-wrap items-center gap-2">
            <h3 class="text-foreground group-hover:text-brand text-base font-bold transition-colors">
              {{ project.name }}
            </h3>
            <Badge
              :variant="isGitHubUrl(project.url) ? 'secondary' : 'brand'"
              class="rounded-md px-2 py-0.5 text-[11px] font-semibold"
            >
              {{ isGitHubUrl(project.url) ? t("projects.openSource") : t("projects.liveDemo") }}
            </Badge>
            <span
              v-if="project.startDate"
              class="text-muted-foreground text-xs"
            >
              {{ getProjectYear(project.startDate) }}
            </span>
          </div>
          <ArrowUpRight
            :size="15"
            class="text-muted-foreground group-hover:text-brand mt-0.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
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

        <!-- Tech Stack (plain inline list) -->
        <p
          v-if="project.keywords && project.keywords.length"
          class="text-muted-foreground/80 text-xs"
        >
          {{ project.keywords.join(" · ") }}
        </p>
      </div>
    </div>
  </section>
</template>
