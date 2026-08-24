// Normalizes a path into a working URL for anything served from /public
// (images, PDFs). Files in /public are served from the site root, so a
// path MUST start with "/" (e.g. "/documents/tc.pdf", not
// "documents/tc.pdf") — without the leading slash, the browser resolves
// it relative to whatever page it's clicked from, which breaks the link
// on every page except the homepage. This function is a safety net for
// that exact mistake; it leaves full URLs (http/https) untouched.
export function assetUrl(path) {
  if (!path) return path;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
    return path;
  }
  return `/${path}`;
}
