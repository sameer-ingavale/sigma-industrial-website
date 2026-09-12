import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { brands, getBrandBySlug } from "@/lib/brands";
import { getProductsByBrand } from "@/lib/products";
import { shareMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { assetUrl } from "@/lib/assets";
import ProductCard from "@/components/ProductCard";
import EnquiryPrompt from "@/components/EnquiryPrompt";
import ShareButtons from "@/components/ShareButtons";

export function generateStaticParams() {
	return brands.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }) {
	const brand = getBrandBySlug(params.slug);
	if (!brand) return {};
	return shareMetadata({
		title: brand.name,
		description: `Products supplied under ${brand.name}, sourced from India and shipped worldwide.`,
		path: `/brands/${brand.slug}`,
		image: brand.logo,
	});
}

export default function BrandPage({ params }) {
	const brand = getBrandBySlug(params.slug);
	if (!brand) notFound();

	const brandProducts = getProductsByBrand(brand.slug);
	const pageUrl = `${siteConfig.url}/brands/${brand.slug}`;

	return (
		<>
			<div className="mx-auto max-w-6xl px-5 sm:px-8 pt-6 text-xs text-gray-500">
				<Link href="/brands" className="hover:text-navy">
					All Brands
				</Link>
			</div>

			{/* Name/logo + credentials sit above this section's border-b — the
          "divider" the credentials need to appear above, per the brief. */}
			<section className="mx-auto max-w-6xl px-5 sm:px-8 pt-4 pb-10 border-b border-gray-200">
				<div className="flex items-start justify-between gap-4">
					<div className="flex items-center gap-6">
						{brand.logo && (
							<div className="relative w-32 aspect-[3/2] border border-gray-200 rounded-md flex-shrink-0">
								<Image
									src={assetUrl(brand.logo)}
									alt={brand.name}
									fill
									className="object-contain p-2"
								/>
							</div>
						)}
						<h1 className="text-2xl font-bold text-gray-900 tracking-tight">
							{brand.name}
						</h1>
					</div>
					<ShareButtons url={pageUrl} title={brand.name} />
				</div>

				{/* Third-party credentials (ISO etc.) — clickable badges that
            open the actual certificate PDF in a new tab. See the
            `credentials` field comment in lib/brands.js. */}
				{brand.credentials?.length > 0 && (
					<div className="flex flex-wrap gap-2 mt-5">
						{brand.credentials.map((cred) => (
							<Credential key={cred.label} label={cred.label} url={cred.url} />
						))}
					</div>
				)}
			</section>

			<section className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
				{brandProducts.length === 0 ? (
					<p className="text-gray-700">
						No listings here yet — send us your spec directly.
					</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{brandProducts.map((p) => (
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

function Credential({ label, url }) {
	if (url) {
		return (
			<a
				href={assetUrl(url)}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-flex items-center gap-1.5 text-xs border border-gray-200 rounded-md px-3 py-1.5 text-gray-700 hover:border-navy hover:text-navy cursor-pointer">
				<svg
					width="12"
					height="12"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="3.5"
					className="text-trust"
					aria-hidden="true">
					<path d="M20 6L9 17l-5-5" />
				</svg>
				{label}
			</a>
		);
	}
	return (
		<span className="text-xs border border-gray-100 rounded-md px-3 py-1.5 text-gray-400">
			{label} — on request
		</span>
	);
}
