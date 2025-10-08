import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useLayoutShowStore = defineStore("layoutshow", () => {
    // State
    const show = ref("compress");
    const currentShow = computed(() => {
        console.log(show.value);
        return show.value;
    });
    return {
        show,
        currentShow,
    };
});
