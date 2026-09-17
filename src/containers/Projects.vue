<script lang="ts" setup>
import { Badge } from "@/components/ui/badge";
import { useResume } from "@/composables/resume";
import { useTranslations, type ui } from "@/i18n/ui";
import { ArrowUpRight, Link } from "lucide-vue-next";
import { computed, ref } from "vue";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), { lang: "en" });
const t = useTranslations(props.lang);

const { resume } = useResume(props.lang);

const selectedTag = ref<string>("all");

// Extract unique keywords from projects
const allTags = computed(() => {
  const tags = new Set<string>();
  resume.value.projects.forEach((p) => {
    p.keywords?.forEach((k) => tags.add(k));
  });
  return Array.from(tags);
});

const filteredProjects = computed(() => {
  if (selectedTag.value === "all") {
    return resume.value.projects;
  }
  return resume.value.projects.filter((p) => p.keywords?.includes(selectedTag.value));
});

const getProjectYear = (dateStr?: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).getFullYear();
};
</script>

<template>
  <section
    id="projects"
    class="reveal py-20 sm:py-28"
  >
    <div class="mx-auto max-w-6xl px-6">
      <!-- Section Header -->
      <div class="mb-8 flex items-end justify-between">
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

      <!-- Tech Filter Pills -->
      <div class="mb-8 flex flex-wrap items-center gap-2">
        <button
          type="button"
          class="cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200"
          :class="
            selectedTag === 'all'
              ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
              : 'border-border bg-card/60 text-muted-foreground hover:text-foreground border hover:border-emerald-500/40'
          "
          @click="selectedTag = 'all'"
        >
          {{ props.lang === "id" ? "Semua" : "All" }}
        </button>
        <button
          v-for="tag in allTags"
          :key="tag"
          type="button"
          class="cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200"
          :class="
            selectedTag === tag
              ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
              : 'border-border bg-card/60 text-muted-foreground hover:text-foreground border hover:border-emerald-500/40'
          "
          @click="selectedTag = tag"
        >
          {{ tag }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.name"
          class="group glass-card card-hover relative flex flex-col gap-4 rounded-2xl p-6 transition-all duration-300"
          :class="`stagger-${(index % 6) + 1}`"
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
            <div class="flex-1">
              <h3
                class="text-foreground text-xl font-bold transition-colors group-hover:text-emerald-500"
              >
                {{ project.name }}
              </h3>
              <div class="mt-1.5 flex items-center gap-2">
                <Badge
                  variant="emerald"
                  class="rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase"
                >
                  {{ t("projects.openSource") }}
                </Badge>
                <span
                  v-if="project.startDate"
                  class="text-muted-foreground text-[10px] font-medium tracking-wider uppercase"
                >
                  {{ getProjectYear(project.startDate) }}
                </span>
              </div>
            </div>
            <!-- Arrow icon -->
            <div
              class="bg-accent transform rounded-lg p-2 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
            >
              <ArrowUpRight :size="14" />
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

          <!-- Tech Stack Tags -->
          <div
            v-if="project.keywords && project.keywords.length"
            class="mt-2 flex flex-wrap gap-1.5"
          >
            <span
              v-for="tech in project.keywords"
              :key="tech"
              class="text-muted-foreground bg-foreground/5 rounded-md px-2 py-0.5 text-[10px] font-medium"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Link label -->
          <div class="text-muted-foreground mt-auto flex items-center gap-2 pt-2 text-xs">
            <Link :size="12" />
            <span class="transition-colors group-hover:text-emerald-500">{{
              project.url.replace("https://", "").replace("http://", "")
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
