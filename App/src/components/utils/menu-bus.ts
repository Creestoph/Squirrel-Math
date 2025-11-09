import { computed, ref } from 'vue'
import { useWindowSize } from './rwd';

const isLessonPanelExpanded = ref(true);

export function useLessonExpandedInfo() {
    const { isMobileLayout } = useWindowSize();
    const lessonLeftPos = computed(() => (isLessonPanelExpanded.value ? '0' : isMobileLayout.value ? '-100%' : '-80%'));
    return { isLessonPanelExpanded, lessonLeftPos };
}
