<script lang="ts" setup>
import { useResume } from "@/composables/resume";
import { useTranslations, type ui } from "@/i18n/ui";
import { ArrowUpRight, ChevronDown } from "lucide-vue-next";
import { computed, ref } from "vue";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), { lang: "en" });
const t = useTranslations(props.lang);
const { resume } = useResume(props.lang);

const expandedCompanies = ref<Record<string, boolean>>({});

const toggleCompany = (name: string) => {
  expandedCompanies.value[name] = !expandedCompanies.value[name];
};

const groupedWork = computed(() => {
  const groups = new Map();
  resume.value.work.forEach((job) => {
    if (!groups.has(job.name)) {
      groups.set(job.name, {
        name: job.name,
        url: job.url,
        roles: [],
        startDate: job.startDate,
        endDate: job.endDate,
        allSkills: new Set<string>(),
      });
    }
    const group = groups.get(job.name);
    group.roles.push(job);

    if (job.skills) {
      job.skills.forEach((s: string) => group.allSkills.add(s));
    }

    if (new Date(job.startDate) < new Date(group.startDate)) {
      group.startDate = job.startDate;
    }

    if (!job.endDate) {
      group.endDate = "";
    } else if (group.endDate && new Date(job.endDate) > new Date(group.endDate)) {
      group.endDate = job.endDate;
    }
  });

  return Array.from(groups.values()).map((g) => ({
    ...g,
    allSkills: Array.from(g.allSkills),
    hasHighlights: g.roles.some((r: { highlights?: string[] }) => r.highlights?.length),
  }));
});

if (groupedWork.value.length > 0) {
  expandedCompanies.value[groupedWork.value[0].name] = true;
}

const formatDate = (date: string | undefined | null) => {
  if (!date) return t("experience.present");
  return new Date(date).toLocaleDateString(props.lang === "id" ? "id-ID" : "en-US", {
    year: "numeric",
    month: "short",
  });
};
</script>

<template>
  <section
    id="experience"
    class="animate-fade-in-up enter-delay-1 border-border border-t pt-8"
  >
    <h2 class="text-muted-foreground mb-6 text-xs font-semibold tracking-wider uppercase">
      {{ t("experience.title") }}
    </h2>

    <div class="flex flex-col gap-8">
      <article
        v-for="work in groupedWork"
        :key="work.name"
        class="flex flex-col gap-2.5"
      >
        <!-- Company Header -->
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <a
            v-if="work.url"
            :href="work.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group/link text-foreground hover:text-brand inline-flex items-center gap-1.5 text-lg font-bold transition-colors"
          >
            {{ work.name }}
            <ArrowUpRight
              :size="14"
              class="text-muted-foreground transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </a>
          <h3
            v-else
            class="text-foreground text-lg font-bold"
          >
            {{ work.name }}
          </h3>

          <span
            v-if="work.roles.length === 1"
            class="text-muted-foreground text-xs font-medium"
          >
            {{ formatDate(work.startDate) }} -
            {{ work.endDate ? formatDate(work.endDate) : t("experience.present") }}
          </span>
        </div>

        <!-- Role(s) & Summary -->
        <div
          v-if="work.roles.length === 1"
          class="flex flex-col gap-1.5"
        >
          <p class="text-foreground text-sm font-semibold">
            {{ work.roles[0].position }}
          </p>
          <p class="text-muted-foreground text-sm leading-relaxed">
            {{ work.roles[0].summary }}
          </p>
        </div>

        <div
          v-else
          class="border-border flex flex-col gap-3 border-l-2 pl-4"
        >
          <div
            v-for="(role, idx) in work.roles"
            :key="idx"
            class="flex flex-col gap-1"
          >
            <div class="flex flex-wrap items-baseline justify-between gap-2">
              <p class="text-foreground text-sm font-semibold">
                {{ role.position }}
              </p>
              <span class="text-muted-foreground text-xs font-medium">
                {{ formatDate(role.startDate) }} -
                {{ role.endDate ? formatDate(role.endDate) : t("experience.present") }}
              </span>
            </div>
            <p class="text-muted-foreground text-sm leading-relaxed">
              {{ role.summary }}
            </p>
          </div>
        </div>

        <!-- Smooth Accordion for Detailed Highlights -->
        <div
          v-if="work.hasHighlights"
          class="grid transition-[grid-template-rows] duration-300 ease-out"
          :class="expandedCompanies[work.name] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        >
          <div class="overflow-hidden">
            <div class="flex flex-col gap-4 pt-2 pb-1">
              <div
                v-for="(role, idx) in work.roles"
                :key="idx"
                class="flex flex-col gap-2"
              >
                <div
                  v-if="work.roles.length > 1"
                  class="flex flex-wrap items-baseline justify-between gap-2"
                >
                  <h4 class="text-foreground text-xs font-semibold">
                    {{ role.position }}
                  </h4>
                  <span class="text-muted-foreground text-xs">
                    {{ formatDate(role.startDate) }} -
                    {{ role.endDate ? formatDate(role.endDate) : t("experience.present") }}
                  </span>
                </div>

                <ul
                  v-if="role.highlights?.length"
                  class="flex flex-col gap-1.5"
                >
                  <li
                    v-for="highlight in role.highlights"
                    :key="highlight"
                    class="text-foreground/85 flex gap-2.5 text-sm leading-relaxed"
                  >
                    <span
                      class="bg-brand mt-2 h-1 w-1 shrink-0 rounded-full"
                      aria-hidden="true"
                    />
                    <span>{{ highlight }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Row: Skills + Toggle -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-0.5">
          <p class="text-muted-foreground text-xs">
            {{ work.allSkills.join(" · ") }}
          </p>

          <button
            v-if="work.hasHighlights"
            type="button"
            :aria-expanded="!!expandedCompanies[work.name]"
            class="text-brand inline-flex min-h-9 cursor-pointer items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-80 print:hidden"
            @click="toggleCompany(work.name)"
          >
            <span>{{
              expandedCompanies[work.name] ? t("experience.hideDetails") : t("experience.details")
            }}</span>
            <ChevronDown
              :size="14"
              class="transition-transform duration-200"
              :class="{ 'rotate-180': expandedCompanies[work.name] }"
            />
          </button>
        </div>
      </article>
    </div>
  </section>
</template>
