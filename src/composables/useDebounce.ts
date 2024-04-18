import { ref, watch, type Ref } from "vue";

export default function useDebounce(refText: Ref, delay: number = 1000){
    const debouncedValue = ref<string>(refText.value);

    let timeout : ReturnType<typeof setTimeout>;

    watch(refText, (newVal : string) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            debouncedValue.value = newVal
        }, delay)
    })

    return { debouncedValue }
}