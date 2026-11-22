import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { ui } from "../src/i18n/ui.ts";

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
