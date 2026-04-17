<script lang="ts" setup>
import { useTranslations, type ui } from "@/i18n/ui";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), { lang: "en" });
const t = useTranslations(props.lang);

const services = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    titleKey: 'services.1.title' as const,
    descKey: 'services.1.desc' as const,
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    titleKey: 'services.2.title' as const,
    descKey: 'services.2.desc' as const,
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-500"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    titleKey: 'services.3.title' as const,
    descKey: 'services.3.desc' as const,
  }
];
</script>

<template>
  <section id="services" class="py-20 sm:py-28">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Section Header -->
      <div class="flex items-end justify-between mb-10">
        <div>
          <span class="text-xs font-semibold text-muted-foreground tracking-widest uppercase">{{ t('services.label') }}</span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-2">{{ t('services.heading') }}</h2>
        </div>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="group relative rounded-2xl bg-card border border-border p-8 card-hover flex flex-col gap-4"
          :style="{ animationDelay: `${(index + 1) * 0.1}s` }"
        >
          <!-- Icon -->
          <div class="p-4 rounded-2xl bg-accent w-fit mb-2" v-html="service.icon"></div>

          <!-- Service Title -->
          <h3 class="text-xl font-bold text-foreground">
            {{ t(service.titleKey) }}
          </h3>

          <!-- Description -->
          <p class="text-sm text-muted-foreground leading-relaxed">
            {{ t(service.descKey) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
