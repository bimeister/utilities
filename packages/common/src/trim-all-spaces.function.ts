const SPACES_REGEX: RegExp = new RegExp(/\s+/g);

export function trimAllSpaces(text: string): string {
  return text.trim().replace(SPACES_REGEX, ' ');
}
