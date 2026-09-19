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
import ReadingProgress from "@/components/ReadingProgress";
import ArticleContents from "@/components/ArticleContents";
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
			{" "}
			<ReadingProgress /> {/* ARTICLE HEADER */}{" "}
			<header className="border-b border-gray-200">
				{" "}
				<div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 lg:py-12">
					{" "}
					{/* Breadcrumb */}{" "}
					<div className="flex items-center gap-2 text-xs text-gray-500">
						{" "}
						<Link href="/blog" className="hover:text-navy transition-colors">
							{" "}
							Blog{" "}
						</Link>{" "}
						<span className="text-gray-300">/</span>{" "}
						{category && (
							<span className="text-gray-500">{category.label}</span>
						)}{" "}
					</div>{" "}
					{/* Reading time + date */}{" "}
					<div className="flex items-center gap-3 mt-7 text-xs text-gray-600 uppercase">
						{" "}
						{post.readTime && <span>{post.readTime} min read</span>}{" "}
						{post.readTime && <span className="text-gray-300">·</span>}{" "}
						<span>Published {formattedDate}</span>{" "}
					</div>{" "}
					{/* Title */}{" "}
					<h1 className=" max-w-6xl mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-gray-900">
						{" "}
						{post.title}{" "}
					</h1>{" "}
					{/* Description / Excerpt */}{" "}
					{post.excerpt && (
						<p className="max-w-3xl mt-4 text-base sm:text-lg leading-relaxed text-gray-700">
							{" "}
							{post.excerpt}{" "}
						</p>
					)}{" "}
					{/* Author + Share */}{" "}
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mt-7">
						{" "}
						<div className="text-sm text-gray-600">
							{" "}
							<span>By </span>{" "}
							<span className="font-medium text-gray-900">
								{" "}
								{post.author}{" "}
							</span>{" "}
						</div>{" "}
						<ShareButtons url={pageUrl} title={post.title} />{" "}
					</div>{" "}
					{/* Hero Image */}{" "}
					{post.image && (
						<div className="relative w-full aspect-[16/8] mt-9 bg-gray-100 overflow-hidden">
							{" "}
							<Image
								src={assetUrl(post.image)}
								alt={post.title}
								fill
								sizes="100vw"
								className="object-cover rounded-md"
								priority
							/>{" "}
						</div>
					)}{" "}
				</div>{" "}
			</header>{" "}
			{/* ARTICLE BODY */}{" "}
			<div className="mx-auto max-w-6xl px-5 sm:px-8 pt-12 pb-20">
				{" "}
				<div className="grid grid-cols-1 lg:grid-cols-[200px_minmax(0,720px)] gap-x-12 justify-center">
					{" "}
					{/* Contents */} <ArticleContents /> {/* Reading Column */}{" "}
					<div className="article-content">
						{" "}
						<div className=" prose prose-gray max-w-none prose-p:font-serif prose-p:text-[19px] prose-p:leading-[1.75] prose-p:text-gray-800 prose-headings:font-sans prose-headings:font-semibold prose-headings:text-gray-900 prose-h2:text-[28px] prose-h2:leading-[1.35] prose-h2:mt-12 prose-h2:mb-5 prose-h3:text-[22px] prose-h3:leading-[1.4] prose-h3:mt-9 prose-h3:mb-4 prose-a:font-serif prose-a:text-navy prose-a:no-underline hover:prose-a:underline prose-li:font-serif prose-li:text-[18px] prose-li:leading-[1.75] prose-li:text-gray-700 prose-strong:font-semibold prose-strong:text-gray-900 prose-blockquote:font-serif prose-blockquote:text-[20px] prose-blockquote:leading-[1.6] prose-blockquote:text-gray-600 prose-blockquote:border-l-2 prose-blockquote:border-gray-300 prose-img:rounded-md prose-code:font-mono prose-code:text-[15px] prose-code:before:content-none prose-code:after:content-none prose-hr:border-gray-200 prose-headings:scroll-mt-24 ">
							{" "}
							<MDXRemote source={post.content} />{" "}
						</div>{" "}
					</div>{" "}
				</div>{" "}
			</div>{" "}
		</article>
	);
}
