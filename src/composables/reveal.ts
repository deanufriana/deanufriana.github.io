import { ref, type Ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

/**
 * Reusable composable to trigger reveal animations on scroll.
 * @returns {Object} { elementRef, isVisible }
 */
export function useScrollReveal() {
  const elementRef: Ref<HTMLElement | null> = ref(null);
  const isVisible = ref(false);

  const { stop } = useIntersectionObserver(
    elementRef,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        isVisible.value = true;

        if (elementRef.value) {
          elementRef.value.classList.add("reveal-visible");
        }

        // Stop observing once visible to save resources
        stop();
      }
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  return {
    elementRef,
    isVisible,
  };
}
