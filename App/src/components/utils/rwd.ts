import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useWindowSize() {
  const windowWidth = ref(window.visualViewport?.width ?? window.innerWidth);
  const isMobileLayout = computed(() => windowWidth.value < 1200);

  const onResize = () => {
    windowWidth.value = window.visualViewport?.width ?? window.innerWidth;
  }

  onMounted(() => window.addEventListener('resize', onResize))
  onUnmounted(() => window.removeEventListener('resize', onResize))
  
  return { windowWidth, isMobileLayout }
}
