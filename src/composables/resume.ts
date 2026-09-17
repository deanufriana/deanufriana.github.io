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
    const currentYear = new Date().getFullYear();
    const workHistory = resume.value.work;
    if (workHistory.length === 0) return 0;

    const startDates = workHistory.map((w) => new Date(w.startDate).getTime());
    const earliestDate = new Date(Math.min(...startDates));
    return currentYear - earliestDate.getFullYear();
  });

  const stats = computed(() => {
    const uniqueCompanies = new Set(resume.value.work.map((w) => w.name));

    return {
      years: yearsOfExperience.value,
      projects: resume.value.projects.length,
      companies: uniqueCompanies.size,
      skills: resume.value.skills.flatMap((s) => s.keywords).length,
    };
  });

  return {
    resume,
    yearsOfExperience,
    stats,
  };
}
