import resumeId from "@/data/resume.id.json";
import resumeEn from "@/data/resume.json";
import { type ui } from "@/i18n/ui";
import { computed, type MaybeRefOrGetter, toValue } from "vue";

export function useResume(lang: MaybeRefOrGetter<keyof typeof ui>) {
  return computed(() => {
    return toValue(lang) === "id" ? resumeId : resumeEn;
  });
}
