import CategoryTiles from "@/components/CategoryTiles";
import EnquiryPrompt from "@/components/EnquiryPrompt";
import { categories } from "@/lib/products";

export const metadata = {
	title: "Categories",
	description:
		"Every product category we supply, sourced from India and shipped worldwide.",
};

export default function CategoriesPage() {
	return (
		<>
			<section className="border-b border-gray-200">
				<div className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
					<h1 className="text-2xl font-semibold text-gray-900">
						Selected Categories
					</h1>
					<p className="text-gray-700 mt-2 max-w-xl">
						These are not exhaustive. We also work with requirements outside
						these categories. Send us the part number, photo, nameplate or
						equipment details. We&apos;ll take it from there.
					</p>
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
				<CategoryTiles categories={categories} variant="large" />
			</section>

			<section className="mx-auto max-w-6xl px-5 sm:px-8 pb-14">
				<EnquiryPrompt />
			</section>
		</>
	);
}
