<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import { useClipboard } from "@/composables/clipboard";
import { useResume } from "@/composables/resume";
import { useTypewriter } from "@/composables/string";
import { useTranslations, type ui } from "@/i18n/ui";
import { Check, Copy, Mail } from "lucide-vue-next";
import { computed } from "vue";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), {
  lang: "en",
});
const t = useTranslations(props.lang);
const resume = useResume(props.lang);
const { copied, copyToClipboard } = useClipboard();

const texts = computed(() => {
  const positions = new Set(resume.value.work.map((job) => job.position));
  return Array.from(positions);
});

const { typedText } = useTypewriter(texts.value, {
  typingSpeed: 100,
  deletingSpeed: 50,
  pauseDuration: 2000,
  startDelay: 500,
});

const yearExperience = computed(() => {
  const getYear = new Date().getFullYear();
  const firstJob = new Date(
    resume.value.work[resume.value.work.length - 1].startDate,
  ).getFullYear();
  return getYear - firstJob;
});

const copyEmail = async () => {
  const success = await copyToClipboard(resume.value.basics.email);
  if (success) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "copy_email",
      email: resume.value.basics.email,
    });
  }
};
</script>

<template>
  <section
    id="home"
    class="relative flex min-h-screen items-center justify-center overflow-hidden"
  >
    <!-- Subtle background gradient -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
      <div class="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
    </div>

    <div class="relative z-10 mx-auto max-w-6xl px-6">
      <div class="flex flex-col gap-6 md:gap-8">
        <div class="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <!-- Role Label -->
          <div
            class="animate-fade-in-up opacity-0"
            style="animation-delay: 0.2s; animation-fill-mode: forwards"
          >
            <span
              class="text-muted-foreground text-center text-sm font-medium tracking-widest uppercase md:text-left md:text-base"
            >{{ resume.basics.label }}</span>
          </div>
          <!-- Available for Work Badge -->
          <div
            class="animate-fade-in-up opacity-0"
            style="animation-delay: 0.1s; animation-fill-mode: forwards"
          >
            <div
              class="badge-pulse inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 backdrop-blur-md"
            >
              <span
                class="h-2 w-2 animate-pulse rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"
              />
              <span
                class="text-xs font-semibold tracking-wider text-emerald-500 uppercase md:text-sm"
              >{{ t("hero.badge") }}
              </span>
            </div>
          </div>
        </div>

        <!-- Main Heading -->
        <div
          class="animate-fade-in-up opacity-0"
          style="animation-delay: 0.3s; animation-fill-mode: forwards"
        >
          <h1
            class="text-center text-4xl leading-tight font-bold tracking-tight sm:text-6xl md:text-left lg:text-7xl"
          >
            I'm
            <span
              class="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 bg-clip-text text-transparent"
            >{{ resume.basics.name }}</span>
          </h1>
        </div>

        <!-- Subtitle with typewriter -->
        <div
          class="animate-fade-in-up max-w-2xl opacity-0"
          style="animation-delay: 0.4s; animation-fill-mode: forwards"
        >
          <div
            class="text-muted-foreground text-center text-base leading-relaxed sm:text-lg md:text-left"
          >
            <span class="block md:inline">
              {{ t("hero.intro") }}
              <span class="text-foreground font-semibold">{{ yearExperience }}+</span>
              {{ t("hero.suffix") }}
            </span>
            <div
              class="text-foreground typewriter block min-h-[3.5rem] font-semibold md:ml-1.5 md:inline md:min-h-0"
            >
              {{ typedText }}
            </div>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div
          class="animate-fade-in-up mt-4 flex flex-col items-center gap-4 opacity-0 sm:flex-row sm:justify-center md:justify-start"
          style="animation-delay: 0.5s; animation-fill-mode: forwards"
        >
          <Button
            as="a"
            :href="`mailto:${resume.basics.email}?subject=Free%20Consultation%20Inquiry`"
            variant="cta"
            size="pill"
            class="w-full sm:w-auto"
          >
            <Mail
              :size="16"
              :stroke-width="2.5"
            />
            {{ t("hero.hire") }}
          </Button>
          <Button
            variant="glass"
            size="pill"
            class="w-full sm:w-auto"
            @click="copyEmail"
          >
            <Copy
              v-if="!copied"
              :size="16"
            />
            <Check
              v-else
              :size="16"
            />
            {{ copied ? t("hero.copied") : t("hero.copyEmail") }}
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
