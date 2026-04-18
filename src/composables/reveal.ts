import { onMounted, onUnmounted, ref, type Ref } from "vue";

/**
 * Reusable composable to trigger reveal animations on scroll.
 * @returns {Object} { elementRef, isVisible }
 */
export function useScrollReveal() {
  const elementRef: Ref<HTMLElement | null> = ref(null);
  const isVisible = ref(false);

  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    if (!elementRef.value) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true;
            entry.target.classList.add("reveal-visible");
            // Stop observing once visible to save resources
            observer?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    observer.observe(elementRef.value);
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  return {
    elementRef,
    isVisible,
  };
}
