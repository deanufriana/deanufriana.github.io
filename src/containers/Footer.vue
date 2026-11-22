<script lang="ts" setup>
import { useResume } from "@/composables/resume";
import { useTranslations, type ui } from "@/i18n/ui";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), { lang: "en" });
const t = useTranslations(props.lang);
const { resume } = useResume(props.lang);

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="pt-4 pb-2">
    <div class="flex flex-col items-start justify-between gap-2 text-xs sm:flex-row sm:items-center">
      <p class="text-muted-foreground">
        © {{ currentYear }} {{ resume.basics.name }}
      </p>
      <p class="text-muted-foreground/70">
        {{ t("footer.builtWith") }}
      </p>
    </div>
  </footer>
</template>
