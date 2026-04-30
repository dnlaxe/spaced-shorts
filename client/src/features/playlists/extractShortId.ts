export default function extractShortId(input: string): string | null {
  try {
    const parsed = new URL(input);

    if (!parsed.hostname.includes("youtube.com")) {
      return null;
    }

    if (!parsed.pathname.startsWith("/shorts/")) {
      return null;
    }

    const shortId = parsed.pathname.split("/")[2];

    return shortId || null;
  } catch {
    return null;
  }
}
