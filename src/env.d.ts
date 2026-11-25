/// <reference types="astro/client" />

interface Window {
  dataLayer: Record<string, unknown>[];
  __lcpMetric?: {
    value: number;
    rating: "good" | "needs-improvement" | "poor";
    element: string;
  };
}
