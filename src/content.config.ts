import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { ResumeSchema } from "./schemas/resume";

const resume = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/data/resume" }),
  schema: ResumeSchema,
});

export const collections = { resume };
