<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import { useClipboard } from "@/composables/clipboard";
import { useResume } from "@/composables/resume";
import { useTranslations, type ui } from "@/i18n/ui";
import { useScrollReveal } from "@/composables/reveal";
import { Check, Copy, Mail } from "lucide-vue-next";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), {
  lang: "en",
});
const t = useTranslations(props.lang);
const resume = useResume(props.lang);
const { copied, copyToClipboard } = useClipboard();

const { elementRef: sectionRef } = useScrollReveal();

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
    ref="sectionRef"
    class="reveal py-20 sm:py-28"
    style="background-color: var(--section-alt-bg)"
  >
    <div class="mx-auto max-w-4xl px-6 text-center">
      <h2 class="text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {{ t("cta.heading1") }}
        <span class="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">{{
          t("cta.heading2")
        }}</span>
      </h2>
      <p class="text-muted-foreground mx-auto mt-4 max-w-xl text-base sm:text-lg">
        {{ t("cta.desc") }}
      </p>

      <!-- CTA Buttons -->
      <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button
          as="a"
          :href="`mailto:${resume.basics.email}?subject=Free%20Consultation%20Inquiry`"
          variant="cta"
          size="pill"
          class="w-full sm:w-auto"
        >
          <Mail :size="16" />
          {{ t("hero.hire") }}
        </Button>
        <Button
          variant="cta-outline"
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
  </section>
</template>
