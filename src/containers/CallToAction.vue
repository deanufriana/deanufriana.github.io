<script lang="ts" setup>
import resumeEn from "@/data/resume.json";
import resumeId from "@/data/resume.id.json";
import { useTranslations, type ui } from "@/i18n/ui";
import { computed, ref } from "vue";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), { lang: "en" });
const t = useTranslations(props.lang);

const resume = computed(() => props.lang === 'id' ? resumeId : resumeEn);
const copied = ref(false);

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(resume.value.basics.email);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy email:", err);
  }
};
</script>

<template>
  <section class="py-20 sm:py-28" style="background-color: var(--section-alt-bg);">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
        {{ t('cta.heading1') }} <span class="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">{{ t('cta.heading2') }}</span>
      </h2>
      <p class="text-base sm:text-lg text-muted-foreground mt-4 max-w-xl mx-auto">
        {{ t('cta.desc') }}
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-wrap items-center justify-center gap-4 mt-8">
        <a
          :href="`mailto:${resume.basics.email}?subject=Free%20Consultation%20Inquiry`"
          class="inline-flex items-center gap-2 px-7 py-3 bg-foreground text-background text-sm font-semibold rounded-full hover:opacity-90 transition-all hover:scale-105 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          {{ t('hero.hire') }}
        </a>
        <button
          @click="copyEmail"
          class="inline-flex items-center gap-2 px-7 py-3 border border-border text-sm font-semibold rounded-full hover:bg-accent transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          {{ copied ? t('hero.copied') : t('hero.copyEmail') }}
        </button>
      </div>
    </div>
  </section>
</template>
