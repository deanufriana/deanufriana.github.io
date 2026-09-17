import { z } from "astro/zod";

export const ProfileSchema = z.object({
  network: z.string(),
  username: z.string(),
  url: z.string(),
});

export const LocationSchema = z
  .object({
    address: z.string().optional(),
    postalCode: z.string().optional(),
    city: z.string().optional(),
    countryCode: z.string().optional(),
    region: z.string().optional(),
  })
  .optional();

export const BasicsSchema = z.object({
  name: z.string(),
  label: z.string(),
  image: z.string().optional(),
  email: z.string(),
  phone: z.string().optional(),
  url: z.string().optional(),
  summary: z.string().optional(),
  location: LocationSchema,
  profiles: z.array(ProfileSchema).default([]),
});

export const WorkSchema = z.object({
  name: z.string(),
  position: z.string(),
  url: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional().nullable(),
  summary: z.string(),
  highlights: z.array(z.string()).default([]),
  skills: z.array(z.string()).optional(),
});

export const EducationSchema = z.object({
  institution: z.string(),
  url: z.string().optional(),
  area: z.string().optional(),
  studyType: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  score: z.string().optional(),
  courses: z.array(z.string()).default([]),
});

export const SkillSchema = z.object({
  name: z.string(),
  level: z.string().optional(),
  keywords: z.array(z.string()).default([]),
});

export const CertificateSchema = z.object({
  name: z.string(),
  date: z.string().optional(),
  issuer: z.string().optional(),
  url: z.string().optional(),
});

export const LanguageSchema = z.object({
  language: z.string(),
  fluency: z.string().optional(),
});

export const ProjectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  highlights: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  startDate: z.string().optional(),
  endDate: z.string().optional().nullable(),
  url: z.string(),
});

export const ResumeSchema = z.object({
  basics: BasicsSchema,
  work: z.array(WorkSchema).default([]),
  education: z.array(EducationSchema).default([]),
  skills: z.array(SkillSchema).default([]),
  volunteer: z.array(z.any()).default([]),
  awards: z.array(z.any()).default([]),
  certificates: z.array(CertificateSchema).default([]),
  publications: z.array(z.any()).default([]),
  languages: z.array(LanguageSchema).default([]),
  interests: z.array(z.any()).default([]),
  references: z.array(z.any()).default([]),
  projects: z.array(ProjectSchema).default([]),
  meta: z.record(z.string(), z.any()).optional(),
});

export type Resume = z.infer<typeof ResumeSchema>;
export type Work = z.infer<typeof WorkSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Basics = z.infer<typeof BasicsSchema>;
