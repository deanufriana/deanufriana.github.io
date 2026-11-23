export const languages = {
  en: "English",
  id: "Indonesia",
};

export const defaultLang = "en";

export const ui = {
  en: {
    "nav.overview": "Overview",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "hero.upwork": "Upwork",
    "hero.downloadCv": "Download CV",
    "overview.current": "Current Role",
    "overview.experience": "Experience",
    "overview.location": "Location",
    "overview.yearsSuffix": "years",
    "experience.title": "Experience",
    "experience.present": "Present",
    "experience.details": "Key highlights",
    "experience.hideDetails": "Hide highlights",
    "projects.title": "Projects",
    "projects.subtitle":
      "Most client work is under NDA. Here are a few public and open-source projects I've built.",
    "projects.openSource": "Open Source",
    "projects.liveDemo": "Live",
    "projects.personal": "Personal project",
    "footer.builtWith": "Built with Astro & Vue.js",
  },
  id: {
    "nav.overview": "Ringkasan",
    "nav.experience": "Pengalaman",
    "nav.projects": "Proyek",
    "hero.upwork": "Upwork",
    "hero.downloadCv": "Unduh CV",
    "overview.current": "Posisi Saat Ini",
    "overview.experience": "Pengalaman",
    "overview.location": "Lokasi",
    "overview.yearsSuffix": "tahun",
    "experience.title": "Pengalaman",
    "experience.present": "Sekarang",
    "experience.details": "Detail pencapaian",
    "experience.hideDetails": "Sembunyikan",
    "projects.title": "Proyek",
    "projects.subtitle":
      "Proyek klien bersifat rahasia (NDA). Berikut adalah proyek publik dan open-source yang saya bangun.",
    "projects.openSource": "Open Source",
    "projects.liveDemo": "Live",
    "projects.personal": "Proyek Pribadi",
    "footer.builtWith": "Dibuat dengan Astro & Vue.js",
  },
} as const;

export function useTranslations (lang: keyof typeof ui) {
  return function t (key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
