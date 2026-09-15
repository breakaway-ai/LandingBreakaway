/** Navbar island and hero width: min(1152px, viewport − gutter). */
export const LAYOUT_MAX = 1152;

/** Page sections span wider than the navbar island. */
export const CONTENT_MAX = 1312;

function containerClass(max: number) {
  return `mx-auto w-[min(${max}px,calc(100vw-2.5rem))] px-5 sm:w-[min(${max}px,calc(100vw-3rem))] sm:px-6`;
}

export const layoutContainerClass = containerClass(LAYOUT_MAX);
export const pageContainerClass = containerClass(CONTENT_MAX);
