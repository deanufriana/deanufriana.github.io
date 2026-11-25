import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { ui } from "../src/i18n/ui.ts";
import { calculateYearsOfExperience, groupWorkByCompany } from "../src/lib/resume.ts";

test("i18n en and id dictionaries have identical keys", () => {
  const enKeys = Object.keys(ui.en).sort();
  const idKeys = Object.keys(ui.id).sort();
  assert.deepEqual(idKeys, enKeys);
});

test("en and id resume JSONs have matching work and project counts", () => {
  const en = JSON.parse(readFileSync(new URL("../src/data/resume/en.json", import.meta.url), "utf8"));
  const id = JSON.parse(readFileSync(new URL("../src/data/resume/id.json", import.meta.url), "utf8"));

  assert.equal(en.work.length, id.work.length);
  assert.equal(en.projects.length, id.projects.length);
  assert.ok(en.work.every((job) => !Number.isNaN(Date.parse(job.startDate))));
});

test("calculateYearsOfExperience returns non-negative integer years", () => {
  const en = JSON.parse(readFileSync(new URL("../src/data/resume/en.json", import.meta.url), "utf8"));
  const years = calculateYearsOfExperience(en.work);

  assert.equal(calculateYearsOfExperience([]), 0);
  assert.ok(Number.isInteger(years));
  assert.ok(years >= 1);
});

test("groupWorkByCompany groups roles by company and aggregates skills", () => {
  const grouped = groupWorkByCompany([
    {
      name: "Acme Corp",
      position: "Senior Engineer",
      startDate: "2023-01-01",
      endDate: null,
      summary: "Leading frontend",
      highlights: ["Shipped v2"],
      skills: ["Vue", "TypeScript"],
    },
    {
      name: "Acme Corp",
      position: "Engineer",
      startDate: "2021-06-01",
      endDate: "2022-12-31",
      summary: "Built core UI",
      highlights: [],
      skills: ["TypeScript", "Astro"],
    },
  ]);

  assert.equal(grouped.length, 1);
  assert.equal(grouped[0].roles.length, 2);
  assert.equal(grouped[0].startDate, "2021-06-01");
  assert.equal(grouped[0].endDate, "");
  assert.equal(grouped[0].hasHighlights, true);
  assert.deepEqual(grouped[0].allSkills, ["Vue", "TypeScript", "Astro"]);
});
