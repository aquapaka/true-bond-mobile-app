/**
 * Checks if a given string is a valid URL.
 * @param link - The link to validate.
 * @returns `true` if the link is valid, otherwise `false`.
 */
export function isValidLink(link: string): boolean {
  try {
    const url = new URL(link);
    return ["http:", "https:"].includes(url.protocol);
  } catch (error) {
    return false;
  }
}
