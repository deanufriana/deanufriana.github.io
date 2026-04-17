<script lang="ts" setup>
import resumeEn from "@/data/resume.json";
import resumeId from "@/data/resume.id.json";
import { useTranslations, type ui } from "@/i18n/ui";
import { computed, ref, nextTick } from "vue";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), { lang: "en" });
const t = useTranslations(props.lang);

const resume = computed(() => props.lang === 'id' ? resumeId : resumeEn);

const expandedWorkName = ref<string | null>(null);

const workList = computed(() => {
  const list = [...resume.value.work];
  if (expandedWorkName.value) {
    const index = list.findIndex(w => w.name === expandedWorkName.value);
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
    // Wait for the re-ordering to start/layout to shift slightly
    await nextTick();
    const section = document.getElementById("experience");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};

const formatDate = (date: string | undefined | null) => {
  if (!date) return t('experience.present');
  return new Date(date).toLocaleDateString(props.lang === 'id' ? "id-ID" : "en-US", {
    year: "numeric",
    month: "short",
  });
};
</script>

<template>
  <section 
    id="experience" 
    class="py-20 sm:py-28 overflow-hidden cursor-default" 
    style="background-color: var(--section-alt-bg);"
    @click="expandedWorkName = null"
  >
    <div class="max-w-6xl mx-auto px-6">
      <!-- Section Header -->
      <div class="flex items-end justify-between mb-10">
        <div>
          <span class="text-xs font-semibold text-muted-foreground tracking-widest uppercase">{{ t('experience.label') }}</span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-2">{{ t('experience.heading') }}</h2>
        </div>
      </div>

      <!-- Experience Cards -->
      <transition-group 
        name="work-list" 
        tag="div" 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="work in workList"
          :key="work.name"
          class="group relative rounded-2xl bg-card p-6 card-hover flex flex-col gap-4 h-fit transition-all duration-700 ease-in-out cursor-pointer"
          :class="{ 
            'md:col-span-2 lg:col-span-3 border-emerald-500/30 ring-1 ring-emerald-500/20 shadow-xl shadow-emerald-500/5': expandedWorkName === work.name,
            'opacity-60 scale-[0.98] blur-[1px] grayscale-[0.5]': expandedWorkName && expandedWorkName !== work.name
          }"
          @click.stop="toggleExpand(work.name)"
        >
          <div :class="{ 'grid grid-cols-1 lg:grid-cols-3 gap-8': expandedWorkName === work.name }">
            <!-- Left Side / Top Area -->
            <div :class="{ 'lg:col-span-1': expandedWorkName === work.name }">
              <!-- Company Header -->
              <div class="flex items-start justify-between gap-3">
                <div class="flex-1">
                  <a
                    :href="work.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-xl sm:text-2xl font-bold text-foreground group-hover:text-emerald-500 transition-colors"
                    @click.stop
                  >
                    {{ work.name }}
                  </a>
                  <p class="text-sm text-muted-foreground mt-1">
                    {{ formatDate(work.startDate) }} — {{ work.endDate ? formatDate(work.endDate) : t('experience.present') }}
                  </p>
                </div>
                <!-- Arrow icon -->
                <div 
                  class="p-2 rounded-lg bg-accent opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  @click.stop
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"/>
                    <polyline points="7 7 17 7 17 17"/>
                  </svg>
                </div>
              </div>

              <!-- Role Badge -->
              <div class="mt-4">
                <span class="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {{ work.position }}
                </span>
              </div>

              <!-- Summary -->
              <p 
                class="text-sm text-muted-foreground leading-relaxed mt-4 transition-all duration-300"
                :class="{ 'line-clamp-3': expandedWorkName !== work.name }"
              >
                {{ work.summary }}
              </p>

              <!-- Read More Button (Mobile and Closed State) -->
              <button
                v-if="work.highlights && work.highlights.length > 0"
                @click="toggleExpand(work.name)"
                class="text-xs font-semibold text-emerald-500 hover:text-emerald-400 transition-colors w-fit flex items-center gap-1 mt-4 cursor-pointer"
              >
                {{ expandedWorkName === work.name ? t('experience.readLess') : t('experience.readMore') }}
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
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>

            <!-- Right Side (Only when expanded) -->
            <div 
              v-if="expandedWorkName === work.name" 
              class="lg:col-span-2 flex flex-col gap-6 animate-fade-in-up md:pl-6 md:border-l border-border"
            >
              <div>
                <h4 class="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-4">Highlights</h4>
                <ul class="flex flex-col gap-3">
                  <li 
                    v-for="highlight in work.highlights" 
                    :key="highlight"
                    class="flex gap-3 text-sm text-muted-foreground leading-relaxed group/item"
                  >
                    <span class="text-emerald-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover/item:bg-emerald-500 shrink-0 transition-colors"></span>
                    {{ highlight }}
                  </li>
                </ul>
              </div>

              <!-- Skills Tags -->
              <div>
                <h4 class="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-4">Core Skills</h4>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="skill in work.skills"
                    :key="skill"
                    class="px-2.5 py-1 text-[10px] font-bold rounded-lg border border-border bg-accent/30 text-muted-foreground hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/30 transition-all cursor-default"
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
