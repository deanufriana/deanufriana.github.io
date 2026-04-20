<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import { useResume } from "@/composables/resume";
import { useTranslations, type ui } from "@/i18n/ui";
import { useDark, useIntersectionObserver, useScroll, useToggle } from "@vueuse/core";
import { Briefcase, Folder, Home, Layers, Moon, Plus, Sun, User } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), {
  lang: "en",
});
const t = useTranslations(props.lang);
const { resume } = useResume(props.lang);

// Scroll handling
const { y } = useScroll(typeof window !== "undefined" ? window : null);
const isScrolled = computed(() => y.value > 20);

// Theme management
const isDark = useDark({
  storageKey: "theme",
  valueDark: "dark",
  valueLight: "light",
});
const toggleTheme = () => useToggle(isDark)();

// Active section tracking (Scroll-Spy)
const activeSection = ref("home");
const sections = ["home", "about", "services", "experience", "projects"];

onMounted(() => {
  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      useIntersectionObserver(
        el,
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            activeSection.value = id;
          }
        },
        {
          threshold: 0.2,
          rootMargin: "-20% 0px -35% 0px",
        },
      );
    }
  });
});
</script>

<template>
  <nav
    class="glass-nav fixed top-0 right-0 left-0 z-50 transition-all duration-300"
    :class="{ 'shadow-lg': isScrolled }"
  >
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="flex h-14 items-center justify-between sm:h-16">
        <!-- Mobile: Icon nav row -->
        <div class="flex items-center gap-1 md:hidden">
          <Button
            as="a"
            href="#home"
            :variant="activeSection === 'home' ? 'secondary' : 'ghost'"
            size="sm"
            :title="t('nav.home')"
            :aria-label="t('nav.home')"
            :class="['rounded-xl px-2 py-1.5', { 'text-emerald-500': activeSection === 'home' }]"
          >
            <Home :size="18" />
          </Button>
          <Button
            as="a"
            href="#about"
            :variant="activeSection === 'about' ? 'secondary' : 'ghost'"
            size="sm"
            :title="t('nav.about')"
            :aria-label="t('nav.about')"
            :class="['rounded-xl px-2 py-1.5', { 'text-emerald-500': activeSection === 'about' }]"
          >
            <User :size="18" />
          </Button>
          <Button
            as="a"
            href="#services"
            :variant="activeSection === 'services' ? 'secondary' : 'ghost'"
            size="sm"
            :title="t('nav.services')"
            :aria-label="t('nav.services')"
            :class="[
              'rounded-xl px-2 py-1.5',
              { 'text-emerald-500': activeSection === 'services' },
            ]"
          >
            <Layers :size="18" />
          </Button>
          <Button
            as="a"
            href="#experience"
            :variant="activeSection === 'experience' ? 'secondary' : 'ghost'"
            size="sm"
            :title="t('nav.experience')"
            :aria-label="t('nav.experience')"
            :class="[
              'rounded-xl px-2 py-1.5',
              { 'text-emerald-500': activeSection === 'experience' },
            ]"
          >
            <Briefcase :size="18" />
          </Button>
          <Button
            as="a"
            href="#projects"
            :variant="activeSection === 'projects' ? 'secondary' : 'ghost'"
            size="sm"
            :title="t('nav.projects')"
            :aria-label="t('nav.projects')"
            :class="[
              'rounded-xl px-2 py-1.5',
              { 'text-emerald-500': activeSection === 'projects' },
            ]"
          >
            <Folder :size="18" />
          </Button>
        </div>

        <!-- Desktop: Logo -->
        <a
          href="#home"
          class="text-foreground hidden text-lg font-bold transition-opacity hover:opacity-80 md:block"
        >
          {{ resume.basics.name.split(" ")[0] }}<span class="text-emerald-500">.</span>
        </a>

        <!-- Desktop: Nav Links -->
        <div class="hidden items-center gap-8 md:flex">
          <a
            href="#home"
            class="hover:text-foreground text-sm font-medium transition-colors"
            :class="
              activeSection === 'home' ? 'font-bold text-emerald-500' : 'text-muted-foreground'
            "
            :aria-current="activeSection === 'home' ? 'page' : undefined"
            >{{ t("nav.home") }}</a
          >
          <a
            href="#about"
            class="hover:text-foreground text-sm font-medium transition-colors"
            :class="
              activeSection === 'about' ? 'font-bold text-emerald-500' : 'text-muted-foreground'
            "
            :aria-current="activeSection === 'about' ? 'page' : undefined"
            >{{ t("nav.about") }}</a
          >
          <a
            href="#services"
            class="hover:text-foreground text-sm font-medium transition-colors"
            :class="
              activeSection === 'services' ? 'font-bold text-emerald-500' : 'text-muted-foreground'
            "
            :aria-current="activeSection === 'services' ? 'page' : undefined"
            >{{ t("nav.services") }}</a
          >
          <a
            href="#experience"
            class="hover:text-foreground text-sm font-medium transition-colors"
            :class="
              activeSection === 'experience'
                ? 'font-bold text-emerald-500'
                : 'text-muted-foreground'
            "
            :aria-current="activeSection === 'experience' ? 'page' : undefined"
            >{{ t("nav.experience") }}</a
          >
          <a
            href="#projects"
            class="hover:text-foreground text-sm font-medium transition-colors"
            :class="
              activeSection === 'projects' ? 'font-bold text-emerald-500' : 'text-muted-foreground'
            "
            :aria-current="activeSection === 'projects' ? 'page' : undefined"
            >{{ t("nav.projects") }}</a
          >
        </div>

        <!-- Right side: Theme toggle + Lang + CTA -->
        <div class="flex items-center gap-1 sm:gap-2">
          <!-- Language Switcher -->
          <Button
            as="a"
            :href="lang === 'en' ? '/id/' : '/'"
            variant="ghost"
            size="icon-xl"
            class="text-sm font-bold"
            :title="lang === 'en' ? 'Switch to Indonesian' : 'Switch to English'"
            :aria-label="lang === 'en' ? 'Switch to Indonesian' : 'Switch to English'"
          >
            {{ lang === "en" ? "ID" : "EN" }}
          </Button>

          <!-- Theme Toggle -->
          <Button
            variant="ghost"
            size="icon-xl"
            class="group/theme"
            :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            :aria-label="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            @click="toggleTheme"
          >
            <div
              class="relative h-[18px] w-[18px] transition-transform duration-500 ease-in-out group-active/theme:scale-90"
              :class="{ 'rotate-[360deg]': isDark }"
            >
              <Sun
                v-if="isDark"
                :size="18"
                :stroke-width="2.5"
                class="animate-in fade-in zoom-in absolute inset-0 text-emerald-500 duration-300"
              />
              <Moon
                v-else
                :size="18"
                :stroke-width="2.5"
                class="animate-in fade-in zoom-in absolute inset-0 text-blue-500 duration-300"
              />
            </div>
          </Button>

          <Button
            as="a"
            :href="`mailto:${resume.basics.email}`"
            variant="cta"
            size="sm"
            class="rounded-full px-3 py-2 sm:px-4"
            aria-label="Hire Me"
          >
            <Plus
              :size="14"
              :stroke-width="2.5"
            />
            <span class="ml-1 hidden sm:inline-flex">{{ t("hero.hire") }}</span>
          </Button>
        </div>
      </div>
    </div>
  </nav>
</template>
