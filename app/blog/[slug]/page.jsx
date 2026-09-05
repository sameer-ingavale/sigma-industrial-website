import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getBlogCategoryBySlug } from "@/lib/blog-categories";
import { shareMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { assetUrl } from "@/lib/assets";
import ShareButtons from "@/components/ShareButtons";

export function generateStaticParams() {
	return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
	const post = getPostBySlug(params.slug);
	if (!post) return {};
	return shareMetadata({
		title: post.title,
		description: post.excerpt,
		path: `/blog/${post.slug}`,
		image: post.image,
	});
}

export default function BlogPostPage({ params }) {
	const post = getPostBySlug(params.slug);
	if (!post) notFound();

	const category = getBlogCategoryBySlug(post.category);
	const pageUrl = `${siteConfig.url}/blog/${post.slug}`;
	const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<article>
			<div className="mx-auto max-w-3xl px-5 sm:px-8 py-10">
				<Link href="/blog" className="text-xs text-gray-500 hover:text-navy">
					← Blog
				</Link>

				<div className="flex items-start justify-between gap-4 mt-4">
					<div>
						<div className="flex items-center gap-3 text-sm text-gray-500">
							{category && (
								<span className="text-navy font-medium">{category.label}</span>
							)}
							<span>{formattedDate}</span>
						</div>
						<h1 className="text-3xl font-bold text-gray-900 mt-2 leading-tight">
							{post.title}
						</h1>
					</div>
					<ShareButtons url={pageUrl} title={post.title} />
				</div>
				{post.image && (
					<div className="relative w-full aspect-[21/9] bg-gray-50 mt-6">
						<Image
							src={assetUrl(post.image)}
							alt={post.title}
							fill
							sizes="100vw"
							className="object-cover rounded-md"
							priority
						/>
					</div>
				)}

				{/* @tailwindcss/typography styles every element the MDX body
            produces (headings, lists, blockquotes, links) without hand
            styling each one — see tailwind.config.js plugins. */}
				{/* <div className="prose prose-slate prose-headings:font-semibold prose-a:text-navy max-w-none mt-8 prose-p:text-lg">
					<MDXRemote source={post.content} />
				</div> */}
				<div
					className="
		prose prose-slate max-w-none mt-8

		prose-p:font-serif
		prose-p:text-[20px]
		prose-p:leading-[1.75]
		prose-p:text-slate-700


		prose-headings:font-sans
		prose-headings:font-semibold
		prose-headings:text-slate-900
		prose-h2:text-[28px]
		prose-h2:leading-[1.3]
		prose-h2:mt-14
		prose-h2:mb-5
		prose-h3:text-[22px]
		prose-h3:leading-[1.4]
		prose-h3:mt-10
		prose-h3:mb-4


		prose-a:font-serif
		prose-a:text-navy
		prose-a:no-underline
		hover:prose-a:underline


		prose-li:font-serif
		prose-li:text-[19px]
		prose-li:leading-[1.75]
		prose-li:text-slate-700


		prose-strong:font-semibold
		prose-strong:text-slate-900


		prose-blockquote:font-serif
		prose-blockquote:text-[21px]
		prose-blockquote:leading-[1.6]
		prose-blockquote:text-slate-600
		prose-blockquote:border-l-2
		prose-blockquote:border-slate-300


		prose-img:rounded-lg


		prose-code:font-mono
		prose-code:text-[15px]
		prose-code:before:content-none
		prose-code:after:content-none


		prose-hr:border-slate-200
	">
					<MDXRemote source={post.content} />
				</div>
			</div>
		</article>
	);
}
