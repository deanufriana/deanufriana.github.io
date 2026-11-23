import resumeId from "@/data/resume/id.json";
import resumeEn from "@/data/resume/en.json";
import { type ui } from "@/i18n/ui";
import type { Resume } from "@/schemas/resume";
import { computed, type ComputedRef, type MaybeRefOrGetter, toValue } from "vue";

export function useResume(lang: MaybeRefOrGetter<keyof typeof ui>) {
  const resume: ComputedRef<Resume> = computed(() => {
    return (toValue(lang) === "id" ? resumeId : resumeEn) as Resume;
  });

  const yearsOfExperience = computed(() => {
    const workHistory = resume.value.work;
    if (workHistory.length === 0) return 0;

    const now = new Date();
    const startDates = workHistory.map((w) => new Date(w.startDate).getTime());
    const earliestDate = new Date(Math.min(...startDates));
    const months =
      (now.getFullYear() - earliestDate.getFullYear()) * 12 +
      (now.getMonth() - earliestDate.getMonth());
    return Math.max(0, Math.floor(months / 12));
  });

  return {
    resume,
    yearsOfExperience,
  };
}
