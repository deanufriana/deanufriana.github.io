<script lang="ts" setup>
import resumeEn from "@/data/resume.json";
import resumeId from "@/data/resume.id.json";
import { useTranslations, type ui } from "@/i18n/ui";
import { useScrollReveal } from "@/composables/reveal";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Link } from "lucide-vue-next";
import { computed } from "vue";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), { lang: "en" });
const t = useTranslations(props.lang);

const resume = computed(() => (props.lang === "id" ? resumeId : resumeEn));

const { elementRef: sectionRef } = useScrollReveal();
</script>

<template>
  <section
    id="projects"
    ref="sectionRef"
    class="reveal py-20 sm:py-28"
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
          :aria-label="`View project: ${project.name}`"
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
                <Badge
                  variant="emerald"
                  class="rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase"
                >
                  {{ t("projects.openSource") }}
                </Badge>
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

          <!-- Link label -->
          <div class="text-muted-foreground mt-auto flex items-center gap-2 pt-2 text-xs">
            <Link :size="12" />
            <span class="transition-colors group-hover:text-emerald-500">{{
              project.url.replace("https://", "").replace("http://", "")
            }}</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
