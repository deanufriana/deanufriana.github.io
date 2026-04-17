<script lang="ts" setup>
import resume from "@/data/resume.json";
import { onMounted, onUnmounted, ref } from "vue";

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
    class="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300"
    :class="{ 'shadow-lg': isScrolled }"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-14 sm:h-16">
        <!-- Mobile: Icon nav row -->
        <div class="flex md:hidden items-center gap-1">
          <a
            href="#home"
            class="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all"
            title="Home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </a>
          <a
            href="#about"
            class="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all"
            title="About"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </a>
          <a
            href="#experience"
            class="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all"
            title="Experience"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </a>
          <a
            href="#projects"
            class="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all"
            title="Projects"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
              />
            </svg>
          </a>
        </div>

        <!-- Desktop: Logo -->
        <a
          href="#home"
          class="hidden md:block text-lg font-bold text-foreground hover:opacity-80 transition-opacity"
        >
          {{ resume.basics.name.split(" ")[0]
          }}<span class="text-emerald-500">.</span>
        </a>

        <!-- Desktop: Nav Links -->
        <div class="hidden md:flex items-center gap-8">
          <a
            href="#home"
            class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >Home</a
          >
          <a
            href="#about"
            class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >About</a
          >
          <a
            href="#experience"
            class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >Experience</a
          >
          <a
            href="#projects"
            class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >Projects</a
          >
        </div>

        <!-- Right side: Theme toggle + CTA -->
        <div class="flex items-center gap-2">
          <button
            @click="toggleTheme"
            class="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all cursor-pointer"
            :title="isDark ? 'Light Mode' : 'Dark Mode'"
          >
            <!-- Sun -->
            <svg
              v-if="isDark"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            <!-- Moon -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>

          <a
            :href="`mailto:${resume.basics.email}`"
            class="inline-flex items-center gap-1.5 px-4 py-2 bg-foreground text-background text-xs sm:text-sm font-medium rounded-full hover:opacity-90 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            Hire Me
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
