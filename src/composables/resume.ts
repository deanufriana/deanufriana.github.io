import resumeId from "@/data/resume.id.json";
import resumeEn from "@/data/resume.json";
import { type ui } from "@/i18n/ui";
import { computed, type MaybeRefOrGetter, toValue } from "vue";

export function useResume(lang: MaybeRefOrGetter<keyof typeof ui>) {
  const resume = computed(() => {
    return toValue(lang) === "id" ? resumeId : resumeEn;
  });

  const yearsOfExperience = computed(() => {
    const currentYear = new Date().getFullYear();
    const workHistory = resume.value.work;
    if (workHistory.length === 0) return 0;

    const firstJob = new Date(workHistory[workHistory.length - 1].startDate).getFullYear();
    return currentYear - firstJob;
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
