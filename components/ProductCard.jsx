import Link from "next/link";
import Image from "next/image";
import { getCategoryBySlug } from "@/lib/products";
import { getBrandBySlug } from "@/lib/brands";
import { assetUrl } from "@/lib/assets";
import StatusBadge from "./StatusBadge";

// One card per product in catalog grids. Keep this scannable: image,
// name, one line, a couple of hard facts. No paragraph of copy here —
// that belongs on the product page, and even there, keep it short.
export default function ProductCard({ product }) {
	// Cards show only the primary (first) category to stay compact — the
	// product page itself lists every category a product belongs to.
	const category = getCategoryBySlug(product.categories[0]);
	const brand = getBrandBySlug(product.brand);

	return (
		<Link
			href={`/products/${product.slug}`}
			className="block border border-gray-200 rounded-md overflow-hidden hover:border-navy transition-colors bg-white cursor-pointer">
			<div className="relative aspect-[4/3] w-full bg-gray-50">
				{product.image ? (
					<Image
						src={assetUrl(product.image)}
						alt={product.name}
						fill
						sizes="(max-width: 768px) 50vw, 300px"
						className="object-cover"
					/>
				) : (
					<span className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
						No photo
					</span>
				)}
			</div>
			<div className="p-4">
				<p className="text-xs text-gray-500 uppercase tracking-wide">
					{category?.name}
				</p>
				<h3 className="font-medium text-gray-900 mt-1">{product.name}</h3>
				<p className="text-gray-700 mt-1">{product.application}</p>
				{product.indicativePrice && (
					<p className="font-semibold text-navy mt-2">
						{product.indicativePrice}
					</p>
				)}
				<p className="text-xs text-gray-500 mt-3 font-mono">
					{brand?.name} · HS {product.hsCode}
				</p>
			</div>
		</Link>
	);
}
