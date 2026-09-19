import Link from "next/link";
import Image from "next/image";

import { getAllPosts } from "@/lib/blog";
import { blogCategories, getBlogCategoryBySlug } from "@/lib/blog-categories";
import { assetUrl } from "@/lib/assets";

export const metadata = {
	title: "Sigma Industrial Insights",
	description:
		"Insights on industrial sourcing, manufacturing, engineering and exporting from India.",
};

export default function BlogPage({ searchParams }) {
	const activeCategory = searchParams?.category;

	const allPosts = getAllPosts();

	const posts = activeCategory
		? allPosts.filter((post) => post.category === activeCategory)
		: allPosts;

	const featuredPost = posts[0];
	const remainingPosts = posts.slice(1);

	return (
		<main>
			{/* INTRO */}
			<section className="border-b border-gray-200">
				<div className="mx-auto max-w-6xl px-5 sm:px-8 py-12 lg:py-14">
					<div className="max-w-2xl">
						<h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
							Practical insights for industrial buyers
						</h1>

						<p className="max-w-xl mt-4 text-gray-700">
							Insights on industrial sourcing, manufacturing, engineering and
							exporting from India, based on real requirements and supply
							experience.
						</p>
					</div>
				</div>
			</section>

			{/* CATEGORY FILTER */}
			<section className="border-b border-gray-200">
				<div className="mx-auto max-w-6xl px-5 sm:px-8">
					<div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-4 text-sm">
						<span className="text-xs text-gray-500 uppercase tracking-wide mr-1">
							Topics
						</span>

						<FilterLink href="/blog" active={!activeCategory} label="All" />

						{blogCategories.map((category) => (
							<FilterLink
								key={category.slug}
								href={`/blog?category=${category.slug}`}
								active={activeCategory === category.slug}
								label={category.label}
							/>
						))}
					</div>
				</div>
			</section>

			{/* FEATURED ARTICLE */}
			{featuredPost && (
				<section className="border-b border-gray-200">
					<div className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-sm text-gray-500 uppercase tracking-wide">
								Featured insight
							</h2>

							<span className="text-xs text-gray-400">01</span>
						</div>

						<Link href={`/blog/${featuredPost.slug}`} className="group block">
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
								{/* IMAGE */}
								{featuredPost.image && (
									<div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
										<Image
											src={assetUrl(featuredPost.image)}
											alt={featuredPost.title}
											fill
											sizes="
												(max-width: 1024px) 100vw,
												600px
											"
											className="object-cover rounded-md"
											priority
										/>
									</div>
								)}

								{/* CONTENT */}
								<div>
									<div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
										{getBlogCategoryBySlug(featuredPost.category) && (
											<span className="font-medium text-navy">
												{getBlogCategoryBySlug(featuredPost.category)?.label}
											</span>
										)}

										<span>·</span>

										<span>{formatDate(featuredPost.date)}</span>

										{featuredPost.readTime && (
											<>
												<span>·</span>
												<span>{featuredPost.readTime} min read</span>
											</>
										)}
									</div>

									<h2 className="mt-3 text-2xl sm:text-3xl font-semibold leading-tight text-gray-900 group-hover:text-navy transition-colors">
										{featuredPost.title}
									</h2>

									{featuredPost.excerpt && (
										<p className="mt-4 text-gray-700 leading-relaxed">
											{featuredPost.excerpt}
										</p>
									)}

									<div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-200">
										<div className="text-xs text-gray-500">
											By{" "}
											<span className="text-gray-700">
												{featuredPost.author}
											</span>
										</div>

										<span className="text-sm font-medium text-navy">
											Read article →
										</span>
									</div>
								</div>
							</div>
						</Link>
					</div>
				</section>
			)}

			{/* ARTICLE LIST */}
			{remainingPosts.length > 0 && (
				<section>
					<div className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
						<div className="flex items-end justify-between pb-5 border-b border-gray-200">
							<div>
								<div className="text-sm text-gray-500 uppercase tracking-wide mb-1">
									02 / Insights
								</div>

								<h2 className="text-2xl font-semibold text-gray-900">
									Latest articles
								</h2>
							</div>

							<span className="text-xs text-gray-500">
								{remainingPosts.length}{" "}
								{remainingPosts.length === 1 ? "article" : "articles"}
							</span>
						</div>

						<div>
							{remainingPosts.map((post, index) => {
								const category = getBlogCategoryBySlug(post.category);

								return (
									<Link
										key={post.slug}
										href={`/blog/${post.slug}`}
										className="
											group
											grid
											grid-cols-[40px_minmax(0,1fr)]
											sm:grid-cols-[48px_minmax(0,1fr)_120px]
											gap-4
											sm:gap-6
											py-6
											border-b
											border-gray-200
										">
										{/* NUMBER */}
										<div className="text-xs tabular-nums text-gray-400 pt-1">
											{String(index + 2).padStart(2, "0")}
										</div>

										{/* ARTICLE */}
										<div>
											<div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
												{category && (
													<span className="font-medium text-navy">
														{category.label}
													</span>
												)}

												<span>·</span>

												<span>{formatDate(post.date)}</span>

												{post.readTime && (
													<>
														<span>·</span>
														<span>{post.readTime} min</span>
													</>
												)}
											</div>

											<h3 className="mt-2 text-lg sm:text-xl font-semibold leading-snug text-gray-900 group-hover:text-navy transition-colors">
												{post.title}
											</h3>

											{post.excerpt && (
												<p className="max-w-2xl mt-1.5 text-sm sm:text-base text-gray-700 leading-relaxed">
													{post.excerpt}
												</p>
											)}
										</div>

										{/* DESKTOP AUTHOR */}
										<div className="hidden sm:block text-right text-xs text-gray-500 pt-1">
											{post.author}
										</div>
									</Link>
								);
							})}
						</div>
					</div>
				</section>
			)}
		</main>
	);
}

function FilterLink({ href, active, label }) {
	return (
		<Link
			href={href}
			className={`
				transition-colors
				duration-200
				${active ? "font-medium text-navy" : "text-gray-500 hover:text-gray-900"}
			`}>
			{label}
		</Link>
	);
}

function formatDate(date) {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}
