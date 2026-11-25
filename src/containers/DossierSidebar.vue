<script lang="ts" setup>
import MediumIcon from "@/components/icons/MediumIcon.vue";
import UpworkIcon from "@/components/icons/UpworkIcon.vue";
import contacts from "@/data/contacts.json";
import { useTranslations, type ui } from "@/i18n/ui";
import type { Basics } from "@/schemas/resume";
import { useIntersectionObserver, useScroll } from "@vueuse/core";
import {
  Download,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Mail,
  Moon,
  Sun,
} from "lucide-vue-next";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    lang?: keyof typeof ui;
    basics: Basics;
    targetLangUrl: string;
  }>(),
  {
    lang: "en",
  },
);

const t = computed(() => useTranslations(props.lang));

const { y } = useScroll(typeof window !== "undefined" ? window : null);

// Theme management (initial class is applied by BaseLayout's inline script)
const isDark = ref(true);

const syncThemeState = () => {
  if (typeof document === "undefined") return;
  isDark.value = document.documentElement.classList.contains("dark");
};

const commitThemeToggle = () => {
  isDark.value = !isDark.value;
  if (typeof window !== "undefined") {
    document.documentElement.classList.toggle("dark", isDark.value);
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
  }
};

const toggleTheme = (event?: MouseEvent) => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    commitThemeToggle();
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const startViewTransition = (
    document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
    }
  ).startViewTransition;

  if (prefersReducedMotion || !startViewTransition) {
    commitThemeToggle();
    return;
  }

  const target = event?.currentTarget as HTMLElement | null;
  const rect = target?.getBoundingClientRect();
  const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  document.documentElement.classList.add("theme-transition");
  const transition = startViewTransition.call(document, () => {
    commitThemeToggle();
  });

  transition.ready
    .then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
        },
        {
          duration: 850,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {});

  transition.finished
    .finally(() => {
      document.documentElement.classList.remove("theme-transition");
    })
    .catch(() => {});
};

// Live Jakarta (WIB) clock
const jakartaTime = ref("");
let clockInterval: ReturnType<typeof setInterval> | null = null;

const updateJakartaTime = () => {
  jakartaTime.value = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
};

// Scroll-spy for right-pane sections
const activeSection = ref("overview");
const sections = ["overview", "experience", "projects"] as const;
const stopObservers: Array<() => void> = [];

const navLinks = computed(() => [
  { id: "overview", href: "#overview", label: t.value("nav.overview") },
  { id: "experience", href: "#experience", label: t.value("nav.experience") },
  { id: "projects", href: "#projects", label: t.value("nav.projects") },
]);

const handleLangSwitch = () => {
  if (typeof document !== "undefined") {
    document.documentElement.classList.add("lang-transition");
  }
};

const upworkProfile = computed(() =>
  props.basics.profiles.find((p) => p.network.toLowerCase() === "upwork"),
);

const contactLabels: Record<string, string> = {
  gmail: "Email",
  github: "GitHub",
  linkedin: "LinkedIn",
  medium: "Medium",
  upwork: "Upwork",
};

watch(y, (newY) => {
  if (typeof window !== "undefined") {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (newY + clientHeight >= scrollHeight - 100) {
      activeSection.value = "projects";
    }
  }
});

onMounted(() => {
  syncThemeState();
  updateJakartaTime();
  clockInterval = setInterval(updateJakartaTime, 30000);
  document.addEventListener("astro:after-swap", syncThemeState);

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      const { stop } = useIntersectionObserver(
        el,
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            if (y.value + clientHeight < scrollHeight - 100) {
              activeSection.value = id;
            }
          }
        },
        {
          threshold: 0.2,
          rootMargin: "-15% 0px -45% 0px",
        },
      );
      stopObservers.push(stop);
    }
  });
});

onUnmounted(() => {
  if (clockInterval) clearInterval(clockInterval);
  stopObservers.forEach((stop) => stop());
  stopObservers.length = 0;
  if (typeof window !== "undefined") {
    document.removeEventListener("astro:after-swap", syncThemeState);
  }
});
</script>

<template>
  <!-- Mobile Compact Top Bar -->
  <header class="glass-nav fixed top-0 right-0 left-0 z-50 lg:hidden print:hidden">
    <div class="flex h-14 items-center justify-between px-6 sm:px-10">
      <a
        href="#overview"
        class="text-foreground text-base font-bold"
      >
        {{ basics.name.split(" ")[0] }}<span class="text-brand">.</span>
      </a>
      <div class="flex items-center gap-1.5">
        <a
          :href="targetLangUrl"
          class="border-border bg-background/80 relative inline-flex h-8 items-center rounded-full border p-0.5 text-[11px] font-bold tracking-wide transition-colors"
          :title="lang === 'en' ? 'Switch to Indonesian' : 'Switch to English'"
          :aria-label="lang === 'en' ? 'Switch to Indonesian' : 'Switch to English'"
          @click="handleLangSwitch"
        >
          <span
            class="relative z-10 rounded-full px-2 py-0.5 transition-colors duration-200"
            :class="
              lang === 'en'
                ? 'lang-pill-active-mobile bg-brand text-white shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            "
          >
            EN
          </span>
          <span
            class="relative z-10 rounded-full px-2 py-0.5 transition-colors duration-200"
            :class="
              lang === 'id'
                ? 'lang-pill-active-mobile bg-brand text-white shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            "
          >
            ID
          </span>
        </a>
        <button
          type="button"
          class="hover:bg-accent inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-md p-2 transition-colors"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          :aria-label="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          @click="toggleTheme($event)"
        >
          <Sun
            :size="18"
            class="text-brand hidden dark:block"
          />
          <Moon
            :size="18"
            class="block dark:hidden"
          />
        </button>
      </div>
    </div>
  </header>

  <!-- Tinted Fixed Left Dossier Sidebar (Desktop) / Intro Header (Mobile) -->
  <aside
    class="bg-sidebar border-border dossier-divider relative flex flex-col justify-between gap-10 border-b px-6 pt-24 pb-12 sm:px-10 lg:sticky lg:top-0 lg:h-dvh lg:w-[40%] lg:shrink-0 lg:border-b-0 lg:px-12 lg:py-16 xl:w-[38%] xl:px-16"
  >
    <div class="flex flex-col gap-8">
      <!-- Desktop Utility Row -->
      <div class="animate-editorial-in hidden items-center justify-between lg:flex print:hidden">
        <a
          href="#overview"
          class="text-foreground text-base font-bold transition-opacity hover:opacity-80"
        >
          {{ basics.name.split(" ")[0] }}<span class="text-brand">.</span>
        </a>
        <div class="flex items-center gap-1.5">
          <a
            :href="targetLangUrl"
            class="border-border bg-background/70 hover:border-foreground/20 relative inline-flex h-7 items-center rounded-full border p-0.5 text-[11px] font-bold tracking-wide transition-colors"
            :title="lang === 'en' ? 'Switch to Indonesian' : 'Switch to English'"
            :aria-label="lang === 'en' ? 'Switch to Indonesian' : 'Switch to English'"
            @click="handleLangSwitch"
          >
            <span
              class="relative z-10 rounded-full px-2 py-0.5 transition-colors duration-200"
              :class="
                lang === 'en'
                  ? 'lang-pill-active bg-brand text-white shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              "
            >
              EN
            </span>
            <span
              class="relative z-10 rounded-full px-2 py-0.5 transition-colors duration-200"
              :class="
                lang === 'id'
                  ? 'lang-pill-active bg-brand text-white shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              "
            >
              ID
            </span>
          </a>
          <button
            type="button"
            class="hover:bg-accent inline-flex min-h-9 min-w-9 cursor-pointer items-center justify-center rounded-md p-2 transition-colors"
            :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            :aria-label="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            @click="toggleTheme($event)"
          >
            <Sun
              :size="16"
              class="text-brand hidden dark:block"
            />
            <Moon
              :size="16"
              class="block dark:hidden"
            />
          </button>
        </div>
      </div>

      <!-- Identity Block + Nav (Morphs smoothly on language switch) -->
      <div class="lang-morph-sidebar flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <h1
            class="animate-lcp-in text-4xl leading-[1.06] font-bold tracking-tight sm:text-5xl"
          >
            {{ basics.name.split(" ").slice(0, 2).join(" ") }}
            <span class="font-serif font-normal italic">
              {{ basics.name.split(" ").slice(2).join(" ") }}
            </span>
          </h1>

          <p class="animate-editorial-in enter-delay-2 text-muted-foreground text-sm font-medium">
            {{ basics.label }} · {{ basics.location?.city }}
            <span
              class="text-muted-foreground text-xs tabular-nums transition-opacity duration-300"
              :class="jakartaTime ? 'opacity-100' : 'opacity-0 select-none'"
              :aria-hidden="!jakartaTime || undefined"
            >
              ({{ jakartaTime || "00:00" }} WIB)
            </span>
          </p>

          <p
            class="animate-lcp-in text-muted-foreground max-w-md text-sm leading-relaxed sm:text-base"
          >
            {{ basics.summary }}
          </p>
        </div>

        <!-- Simple Section Nav -->
        <nav
          aria-label="Section navigation"
          class="animate-editorial-in enter-delay-4 hidden items-center gap-6 lg:flex print:hidden"
        >
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="link.href"
            class="text-sm transition-colors"
            :class="
              activeSection === link.id
                ? 'text-brand font-semibold'
                : 'text-muted-foreground hover:text-foreground font-medium'
            "
            :aria-current="activeSection === link.id ? 'page' : undefined"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>
    </div>

    <div class="animate-editorial-in enter-delay-5 flex flex-wrap items-center justify-between gap-4">
      <!-- Social Icons -->
      <div class="flex items-center gap-1.5">
        <a
          v-for="contact in contacts"
          :key="contact.icon"
          :href="contact.url"
          target="_blank"
          rel="noopener noreferrer"
          :title="contactLabels[contact.icon] || contact.icon"
          :aria-label="`Visit my ${contactLabels[contact.icon] || contact.icon} profile`"
          class="border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/25 inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border transition-colors lg:min-h-9 lg:min-w-9"
        >
          <Mail
            v-if="contact.icon === 'gmail'"
            :size="16"
          />
          <Github
            v-else-if="contact.icon === 'github'"
            :size="16"
          />
          <MediumIcon
            v-else-if="contact.icon === 'medium'"
            :size="16"
          />
          <Linkedin
            v-else-if="contact.icon === 'linkedin'"
            :size="16"
          />
          <UpworkIcon
            v-else-if="contact.icon === 'upwork'"
            :size="16"
          />
          <Globe
            v-else
            :size="16"
          />
        </a>
      </div>

      <!-- Secondary Text Links -->
      <div class="flex items-center gap-3 text-xs font-medium">
        <a
          v-if="upworkProfile"
          :href="upworkProfile.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-muted-foreground hover:text-foreground inline-flex min-h-11 items-center gap-1 transition-colors lg:min-h-9"
        >
          {{ t("hero.upwork") }}
          <ExternalLink :size="12" />
        </a>
        <a
          href="https://registry.jsonresume.org/deanufriana"
          target="_blank"
          rel="noopener noreferrer"
          class="text-muted-foreground hover:text-foreground inline-flex min-h-11 items-center gap-1 transition-colors lg:min-h-9"
        >
          {{ t("hero.downloadCv") }}
          <Download :size="12" />
        </a>
      </div>
    </div>
  </aside>
</template>
