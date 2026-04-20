<script lang="ts" setup>
import UpworkIcon from "@/components/icons/UpworkIcon.vue";
import { useResume } from "@/composables/resume";
import contacts from "@/data/contacts.json";
import { useTranslations, type ui } from "@/i18n/ui";
import { Github, Globe, Instagram, Linkedin, Mail } from "lucide-vue-next";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), { lang: "en" });
const t = useTranslations(props.lang);
const { resume } = useResume(props.lang);

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
              :aria-label="`Visit my ${contactLabels[contact.icon] || contact.icon} profile`"
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
              <UpworkIcon
                v-else-if="contact.icon === 'upwork'"
                :size="18"
              />
              <Globe
                v-else
                :size="18"
              />
            </a>
          </div>
        </div>

        <!-- Right: Copyright -->
        <div class="text-center sm:text-right">
          <p class="text-muted-foreground text-sm">© {{ currentYear }} {{ resume.basics.name }}</p>
          <p class="text-muted-foreground/60 mt-1 text-xs">
            {{ t("footer.builtWith") }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
