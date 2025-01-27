/**
 * stencil doesn't support this for 'dist-custom-elements' targets
 */
export function getAssetPath(path: string): string {
  return new URL(path, import.meta.url).toString();
}
