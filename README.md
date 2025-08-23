# Personal Portfolio Website

A modern, responsive personal portfolio website built with **Astro** and **Vue.js**, showcasing professional experience, skills, and projects. This project serves as my **personal testing ground** for exploring and experimenting with various web technologies, frameworks, and development practices.

## 🎯 Project Purpose

This portfolio website is more than just a showcase of my work - it's an **active learning laboratory** where I:

- **Test new technologies** and frameworks to understand their capabilities
- **Experiment with different approaches** to web development and design
- **Practice modern development practices** like component architecture, responsive design, and performance optimization
- **Learn by doing** - implementing features I want to understand better
- **Document my learning journey** through code and implementation choices

## ✨ Features

- 📱 **Responsive Layout** - Optimized for all devices and screen sizes
- ⚡ **Performance Optimized** - Built with Astro for optimal loading speeds
- 🎭 **Interactive Elements** - Typewriter effect, smooth animations, and dynamic content
- 📊 **SEO Optimized** - Meta tags, sitemap, and RSS feed support
- 🚀 **Modern Tech Stack** - Vue 3, Tailwind CSS, and TypeScript
- 🧪 **Technology Testing** - Continuously evolving with new experiments and features

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) - Static site generator
- **Frontend**: [Vue.js 3](https://vuejs.org/) - Progressive JavaScript framework
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Icons**: [Lucide Vue](https://lucide.dev/) - Beautiful & consistent icon toolkit
- **UI Components**: [Reka UI](https://reka-ui.com/) - Modern component library
- **Build Tool**: [Vite](https://vitejs.dev/) - Fast build tool and dev server

## 🔬 Learning & Testing Focus

This project is intentionally designed to explore:

- **Component Architecture**: Testing different ways to structure Vue components
- **Performance Optimization**: Experimenting with Astro's static generation capabilities
- **Responsive Design**: Testing various approaches to mobile-first development
- **Modern CSS**: Exploring Tailwind CSS utilities and custom styling solutions
- **TypeScript Integration**: Learning type safety in Vue.js applications
- **Build Tools**: Understanding Vite and modern development workflows

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/deanufriana/deanufriana.github.io.git
   cd deanufriana.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view your site

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── ui/             # UI component library
│   └── ...             # Custom components
├── containers/          # Page sections and layouts
├── data/               # Static data (resume, contacts, icons)
├── composables/        # Vue composables and utilities
├── styles/             # Global CSS and Tailwind configuration
├── pages/              # Astro pages and routing
└── lib/                # Utility functions and helpers
```

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run astro` | Run Astro CLI commands |

## 🌐 Deployment

This project is configured for GitHub Pages deployment. The build output is automatically generated in the `dist/` folder.

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

1. Build the project: `npm run build`
2. Push the `dist/` folder to your `gh-pages` branch
3. Configure GitHub Pages to serve from the `gh-pages` branch

## 🎨 Customization

### Personal Information
Update your personal details in the following files:
- `src/data/resume.json` - Work experience and skills
- `src/data/contacts.json` - Contact information
- `src/data/icons.json` - Technology icons to display

### Styling
- Modify `src/styles/global.css` for custom styles
- Update Tailwind configuration for theme customization
- Customize component styles in individual Vue components

### Content
- Edit `src/containers/` components to modify page sections
- Update the main page layout in `src/pages/index.astro`

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Configuration

Key configuration files:
- `astro.config.mjs` - Astro configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

## 🤝 Contributing

This is a personal portfolio project, but if you find any bugs or have suggestions for improvements, feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is private and intended for personal use.

## 👤 About

**Devi Adi Nufriana** - A technology enthusiast driven by continuous learning and exploration in the ever-evolving world of technology. I believe in learning through hands-on experimentation, which is why this portfolio serves as both a showcase and a testing environment for new technologies.

- **LinkedIn**: [devinufriana](https://www.linkedin.com/in/devinufriana)
- **Portfolio**: [deanufriana.github.io](https://deanufriana.github.io)
- **Learning Approach**: Hands-on experimentation with real projects

---

Built with ❤️ using [Astro](https://astro.build/) and [Vue.js](https://vuejs.org/)
