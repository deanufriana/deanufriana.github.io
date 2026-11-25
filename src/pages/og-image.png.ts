import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import satori from "satori";

export const GET: APIRoute = async () => {
  const entry = await getEntry("resume", "en");
  if (!entry) {
    return new Response("Resume entry not found", { status: 404 });
  }

  const { basics } = entry.data;
  const location = [basics.location?.city, basics.location?.region].filter(Boolean).join(", ");

  const [interRegular, interBold] = await Promise.all([
    readFile(resolve("node_modules/@fontsource/inter/files/inter-latin-400-normal.woff")),
    readFile(resolve("node_modules/@fontsource/inter/files/inter-latin-700-normal.woff")),
  ]);

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0f172a",
          color: "#f8fafc",
          fontFamily: "Inter",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "24px",
                fontWeight: 700,
                color: "#60a5fa",
              },
              children: [
                {
                  type: "span",
                  props: {
                    style: {
                      width: "12px",
                      height: "12px",
                      borderRadius: "9999px",
                      backgroundColor: "#60a5fa",
                    },
                  },
                },
                "deanufriana.github.io",
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "64px",
                      fontWeight: 700,
                      lineHeight: 1.08,
                      letterSpacing: "-0.02em",
                    },
                    children: basics.name,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "30px",
                      fontWeight: 400,
                      color: "#94a3b8",
                    },
                    children: location ? `${basics.label} · ${location}` : basics.label,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "24px",
                      fontWeight: 400,
                      lineHeight: 1.45,
                      color: "#cbd5e1",
                      maxWidth: "960px",
                    },
                    children: basics.summary ?? "",
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #1e293b",
                paddingTop: "24px",
                fontSize: "20px",
                color: "#64748b",
              },
              children: [
                "Software Engineer Portfolio",
                "Vue.js · TypeScript · Astro · Go",
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: interRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: interBold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
    },
  });
  const pngBuffer = resvg.render().asPng();

  return new Response(new Uint8Array(pngBuffer), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
