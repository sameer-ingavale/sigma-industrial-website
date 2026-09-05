import ProductSearch from "@/components/ProductSearch";
import EnquiryPrompt from "@/components/EnquiryPrompt";
import { products } from "@/lib/products";

export const metadata = {
	title: "Product Catalog",
	description:
		"Industrial spares and equipment sourced from India, shipped worldwide.",
};

// The full catalog, search-only. Category browsing lives at /categories,
// brand browsing at /brands — no filters duplicated here.
export default function ProductsPage() {
	return (
		<>
			<section className="border-b border-gray-200">
				<div className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
					<h1 className="text-2xl font-semibold text-gray-900">
						Product Catalog
					</h1>
					<p className="text-gray-700 mt-2 max-w-xl">
						This catalog is a reference point, not a complete list of what we
						can supply. Not in the catalog? Send us the part number, photo,
						nameplate or equipment details. We&apos;ll take it from there.
					</p>
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
				<ProductSearch products={products} />
			</section>

			<section className="mx-auto max-w-6xl px-5 sm:px-8 pb-14">
				<EnquiryPrompt />
			</section>
		</>
	);
}
