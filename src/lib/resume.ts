import type { Work } from "@/schemas/resume";

export interface GroupedCompany {
  name: string;
  url?: string;
  roles: Work[];
  startDate: string;
  endDate?: string | null;
  allSkills: string[];
  hasHighlights: boolean;
}

interface CompanyAccumulator {
  name: string;
  url?: string;
  roles: Work[];
  startDate: string;
  endDate?: string | null;
  allSkills: Set<string>;
}

export function calculateYearsOfExperience(workHistory: Work[]): number {
  if (workHistory.length === 0) return 0;

  const now = new Date();
  const startDates = workHistory.map((w) => new Date(w.startDate).getTime());
  const earliestDate = new Date(Math.min(...startDates));
  const months =
    (now.getFullYear() - earliestDate.getFullYear()) * 12 +
    (now.getMonth() - earliestDate.getMonth());
  return Math.max(0, Math.floor(months / 12));
}

export function groupWorkByCompany(workHistory: Work[]): GroupedCompany[] {
  const groups = new Map<string, CompanyAccumulator>();

  for (const job of workHistory) {
    let group = groups.get(job.name);
    if (!group) {
      group = {
        name: job.name,
        url: job.url,
        roles: [],
        startDate: job.startDate,
        endDate: job.endDate,
        allSkills: new Set<string>(),
      };
      groups.set(job.name, group);
    }

    group.roles.push(job);

    if (job.skills) {
      for (const skill of job.skills) {
        group.allSkills.add(skill);
      }
    }

    if (new Date(job.startDate) < new Date(group.startDate)) {
      group.startDate = job.startDate;
    }

    if (!job.endDate) {
      group.endDate = "";
    } else if (group.endDate && new Date(job.endDate) > new Date(group.endDate)) {
      group.endDate = job.endDate;
    }
  }

  return Array.from(groups.values()).map((g) => ({
    name: g.name,
    url: g.url,
    roles: g.roles,
    startDate: g.startDate,
    endDate: g.endDate,
    allSkills: Array.from(g.allSkills),
    hasHighlights: g.roles.some((r) => r.highlights.length > 0),
  }));
}
