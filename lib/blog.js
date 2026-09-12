// Reads blog posts straight from content/blog/*.mdx — there's no data
// array to keep in sync here, unlike products/categories/brands. To add
// a post: drop a new .mdx file in content/blog/, with a frontmatter
// block (title, excerpt, date, image, category) at the top. `category`
// should match a slug in lib/blog-categories.js. The filename (minus
// .mdx) becomes the URL slug.
//
// This only works in Server Components (it uses Node's `fs` module),
// which is fine — every page that calls it already is one.

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getAllPosts() {
	const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

	const posts = files.map((filename) => {
		const slug = filename.replace(/\.mdx$/, "");
		const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
		const { data, content } = matter(raw);
		return {
			slug,
			title: data.title,
			excerpt: data.excerpt,
			date: data.date,
			image: data.image || null,
			readTime: data.readTime,
			author: data.author,
			category: data.category || null,
			content, // raw MDX body, rendered by <MDXRemote> in app/blog/[slug]/page.jsx
		};
	});

	return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
	return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug) {
	return getAllPosts().filter((p) => p.category === categorySlug);
}
