// Blog post types — a plain list, same open-ended pattern as everything
// else. A post's frontmatter `category` field should match one of these
// slugs (see content/blog/*.mdx). Add a new type here first, then use
// its slug in a post's frontmatter.
export const blogCategories = [
  { slug: 'thought-leadership', label: 'Thought Leadership' },
  { slug: 'buying-guides', label: 'Buying Guides' },
  { slug: 'case-studies', label: 'Case Studies' },
];

export function getBlogCategoryBySlug(slug) {
  return blogCategories.find((c) => c.slug === slug);
}
