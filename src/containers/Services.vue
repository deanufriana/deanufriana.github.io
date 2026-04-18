<script lang="ts" setup>
import { useTranslations, type ui } from "@/i18n/ui";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), { lang: "en" });
const t = useTranslations(props.lang);

const services = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    titleKey: "services.1.title" as const,
    descKey: "services.1.desc" as const,
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    titleKey: "services.2.title" as const,
    descKey: "services.2.desc" as const,
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-500"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    titleKey: "services.3.title" as const,
    descKey: "services.3.desc" as const,
  },
];
</script>

<template>
  <section
    id="services"
    class="py-20 sm:py-28"
  >
    <div class="mx-auto max-w-6xl px-6">
      <!-- Section Header -->
      <div class="mb-10 flex items-end justify-between">
        <div>
          <span class="text-muted-foreground text-xs font-semibold tracking-widest uppercase">{{
            t("services.label")
          }}</span>
          <h2 class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {{ t("services.heading") }}
          </h2>
        </div>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="group glass-card card-hover relative flex flex-col gap-4 rounded-2xl p-8"
          :style="{ animationDelay: `${(index + 1) * 0.1}s` }"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div
            class="bg-foreground/5 mb-2 w-fit rounded-2xl p-4 transition-transform duration-500 group-hover:scale-110"
            v-html="service.icon"
          />

          <!-- Service Title -->
          <h3 class="text-foreground text-xl font-bold">
            {{ t(service.titleKey) }}
          </h3>

          <!-- Description -->
          <p class="text-muted-foreground text-sm leading-relaxed">
            {{ t(service.descKey) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
