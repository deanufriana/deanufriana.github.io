import mdx from '@astrojs/mdx';
import partytown from "@astrojs/partytown";
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
import vue from "@astrojs/vue";

import tailwindcss from '@tailwindcss/vite';

import pdf from 'astro-pdf';

// https://astro.build/config
export default defineConfig({
  site: 'https://deanufriana.github.io/',

  integrations: [mdx(), sitemap(), vue(), partytown({
    // Adds dataLayer.push as a forwarding-event.
    config: {
      forward: ["dataLayer.push"],
    },
  }),
  pdf({
    pages: {
      '/resume': {
        path: 'resume.pdf',
        pdf: { // Puppeteer PDFOptions
          format: 'A4',
          printBackground: true,
          displayHeaderFooter: true,
          headerTemplate: `
            <div style="font-size: 10px; width: 100%; text-align: right; padding-right: 20px;">
              <span class="title"></span>
            </div>
          `,
          footerTemplate: `
            <div style="font-size: 10px; width: 100%; padding-left: 20px; padding-right: 20px; display: flex; justify-content: space-between;">
              <span>Devi Adi Nufriana - Software Engineer</span>
              <span class="pageNumber"></span>/<span class="totalPages"></span>
            </div>
          `,
          margin: {
            top: '60px',
            right: '40px',
            bottom: '60px',
            left: '40px'
          },
          timeout: 20_000
        },
      }
    }
  })],

  vite: {
    plugins: [tailwindcss()]
  }
});