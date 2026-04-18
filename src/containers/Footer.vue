<script lang="ts" setup>
import contacts from "@/data/contacts.json";
import { useTranslations, type ui } from "@/i18n/ui";
import { useResume } from "@/composables/resume";
import { Mail, Github, Instagram, Linkedin, Globe } from "lucide-vue-next";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), { lang: "en" });
const t = useTranslations(props.lang);
const resume = useResume(props.lang);

const currentYear = new Date().getFullYear();

const contactLabels: Record<string, string> = {
  gmail: "Email",
  github: "GitHub",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  upwork: "Upwork",
};
</script>

<template>
  <footer class="border-border border-t py-12">
    <div class="mx-auto max-w-6xl px-6">
      <div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <!-- Left: Follow Me -->
        <div class="flex flex-col items-center gap-4 sm:items-start">
          <h3 class="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            {{ t("footer.follow") }}
          </h3>
          <div class="flex items-center gap-3">
            <a
              v-for="contact in contacts"
              :key="contact.icon"
              :href="contact.url"
              target="_blank"
              rel="noopener noreferrer"
              :title="contactLabels[contact.icon] || contact.icon"
              class="border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/20 rounded-xl border p-2.5 transition-all hover:scale-110 active:scale-95"
            >
              <Mail
                v-if="contact.icon === 'gmail'"
                :size="18"
              />
              <Github
                v-else-if="contact.icon === 'github'"
                :size="18"
              />
              <Instagram
                v-else-if="contact.icon === 'instagram'"
                :size="18"
              />
              <Linkedin
                v-else-if="contact.icon === 'linkedin'"
                :size="18"
              />
              <!-- Upwork: Custom SVG because it's not in Lucide -->
              <svg
                v-else-if="contact.icon === 'upwork'"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"
                />
              </svg>
              <Globe
                v-else
                :size="18"
              />
            </a>
          </div>
        </div>

        <!-- Right: Copyright -->
        <div class="text-center sm:text-right">
          <p class="text-muted-foreground text-sm">
            © {{ currentYear }} {{ resume.basics.name }}
          </p>
          <p class="text-muted-foreground/60 mt-1 text-xs">
            {{ t("footer.builtWith") }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
