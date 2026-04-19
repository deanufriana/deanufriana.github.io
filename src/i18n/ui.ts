export const languages = {
  en: "English",
  id: "Indonesia",
};

export const defaultLang = "en";

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "hero.badge": "Accepting Freelance Clients",
    "hero.intro": "With more than",
    "hero.suffix": "years of experience as a",
    "hero.hire": "Free Consultation",
    "hero.upwork": "Hire via Upwork",
    "hero.copyEmail": "Copy Email",
    "hero.copied": "Copied!",
    "about.label": "About",
    "about.heading": "It's Me",
    "about.downloadCv": "Download CV",
    "about.yearsExp": "Years Exp.",
    "about.companies": "Companies",
    "about.projects": "Projects",
    "about.privacyValue": "100%",
    "about.privacyLabel": "Private & Secure",
    "about.techStack": "Tech Stack",
    "services.label": "Services",
    "services.heading": "What I Can Do For You",
    "services.1.title": "Custom Web Apps",
    "services.1.desc":
      "I build robust, scalable, and fast web applications specifically tailored to your business needs.",
    "services.2.title": "Website Modernization",
    "services.2.desc":
      "Turn your legacy codebase into a modern, easy-to-maintain React or Vue architecture.",
    "services.3.title": "Performance Optimization",
    "services.3.desc":
      "Audit and optimize your existing web apps for blazing fast load times and better core web vitals.",
    "experience.label": "Proven Experience",
    "experience.heading": "Work History",
    "experience.present": "Present",
    "experience.readMore": "Read More",
    "experience.readLess": "Show Less",
    "experience.techStack": "Technologies Used",
    "projects.label": "Projects",
    "projects.heading": "Featured Work",
    "projects.subtitle":
      "Clients' private projects are confidential and never shared. I only showcase open-source work here to protect your intellectual property—your project remains 100% yours.",
    "projects.openSource": "Open Source Project",
    "projects.personal": "Personal project",
    "cta.heading1": "Ready to start your",
    "cta.heading2": "next project?",
    "cta.desc":
      "Book a free 30-minute consultation to discuss your project requirements, timeline, and architectural approach—no strings attached.",
    "footer.follow": "Follow Me",
    "footer.builtWith": "Built with Astro & Vue.js",
  },
  id: {
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.services": "Layanan",
    "nav.experience": "Pengalaman",
    "nav.projects": "Proyek",
    "hero.badge": "Open Freelance Job",
    "hero.intro": "Dengan lebih dari",
    "hero.suffix": "tahun pengalaman sebagai",
    "hero.hire": "Konsultasi Gratis",
    "hero.upwork": "Mulai di Upwork",
    "hero.copyEmail": "Salin Email",
    "hero.copied": "Tersalin!",
    "about.label": "Tentang",
    "about.heading": "Halo, Saya",
    "about.downloadCv": "Unduh CV",
    "about.yearsExp": "Tahun Pengalaman",
    "about.companies": "Perusahaan",
    "about.projects": "Proyek",
    "about.privacyValue": "100%",
    "about.privacyLabel": "Privasi & Aman",
    "about.techStack": "Tech Stack",
    "services.label": "Layanan",
    "services.heading": "Solusi Untuk Anda",
    "services.1.title": "Aplikasi Web Kustom",
    "services.1.desc":
      "Saya membangun aplikasi web yang handal, skalabel, dan cepat sesuai dengan kebutuhan bisnis Anda.",
    "services.2.title": "Modernisasi Website",
    "services.2.desc":
      "Ubah sistem lawas Anda menjadi arsitektur React atau Vue yang modern dan mudah dipelihara.",
    "services.3.title": "Optimasi Performa",
    "services.3.desc":
      "Audit dan optimasi aplikasi web Anda agar memuat lebih cepat dan meningkatkan metrik web vital.",
    "experience.label": "Pengalaman Bekerja",
    "experience.heading": "Riwayat Pekerjaan",
    "experience.present": "Sekarang",
    "experience.readMore": "Selengkapnya",
    "experience.readLess": "Sembunyikan",
    "experience.techStack": "Teknologi yang Digunakan",
    "projects.label": "Proyek",
    "projects.heading": "Proyek Unggulan",
    "projects.subtitle":
      "Proyek pribadi klien bersifat rahasia dan tidak ditampilkan di sini. Saya hanya menampilkan karya open-source untuk melindungi kekayaan intelektual Anda—proyek Anda tetap milik Anda sepenuhnya.",
    "projects.openSource": "Proyek Open Source",
    "projects.personal": "Proyek Pribadi",
    "cta.heading1": "Siap memulai proyek",
    "cta.heading2": "Anda?",
    "cta.desc":
      "Jadwalkan konsultasi gratis 30 menit untuk mendiskusikan kebutuhan proyek, tenggat waktu, dan pendekatan teknis—tanpa ikatan.",
    "footer.follow": "Ikuti Saya",
    "footer.builtWith": "Dibuat dengan Astro & Vue.js",
  },
} as const;

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
