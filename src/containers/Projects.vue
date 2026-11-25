<script lang="ts" setup>
import { Badge } from "@/components/ui/badge";
import { useResume } from "@/composables/resume";
import { useTranslations, type ui } from "@/i18n/ui";
import type { GitHubRepoMeta } from "@/lib/github";
import { ArrowUpRight, Star } from "lucide-vue-next";

import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    lang?: keyof typeof ui;
    repoStats?: Record<string, GitHubRepoMeta>;
    recentRepos?: GitHubRepoMeta[];
  }>(),
  {
    lang: "en",
    repoStats: () => ({}),
    recentRepos: () => [],
  },
);
const t = useTranslations(props.lang);

const { resume } = useResume(props.lang);

const getProjectYear = (dateStr?: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).getFullYear();
};

const isGitHubUrl = (url: string) => url.includes("github.com");

const extractRepoSlug = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parsed.hostname.includes("github.com") && parts.length >= 2) {
      return parts[1].toLowerCase();
    }
    if (parsed.hostname.endsWith("github.io") && parts.length >= 1) {
      return parts[0].toLowerCase();
    }
    return null;
  } catch {
    return null;
  }
};

const getRepoMeta = (url: string): GitHubRepoMeta | null => {
  const slug = extractRepoSlug(url);
  if (!slug) return null;
  return props.repoStats[slug] ?? null;
};

const extraRepos = computed(() => {
  const featuredSlugs = new Set(
    resume.value.projects.map((p) => extractRepoSlug(p.url)).filter(Boolean) as string[],
  );
  return props.recentRepos.filter((repo) => !featuredSlugs.has(repo.name.toLowerCase())).slice(0, 3);
});

const formatMonthYear = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString(props.lang === "id" ? "id-ID" : "en-US", {
    month: "short",
    year: "numeric",
  });
};
</script>

<template>
  <section id="projects">
    <div class="reveal-on-scroll">
      <h2 class="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
        {{ t("projects.title") }}
      </h2>

      <p class="text-muted-foreground mb-4 text-sm leading-relaxed">
        {{ t("projects.subtitle") }}
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <div
        v-for="project in resume.projects"
        :key="project.name"
        class="reveal-on-scroll group hover:bg-sidebar/60 relative -mx-3 flex flex-col gap-2 rounded-lg p-3 transition-colors duration-200"
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
            <h3
              class="text-foreground group-hover:text-brand text-base font-bold transition-colors"
            >
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

        <!-- Tech Stack + Live GitHub Repo Metadata -->
        <div class="text-muted-foreground/80 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span v-if="project.keywords && project.keywords.length">
            {{ project.keywords.join(" · ") }}
          </span>
          <template v-if="getRepoMeta(project.url)">
            <span
              v-if="getRepoMeta(project.url)?.language"
              class="text-muted-foreground font-medium"
            >
              · {{ getRepoMeta(project.url)?.language }}
            </span>
            <span
              v-if="(getRepoMeta(project.url)?.stars ?? 0) > 0"
              class="text-muted-foreground inline-flex items-center gap-1 font-medium"
            >
              <Star
                :size="11"
                class="text-brand"
              />
              {{ getRepoMeta(project.url)?.stars }}
            </span>
            <span>
              · {{ t("github.updated") }} {{ formatMonthYear(getRepoMeta(project.url)!.pushedAt) }}
            </span>
          </template>
        </div>
      </div>
    </div>

    <!-- Compact Recently Updated GitHub Repos -->
    <div
      v-if="extraRepos.length > 0"
      class="reveal-on-scroll border-border/60 mt-8 border-t pt-6"
    >
      <h3 class="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
        {{ t("projects.moreOnGithub") }}
      </h3>
      <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <a
          v-for="repo in extraRepos"
          :key="repo.name"
          :href="repo.htmlUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group hover:bg-sidebar/60 border-border/70 flex flex-col justify-between gap-2 rounded-lg border p-3 transition-colors"
        >
          <div class="space-y-1">
            <div class="flex items-center justify-between gap-2">
              <span class="text-foreground group-hover:text-brand truncate text-xs font-semibold transition-colors">
                {{ repo.name }}
              </span>
              <ArrowUpRight
                :size="13"
                class="text-muted-foreground group-hover:text-brand shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
            <p
              v-if="repo.description"
              class="text-muted-foreground line-clamp-2 text-[11px] leading-relaxed"
            >
              {{ repo.description }}
            </p>
          </div>
          <div class="text-muted-foreground/80 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px]">
            <span v-if="repo.language">{{ repo.language }}</span>
            <span
              v-if="repo.stars > 0"
              class="inline-flex items-center gap-0.5"
            >
              <Star
                :size="10"
                class="text-brand"
              />
              {{ repo.stars }}
            </span>
            <span>{{ formatMonthYear(repo.pushedAt) }}</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
