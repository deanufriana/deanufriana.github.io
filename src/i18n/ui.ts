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
    "hero.badge": "Available for freelance & full-time roles",
    "hero.email": "Email Me",
    "hero.upwork": "Upwork",
    "hero.copyEmail": "Copy Email",
    "hero.copied": "Copied",
    "hero.downloadCv": "Download CV",
    "overview.current": "Current Role",
    "overview.experience": "Experience",
    "overview.location": "Location",
    "overview.yearsSuffix": "years",
    "experience.present": "Present",
    "experience.details": "Key highlights",
    "experience.hideDetails": "Hide highlights",
    "projects.openSource": "Open Source",
    "projects.liveDemo": "Live App",
    "projects.personal": "Personal project",
    "footer.builtWith": "Built with Astro & Vue.js",
  },
  id: {
    "nav.overview": "Ringkasan",
    "nav.experience": "Pengalaman",
    "nav.projects": "Proyek",
    "hero.badge": "Terbuka untuk freelance & full-time",
    "hero.email": "Kirim Email",
    "hero.upwork": "Upwork",
    "hero.copyEmail": "Salin Email",
    "hero.copied": "Tersalin",
    "hero.downloadCv": "Unduh CV",
    "overview.current": "Posisi Saat Ini",
    "overview.experience": "Pengalaman",
    "overview.location": "Lokasi",
    "overview.yearsSuffix": "tahun",
    "experience.present": "Sekarang",
    "experience.details": "Detail pencapaian",
    "experience.hideDetails": "Sembunyikan",
    "projects.subtitle":
      "Proyek klien bersifat rahasia (NDA). Berikut adalah proyek publik dan open-source yang saya bangun.",
    "projects.openSource": "Open Source",
    "projects.liveDemo": "Aplikasi Live",
    "projects.personal": "Proyek Pribadi",
    "footer.builtWith": "Dibuat dengan Astro & Vue.js",
  },
} as const;

export function useTranslations (lang: keyof typeof ui) {
  return function t (key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
