<script lang="ts" setup>
import { useTranslations, type ui } from "@/i18n/ui";
import { useResume } from "@/composables/resume";
import { computed, ref, nextTick } from "vue";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), { lang: "en" });
const t = useTranslations(props.lang);
const resume = useResume(props.lang);

const expandedWorkName = ref<string | null>(null);

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

    // Aggregate skills
    if (job.skills) {
      job.skills.forEach((s: string) => group.allSkills.add(s));
    }

    // Update range: earliest start, latest end
    if (new Date(job.startDate) < new Date(group.startDate)) {
      group.startDate = job.startDate;
    }

    // If any role has no end date, the whole group is "Present"
    if (!job.endDate) {
      group.endDate = "";
    } else if (group.endDate && new Date(job.endDate) > new Date(group.endDate)) {
      group.endDate = job.endDate;
    }
  });

  return Array.from(groups.values()).map((g) => ({
    ...g,
    allSkills: Array.from(g.allSkills),
    primaryPosition: g.roles[0].position,
    primarySummary: g.roles[0].summary,
  }));
});

const workList = computed(() => {
  const list = [...groupedWork.value];
  if (expandedWorkName.value) {
    const index = list.findIndex((w) => w.name === expandedWorkName.value);
    if (index > -1) {
      const [item] = list.splice(index, 1);
      return [item, ...list];
    }
  }
  return list;
});

const toggleExpand = async (name: string) => {
  if (expandedWorkName.value === name) {
    expandedWorkName.value = null;
  } else {
    expandedWorkName.value = name;
    await nextTick();

    const element = document.getElementById(`work-${name}`);
    if (element) {
      const offset = 100; // Cushion offset from top
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }
};

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
    class="cursor-default overflow-hidden py-20 sm:py-28"
    style="background-color: var(--section-alt-bg)"
    @click="expandedWorkName = null"
  >
    <div class="mx-auto max-w-6xl px-6">
      <!-- Section Header -->
      <div class="mb-10 flex items-end justify-between">
        <div>
          <span class="text-muted-foreground text-xs font-semibold tracking-widest uppercase">{{
            t("experience.label")
          }}</span>
          <h2 class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {{ t("experience.heading") }}
          </h2>
        </div>
      </div>

      <!-- Experience Cards -->
      <transition-group
        name="work-list"
        tag="div"
        class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="work in workList"
          :id="`work-${work.name}`"
          :key="work.name"
          class="group glass-card card-hover relative flex h-fit cursor-pointer flex-col gap-4 rounded-2xl p-6 transition-all duration-700 ease-in-out"
          :class="{
            'border-emerald-500/30 shadow-xl ring-1 shadow-emerald-500/5 ring-emerald-500/20 md:col-span-2 lg:col-span-3':
              expandedWorkName === work.name,
            'scale-[0.98] opacity-60 blur-[1px] grayscale-[0.5]':
              expandedWorkName && expandedWorkName !== work.name,
          }"
          @click.stop="toggleExpand(work.name)"
        >
          <div
            :class="{
              'grid grid-cols-1 gap-8 lg:grid-cols-3': expandedWorkName === work.name,
            }"
          >
            <!-- Left Side / Top Area -->
            <div :class="{ 'lg:col-span-1': expandedWorkName === work.name }">
              <!-- Company Header -->
              <div class="flex items-start justify-between gap-3">
                <div class="flex-1">
                  <a
                    :href="work.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-foreground text-xl font-bold transition-colors group-hover:text-emerald-500 sm:text-2xl"
                    @click.stop
                  >
                    {{ work.name }}
                  </a>
                  <p class="text-muted-foreground mt-1 text-sm">
                    {{ formatDate(work.startDate) }} —
                    {{ work.endDate ? formatDate(work.endDate) : t("experience.present") }}
                  </p>
                </div>
                <!-- Arrow icon -->
                <div
                  class="bg-accent transform rounded-lg p-2 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  @click.stop
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

              <!-- Role Badge (Primary/Latest) -->
              <div class="mt-4 flex flex-col gap-2">
                <span
                  v-for="(role, idx) in work.roles"
                  v-show="expandedWorkName === work.name || idx === 0"
                  :key="idx"
                  class="inline-flex w-fit items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500"
                >
                  {{ role.position }}
                </span>
              </div>

              <!-- Primary Summary -->
              <p
                class="text-muted-foreground mt-4 text-sm leading-relaxed transition-all duration-300"
                :class="{ 'line-clamp-3': expandedWorkName !== work.name }"
              >
                {{ work.primarySummary }}
              </p>

              <!-- Read More Button -->
              <button
                class="mt-4 flex w-fit cursor-pointer items-center gap-1 text-xs font-semibold text-emerald-500 transition-colors hover:text-emerald-400"
                @click="toggleExpand(work.name)"
              >
                {{
                  expandedWorkName === work.name
                    ? t("experience.readLess")
                    : t("experience.readMore")
                }}
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
                  class="transition-transform duration-300"
                  :class="{ 'rotate-180': expandedWorkName === work.name }"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>

            <!-- Right Side (Timeline View when expanded) -->
            <div
              v-if="expandedWorkName === work.name"
              class="animate-fade-in-up border-border flex flex-col gap-10 md:border-l md:pl-6 lg:col-span-2"
            >
              <!-- Roles Timeline -->
              <div class="flex flex-col gap-10">
                <div
                  v-for="(role, idx) in work.roles"
                  :key="idx"
                  class="relative pl-8"
                >
                  <!-- Timeline Line -->
                  <div
                    v-if="idx !== work.roles.length - 1"
                    class="bg-border absolute top-6 bottom-[-2.5rem] left-3 w-[1px]"
                  />
                  <!-- Timeline Dot -->
                  <div
                    class="bg-background absolute top-1.5 left-0 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-emerald-500"
                  >
                    <div class="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>

                  <div class="flex flex-col gap-4">
                    <div>
                      <h4 class="text-foreground text-lg font-bold">
                        {{ role.position }}
                      </h4>
                      <p class="text-xs font-medium tracking-wider text-emerald-500 uppercase">
                        {{ formatDate(role.startDate) }} —
                        {{ role.endDate ? formatDate(role.endDate) : t("experience.present") }}
                      </p>
                    </div>

                    <p class="text-muted-foreground text-sm leading-relaxed">
                      {{ role.summary }}
                    </p>

                    <ul
                      v-if="role.highlights?.length"
                      class="flex flex-col gap-2"
                    >
                      <li
                        v-for="highlight in role.highlights"
                        :key="highlight"
                        class="text-muted-foreground group/item flex gap-3 text-sm leading-relaxed"
                      >
                        <span
                          class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/40 text-emerald-500 transition-colors group-hover/item:bg-emerald-500"
                        />
                        {{ highlight }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Collective Skills -->
              <div>
                <h4 class="text-muted-foreground mb-4 text-xs font-bold tracking-widest uppercase">
                  {{ t("experience.techStack") }}
                </h4>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="skill in work.allSkills"
                    :key="skill"
                    class="border-border bg-accent/30 text-muted-foreground cursor-default rounded-lg border px-2.5 py-1 text-[10px] font-bold transition-all hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-500"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<style scoped>
.work-list-move {
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.4s ease-out forwards;
}
</style>
