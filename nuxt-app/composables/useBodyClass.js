/**
 * Composable for managing body classes consistently across pages
 * @param {string} className - The class name to apply to the body
 */
export const useBodyClass = (className) => {
  useHead({
    bodyAttrs: {
      class: className
    }
  })
}