import Link from "next/link";
import Image from "next/image";
import { assetUrl } from "@/lib/assets";
import { getProductsByCategory } from "@/lib/products";

// Category tiles with a reference picture above the name. Two sizes:
// 'compact' for the homepage row (capped at 4 tiles — see app/page.jsx),
// 'large' for the /categories index. Both boxes are 4:3 — that's the
// aspect ratio every category/product photo is expected to be shot or
// cropped to, so images fill the box edge-to-edge with no padding and no
// letterboxing (object-cover, not object-contain). The product count in
// the top-right corner is computed here from lib/products.js directly —
// nothing to pass in or keep in sync by hand.
export default function CategoryTiles({ categories, variant = "compact" }) {
	const large = variant === "large";

	return (
		<div
			className={
				large
					? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
					: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3"
			}>
			{categories.map((cat) => {
				const count = getProductsByCategory(cat.slug).length;
				return (
					<Link
						key={cat.slug}
						href={`/categories/${cat.slug}`}
						className="border border-gray-200 rounded-md overflow-hidden hover:border-navy transition-colors block cursor-pointer">
						<div className="relative aspect-[4/3] w-full bg-gray-50">
							{cat.image ? (
								<Image
									src={assetUrl(cat.image)}
									alt={cat.name}
									fill
									sizes="(max-width: 768px) 50vw, 300px"
									className="object-cover"
								/>
							) : (
								<span className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
									No photo
								</span>
							)}
							<span className="absolute top-2 right-2 bg-gray-900/50 text-white text-xs rounded px-1.5 py-1 leading-none">
								{count}
							</span>
						</div>
						<div className={large ? "p-4" : "p-2.5"}>
							<span
								className={
									large
										? "text-base font-medium text-gray-900"
										: "text-sm font-medium text-gray-800"
								}>
								{cat.name}
							</span>
						</div>
					</Link>
				);
			})}
		</div>
	);
}
