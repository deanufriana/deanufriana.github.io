<script lang="ts" setup>
import { useResume } from "@/composables/resume";
import { useTranslations, type ui } from "@/i18n/ui";
import { computed } from "vue";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), { lang: "en" });
const t = useTranslations(props.lang);
const { resume, yearsOfExperience } = useResume(props.lang);

const currentRole = computed(() => resume.value.work[0]);
</script>

<template>
  <section
    id="overview"
    class="animate-fade-in-up space-y-6"
  >
    <!-- Key Facts (open, cardless) -->
    <dl class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div v-if="currentRole">
        <dt class="text-muted-foreground text-xs font-medium">
          {{ t("overview.current") }}
        </dt>
        <dd class="text-foreground mt-0.5 text-sm font-semibold">
          {{ currentRole.position }} @ {{ currentRole.name }}
        </dd>
      </div>
      <div>
        <dt class="text-muted-foreground text-xs font-medium">
          {{ t("overview.experience") }}
        </dt>
        <dd class="text-foreground mt-0.5 text-sm font-semibold">
          {{ yearsOfExperience }}+ {{ t("overview.yearsSuffix") }}
        </dd>
      </div>
      <div>
        <dt class="text-muted-foreground text-xs font-medium">
          {{ t("overview.location") }}
        </dt>
        <dd class="text-foreground mt-0.5 text-sm font-semibold">
          {{ resume.basics.location?.city }}, {{ resume.basics.location?.region }}
        </dd>
      </div>
    </dl>

    <!-- Core Stack (open 2-col list, cardless) -->
    <div class="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
      <div
        v-for="group in resume.skills"
        :key="group.name"
      >
        <p class="text-foreground text-xs font-semibold">
          {{ group.name }}
        </p>
        <p class="text-muted-foreground mt-0.5 text-xs leading-relaxed">
          {{ group.keywords.join(" · ") }}
        </p>
      </div>
    </div>
  </section>
</template>
