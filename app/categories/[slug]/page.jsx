import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
	categories,
	getCategoryBySlug,
	getProductsByCategory,
} from "@/lib/products";
import { shareMetadata } from "@/lib/seo";
import { assetUrl } from "@/lib/assets";
import { siteConfig } from "@/lib/site-config";
import ProductCard from "@/components/ProductCard";
import EnquiryPrompt from "@/components/EnquiryPrompt";
import ShareButtons from "@/components/ShareButtons";

export function generateStaticParams() {
	return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
	const category = getCategoryBySlug(params.slug);
	if (!category) return {};
	return shareMetadata({
		title: category.name,
		description: category.description,
		path: `/categories/${category.slug}`,
		image: category.image,
	});
}

// Just this category's products. Brand browsing is a separate section —
// see /brands.
export default function CategoryPage({ params }) {
	const category = getCategoryBySlug(params.slug);
	if (!category) notFound();

	const categoryProducts = getProductsByCategory(category.slug);
	const pageUrl = `${siteConfig.url}/categories/${category.slug}`;

	return (
		<>
			<div className="mx-auto max-w-6xl px-5 sm:px-8 pt-6 text-xs text-gray-500">
				<Link href="/categories" className="hover:text-navy">
					All Categories
				</Link>
			</div>

			<section className="mx-auto max-w-6xl px-5 sm:px-8 pt-4 pb-10 border-b border-gray-200 grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-6 items-center">
				<div className="relative aspect-[4/3] w-full bg-gray-50 border border-gray-200 rounded-md overflow-hidden">
					{category.image ? (
						<Image
							src={assetUrl(category.image)}
							alt={category.name}
							fill
							sizes="240px"
							className="object-cover"
						/>
					) : (
						<span className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
							No photo
						</span>
					)}
				</div>
				<div className="flex items-start justify-between gap-4">
					<div>
						<h1 className="text-2xl font-bold text-gray-900 tracking-tight">
							{category.name}
						</h1>
						<p className="text-gray-700 mt-2">{category.description}</p>
					</div>
					<ShareButtons url={pageUrl} title={category.name} />
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
				{categoryProducts.length === 0 ? (
					<p className="text-gray-700 ">
						No listings here yet — send us your spec directly.
					</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{categoryProducts.map((p) => (
							<ProductCard key={p.slug} product={p} />
						))}
					</div>
				)}
			</section>

			<section className="mx-auto max-w-6xl px-5 sm:px-8 pb-14">
				<EnquiryPrompt />
			</section>
		</>
	);
}
