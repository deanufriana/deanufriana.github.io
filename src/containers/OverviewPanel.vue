<script lang="ts" setup>
import { useResume } from "@/composables/resume";
import { useTranslations, type ui } from "@/i18n/ui";
import type { GitHubLanguageShare, GitHubRepoMeta } from "@/lib/github";
import { GitBranch } from "lucide-vue-next";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    lang?: keyof typeof ui;
    latestPush?: GitHubRepoMeta | null;
    languages?: GitHubLanguageShare[];
  }>(),
  {
    lang: "en",
    latestPush: null,
    languages: () => [],
  },
);
const t = useTranslations(props.lang);
const { resume, yearsOfExperience } = useResume(props.lang);

const currentRole = computed(() => resume.value.work[0]);

const formatMonthYear = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString(props.lang === "id" ? "id-ID" : "en-US", {
    month: "short",
    year: "numeric",
  });
};
</script>

<template>
  <section
    id="overview"
    class="animate-editorial-in enter-delay-3 space-y-6"
  >
    <!-- Key Facts (open, cardless) -->
    <dl class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div v-if="currentRole">
        <dt class="text-muted-foreground text-xs font-medium">
          {{ t("overview.current") }}
        </dt>
        <dd class="text-foreground mt-0.5 text-sm font-semibold">
          {{ currentRole.position }} @ {{ currentRole.name }}
        </dd>
      </div>
      <div>
        <dt class="text-muted-foreground text-xs font-medium">
          {{ t("overview.experience") }}
        </dt>
        <dd class="text-foreground mt-0.5 text-sm font-semibold">
          {{ yearsOfExperience }}+ {{ t("overview.yearsSuffix") }}
        </dd>
      </div>
      <div>
        <dt class="text-muted-foreground text-xs font-medium">
          {{ t("overview.location") }}
        </dt>
        <dd class="text-foreground mt-0.5 text-sm font-semibold">
          {{ resume.basics.location?.city }}, {{ resume.basics.location?.region }}
        </dd>
      </div>
    </dl>

    <!-- Latest GitHub Activity Pulse -->
    <p
      v-if="latestPush"
      class="text-muted-foreground flex flex-wrap items-center gap-1.5 text-xs"
    >
      <GitBranch
        :size="12"
        class="text-brand shrink-0"
      />
      <span>{{ t("github.latestPush") }}:</span>
      <a
        :href="latestPush.htmlUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="text-foreground hover:text-brand font-medium transition-colors"
      >
        {{ latestPush.name }}
      </a>
      <span>· {{ formatMonthYear(latestPush.pushedAt) }}</span>
    </p>

    <!-- Core Stack (open 2-col list, cardless) -->
    <div class="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
      <div
        v-for="group in resume.skills"
        :key="group.name"
      >
        <p class="text-foreground text-xs font-semibold">
          {{ group.name }}
        </p>
        <p class="text-muted-foreground mt-0.5 text-xs leading-relaxed">
          {{ group.keywords.join(" · ") }}
        </p>
      </div>
    </div>

    <!-- Hairline GitHub Language Breakdown -->
    <div
      v-if="languages.length > 0"
      class="space-y-2 pt-1"
    >
      <p class="text-muted-foreground text-xs font-medium">
        {{ t("github.languages") }}
      </p>
      <div
        class="bg-muted flex h-1.5 w-full gap-0.5 overflow-hidden rounded-full"
        aria-hidden="true"
      >
        <span
          v-for="langItem in languages"
          :key="langItem.name"
          class="h-full"
          :style="{ width: `${langItem.percent}%`, backgroundColor: langItem.color }"
          :title="`${langItem.name} ${langItem.percent}%`"
        />
      </div>
      <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px]">
        <span
          v-for="langItem in languages"
          :key="langItem.name"
          class="text-muted-foreground inline-flex items-center gap-1.5"
        >
          <span
            class="h-2 w-2 rounded-full"
            :style="{ backgroundColor: langItem.color }"
            aria-hidden="true"
          />
          <span class="text-foreground font-medium">{{ langItem.name }}</span>
          <span>{{ langItem.percent }}%</span>
        </span>
      </div>
    </div>
  </section>
</template>
