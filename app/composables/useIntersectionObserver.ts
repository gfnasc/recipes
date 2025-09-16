import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';

export function useIntersectionObserver(
  target: Ref<Element | null>,
  options: IntersectionObserverInit = { root: null, rootMargin: '0px', threshold: 0.1 }
) {
  const isIntersecting = ref(false);
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      isIntersecting.value = entry.isIntersecting;
    }, options);

    if (target.value) {
      observer.observe(target.value);
    }
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return { isIntersecting };
}
