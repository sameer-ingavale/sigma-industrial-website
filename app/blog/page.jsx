import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import { blogCategories, getBlogCategoryBySlug } from "@/lib/blog-categories";
import { assetUrl } from "@/lib/assets";

export const metadata = {
	title: "Blog",
	description: "Notes on industrial sourcing and export from India.",
};

// A list, not a tile grid — closer to how a trade publication or a
// company insights page reads, which suits a handful of substantial
// posts better than a product-style grid. Thumbnails are wide
// rectangles (16:9), not small squares — these are meant to carry some
// visual weight, not just decorate a row.
export default function BlogPage({ searchParams }) {
	const activeCategory = searchParams?.category;
	const allPosts = getAllPosts();
	const posts = activeCategory
		? allPosts.filter((p) => p.category === activeCategory)
		: allPosts;

	return (
		<>
			<section className="border-b border-gray-200">
				<div className="mx-auto max-w-3xl px-5 sm:px-8 py-10">
					<h1 className="text-2xl font-semibold text-gray-900">Blog</h1>
				</div>
			</section>

			<section className="mx-auto max-w-3xl px-5 sm:px-8 pt-8">
				<div className="flex flex-wrap gap-2">
					<FilterPill href="/blog" active={!activeCategory} label="All" />
					{blogCategories.map((cat) => (
						<FilterPill
							key={cat.slug}
							href={`/blog?category=${cat.slug}`}
							active={activeCategory === cat.slug}
							label={cat.label}
						/>
					))}
				</div>
			</section>

			<section className="mx-auto max-w-3xl px-5 sm:px-8 py-10">
				{posts.length === 0 ? (
					<p className="text-gray-700 ">No posts in this category yet.</p>
				) : (
					<div className="divide-y divide-gray-200">
						{posts.map((post) => {
							const category = getBlogCategoryBySlug(post.category);
							return (
								<Link
									key={post.slug}
									href={`/blog/${post.slug}`}
									className="group block py-8 first:pt-0">
									<div className="relative w-full aspect-[21/9] bg-gray-50 rounded-md overflow-hidden">
										{post.image ? (
											<Image
												src={assetUrl(post.image)}
												alt={post.title}
												width={1915}
												height={821}
												sizes="(max-width: 768px) 100vw, 700px"
												className="w-full h-auto rounded-md"
											/>
										) : (
											<span className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
												No photo
											</span>
										)}
									</div>
									<div className="mt-4">
										<div className="flex items-center gap-3 text-xs text-gray-500">
											{category && (
												<span className="text-navy font-medium">
													{category.label}
												</span>
											)}
											<span>
												{new Date(post.date).toLocaleDateString("en-US", {
													year: "numeric",
													month: "long",
													day: "numeric",
												})}
											</span>
										</div>
										<h2 className="text-xl font-semibold text-gray-900 mt-1 group-hover:text-navy">
											{post.title}
										</h2>
										<p className="text-gray-700 mt-2 leading-relaxed">
											{post.excerpt}
										</p>
										<span className="text-sm text-accent font-medium mt-3 inline-block">
											Read more →
										</span>
									</div>
								</Link>
							);
						})}
					</div>
				)}
			</section>
		</>
	);
}

function FilterPill({ href, active, label }) {
	return (
		<Link
			href={href}
			className={`text-sm px-3 py-1.5 rounded-md border ${
				active
					? "bg-navy text-white border-navy"
					: "border-gray-300 text-gray-700 hover:border-navy"
			}`}>
			{label}
		</Link>
	);
}
