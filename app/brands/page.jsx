import Link from "next/link";
import Image from "next/image";
import BrandGrid from "@/components/BrandGrid";
import EnquiryPrompt from "@/components/EnquiryPrompt";
import { brands } from "@/lib/brands";
import { siteConfig } from "@/lib/site-config";
import { assetUrl } from "@/lib/assets";

export const metadata = {
	title: "Brands",
	description: "OEM brands and verified Indian manufacturers we source from.",
};

// Three sections — Indian named brands get top billing over
// international ones on purpose (that's the differentiation this
// catalog is built around), then Sigma Verified Manufacturers last as
// one wide banner instead of a grid, since it's a single shared brand
// for every undisclosed manufacturer, not several — see lib/brands.js.
export default function BrandsPage() {
	const indian = brands.filter((b) => b.origin === "indian");
	const international = brands.filter((b) => b.origin === "international");
	const verified = brands.find((b) => b.origin === "verified");

	return (
		<>
			<section className="border-b border-gray-200">
				<div className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
					<h1 className="text-2xl font-semibold text-gray-900">
						Selected Brands
					</h1>
					<p className="text-gray-700 mt-2 max-w-xl">
						We source from renowned OEM brands and screened Indian
						manufacturers. Send us the OEM part number, model number or
						technical specifications. We&apos;ll take it from there.
					</p>
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-5 sm:px-8 py-10 space-y-12">
				{indian.length > 0 && (
					<div>
						<h2 className="text-sm text-gray-500 uppercase tracking-wide mb-4">
							Indian
						</h2>
						<BrandGrid brands={indian} />
					</div>
				)}

				{international.length > 0 && (
					<div>
						<h2 className="text-sm text-gray-500 uppercase tracking-wide mb-4">
							International
						</h2>
						<BrandGrid brands={international} />
					</div>
				)}

				{verified && (
					<div>
						<h2 className="text-sm text-gray-500 uppercase tracking-wide mb-4">
							Sigma Verified Manufacturers
						</h2>
						<Link
							href={`/brands/${verified.slug}`}
							className="relative block w-full h-32 border border-gray-200 rounded-md overflow-hidden hover:border-navy transition-colors cursor-pointer">
							{siteConfig.sigmaVerifiedBanner ? (
								<Image
									src={assetUrl(siteConfig.sigmaVerifiedBanner)}
									alt="Sigma Verified Manufacturers"
									width={300}
									height={100}
									/* fill */
									/* sizes="100vw" */
									/* 	className="object-cover" */
								/>
							) : (
								<span className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 text-center px-6">
									{/* Banner placeholder — full width, same height as the tiles
									above */}
								</span>
							)}
						</Link>
					</div>
				)}
			</section>

			<section className="mx-auto max-w-6xl px-5 sm:px-8 pb-14">
				<EnquiryPrompt />
			</section>
		</>
	);
}
