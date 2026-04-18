<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useTranslations, type ui } from "@/i18n/ui";
import { useResume } from "@/composables/resume";
import { Button } from "@/components/ui/button";
import { Home, User, Layers, Briefcase, Folder, Sun, Moon, Plus } from "lucide-vue-next";

const props = withDefaults(defineProps<{ lang?: keyof typeof ui }>(), { lang: "en" });
const t = useTranslations(props.lang);
const resume = useResume(props.lang);

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const isDark = ref(true);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark", isDark.value);
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    isDark.value = false;
    document.documentElement.classList.remove("dark");
  } else {
    isDark.value = true;
    document.documentElement.classList.add("dark");
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
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
            variant="ghost"
            size="icon-xl"
            :title="t('nav.home')"
          >
            <Home :size="18" />
          </Button>
          <Button
            as="a"
            href="#about"
            variant="ghost"
            size="icon-xl"
            :title="t('nav.about')"
          >
            <User :size="18" />
          </Button>
          <Button
            as="a"
            href="#services"
            variant="ghost"
            size="icon-xl"
            :title="t('nav.services')"
          >
            <Layers :size="18" />
          </Button>
          <Button
            as="a"
            href="#experience"
            variant="ghost"
            size="icon-xl"
            :title="t('nav.experience')"
          >
            <Briefcase :size="18" />
          </Button>
          <Button
            as="a"
            href="#projects"
            variant="ghost"
            size="icon-xl"
            :title="t('nav.projects')"
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
            class="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >{{ t("nav.home") }}</a>
          <a
            href="#about"
            class="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >{{ t("nav.about") }}</a>
          <a
            href="#services"
            class="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >{{ t("nav.services") }}</a>
          <a
            href="#experience"
            class="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >{{ t("nav.experience") }}</a>
          <a
            href="#projects"
            class="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >{{ t("nav.projects") }}</a>
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
            :title="lang === 'en' ? 'Indonesian' : 'English'"
          >
            {{ lang === "en" ? "ID" : "EN" }}
          </Button>

          <!-- Theme Toggle -->
          <Button
            variant="ghost"
            size="icon-xl"
            class="group/theme"
            :title="isDark ? 'Light Mode' : 'Dark Mode'"
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
          >
            <Plus
              :size="14"
              :stroke-width="2.5"
            />
            <span class="hidden sm:inline">{{ t("hero.hire") }}</span>
          </Button>
        </div>
      </div>
    </div>
  </nav>
</template>
