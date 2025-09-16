import { ref, watch } from 'vue';
import type { Ref } from 'vue';

export function useDebounce<T>(value: Ref<T>, delay: number): Ref<T> {
    const debouncedValue = ref(value.value) as Ref<T>;

    let timeout: NodeJS.Timeout;
    watch(value, (newValue) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            debouncedValue.value = newValue;
        }, delay);
    });

    return debouncedValue;
}
