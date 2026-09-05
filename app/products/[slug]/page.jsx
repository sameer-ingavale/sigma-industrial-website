import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProductBySlug, getCategoryBySlug } from "@/lib/products";
import { getBrandBySlug } from "@/lib/brands";
import {
	productJsonLd,
	faqJsonLd,
	breadcrumbJsonLd,
	shareMetadata,
} from "@/lib/seo";
import { assetUrl } from "@/lib/assets";
import { siteConfig } from "@/lib/site-config";
import EnquiryForm from "@/components/EnquiryForm";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";
import ShareButtons from "@/components/ShareButtons";
import StatusBadge from "@/components/StatusBadge";
import { Download } from "lucide-react";
import BlurredPrice from "@/components/BlurredPrice";

// Pre-renders one page per product at build time.
export function generateStaticParams() {
	return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
	const product = getProductBySlug(params.slug);
	if (!product) return {};

	return shareMetadata({
		title: product.name,
		description: `${product.application} HS ${product.hsCode}.`,
		path: `/products/${product.slug}`,
		image: product.image,
	});
}

export default function ProductPage({ params }) {
	const product = getProductBySlug(params.slug);
	if (!product) notFound();

	// Product's own categories, resolved to full objects. The first one is
	// treated as "primary" for the breadcrumb; all of them are shown as
	// links both in the breadcrumb and in Specifications further down.
	const productCategories = product.categories
		.map((slug) => getCategoryBySlug(slug))
		.filter(Boolean);
	const primaryCategory = productCategories[0];
	const brand = getBrandBySlug(product.brand);
	const pageUrl = `${siteConfig.url}/products/${product.slug}`;

	// Lead time + origin city combine into one line, e.g. "5–7 days, EXW
	// Mumbai" — two separate fields in the data, one field in the UI.
	const leadTimeDisplay = product.originCity
		? `${product.leadTime}, EXW ${product.originCity}`
		: product.leadTime;

	// Attachments that are `false` are filtered out entirely (not offered
	// for this product) — see the tri-state explanation in lib/products.js.
	const attachments = [
		{ label: "Datasheet", url: product.datasheetUrl },
		{ label: "Drawing", url: product.drawingUrl },
		{ label: "Sample test certificate", url: product.testCertificateUrl },
	].filter((a) => a.url !== false);

	// Related = shares at least one category, excluding itself.
	const related = products
		.filter(
			(p) =>
				p.slug !== product.slug &&
				p.categories.some((c) => product.categories.includes(c)),
		)
		.slice(0, 3);

	const jsonLd = [
		productJsonLd(product),
		faqJsonLd(product.faqs),
		breadcrumbJsonLd([
			{ name: "Home", url: siteConfig.url },
			{ name: "Products", url: `${siteConfig.url}/products` },
			{
				name: primaryCategory ? primaryCategory.name : "",
				url: `${siteConfig.url}/categories/${product.categories[0]}`,
			},
			{ name: product.name, url: pageUrl },
		]),
	].filter(Boolean);

	return (
		<>
			{jsonLd.map((ld, i) => (
				<script
					key={i}
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
				/>
			))}

			<div className="mx-auto max-w-6xl px-5 sm:px-8 pt-6 text-xs text-gray-500">
				<Link href="/products" className="hover:text-navy">
					Products
				</Link>
				{productCategories.map((cat) => (
					<span key={cat.slug}>
						{" / "}
						<Link href={`/categories/${cat.slug}`} className="hover:text-navy">
							{cat.name}
						</Link>
					</span>
				))}
			</div>

			{/* Top: photo + facts, side by side. Kept minimal on purpose —
          origin country and HS code now live in Specifications below,
          not up here. */}
			<section className="mx-auto max-w-6xl px-5 sm:px-8 pt-6 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
				<ProductImage image={product.image} name={product.name} />

				<div>
					<div className="flex items-center justify-between">
						<StatusBadge status={product.status} />
						<ShareButtons url={pageUrl} title={product.name} />
					</div>
					<h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-2">
						{product.name}
					</h1>
					<p className="text-gray-700 mt-2">{product.application}</p>

					{product.indicativePrice && (
						<p className="mt-3 flex items-end gap-2">
							{/* 	<span className="text-sm text-gray-500 mb-0.5">From</span> */}
							<span className="text-2xl font-semibold text-navy">
								<BlurredPrice price={product.indicativePrice} />
							</span>
						</p>
					)}

					<dl className="mt-6 divide-y divide-gray-200 border-t border-gray-200">
						{/* Model number and part numbers each only show if they have
                a value — see the field comment in lib/products.js. The
                catalogue link sits inside the model-number row on
                purpose: no model number means no catalogue link either,
                without needing a separate check anywhere. */}
						{product.modelNumber && (
							<Fact label="Model number">
								<span className="font-mono">{product.modelNumber}</span>
								{product.catalogueUrl !== false && (
									<span className="block mt-1">
										{product.catalogueUrl ? (
											<a
												href={assetUrl(product.catalogueUrl)}
												target="_blank"
												rel="noopener noreferrer"
												className="text-navy hover:underline cursor-pointer">
												Explore the full catalog →
											</a>
										) : (
											<span className="text-gray-500 text-sm">
												Full catalogue available on request
											</span>
										)}
									</span>
								)}
							</Fact>
						)}
						{product.partNumbers?.length > 0 && (
							<Fact label="Part number(s)">
								<span className="font-mono">
									{product.partNumbers.join(", ")}
								</span>
							</Fact>
						)}
						<Fact label="OEM brand">
							<Link
								href={`/brands/${product.brand}`}
								className="hover:underline inline-flex items-center gap-1.5 cursor-pointer">
								{/* The green dot flags the shared Sigma Verified
                    Manufacturer brand as vetted, at a glance — see
                    lib/brands.js. Named brands (JCB, Fenner, ...) don't
                    need the flag, they're just a name. */}
								{brand?.origin === "verified" && (
									<span
										className="w-1.5 h-1.5 rounded-full bg-trust"
										aria-hidden="true"
									/>
								)}
								<span
									className={
										brand?.origin === "verified" ? "text-trust" : "text-navy"
									}>
									{brand?.name}
								</span>
							</Link>
						</Fact>
						{product.crossReferenceBrands?.length > 0 && (
							<Fact label="Alternate Brands">
								{product.crossReferenceBrands.join(", ")}
							</Fact>
						)}
						<Fact label="Lead time">{leadTimeDisplay}</Fact>
						<Fact label="MOQ">{product.moq}</Fact>
					</dl>

					<div className="flex gap-3 mt-6">
						<a
							href="#enquire"
							className="bg-accent text-white text-sm px-5 py-2.5 rounded-md hover:bg-accent/90">
							Enquire Now
						</a>
						{/* Prefilled with the product page link + a short opener,
                not a blank chat — and WhatsApp's own deeper brand green,
                since that's the immediate visual cue for what this
                button does before anyone reads the label. */}
						<a
							href={`${siteConfig.whatsappUrl}?text=${encodeURIComponent(`I'm interested in this product: ${product.name} — ${pageUrl}`)}`}
							target="_blank"
							rel="noopener noreferrer"
							className="bg-[#26CC66] text-white text-sm px-5 py-2.5 rounded-md hover:bg-[#128C7E]/90">
							WhatsApp Us
						</a>
					</div>
				</div>
			</section>

			{/* Form column widened slightly (3/7 instead of 2/5) so the fields
          don't feel cramped. */}
			<div className="mx-auto max-w-6xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-8 gap-10 pb-16 border-t border-gray-200 pt-10">
				<div className="lg:col-span-4 space-y-10">
					{/* Specifications — product-specific specs first, then
              Categories, HS code, and Origin at the bottom, in that
              order. Categories are clickable, same treatment as the
              brand link above. */}
					<div>
						<h2 className="text-sm text-gray-500 uppercase tracking-wide mb-3">
							Specifications
						</h2>
						<table className="w-full">
							<tbody>
								{product.specifications.map((spec) => (
									<tr key={spec.label} className="border-b border-gray-100">
										<td className="py-2 pr-4 text-gray-500 w-1/3 align-top">
											{spec.label}
										</td>
										<td className="py-2 text-gray-900">{spec.value}</td>
									</tr>
								))}
								{productCategories.length > 0 && (
									<tr className="border-b border-gray-100">
										<td className="py-2 pr-4 text-gray-500 w-1/3 align-top">
											Categories
										</td>
										<td className="py-2 text-gray-900">
											{productCategories.map((cat, i) => (
												<span key={cat.slug}>
													{i > 0 && ", "}
													<Link
														href={`/categories/${cat.slug}`}
														className="text-navy hover:underline cursor-pointer">
														{cat.name}
													</Link>
												</span>
											))}
										</td>
									</tr>
								)}
								<tr className="border-b border-gray-100">
									<td className="py-2 pr-4 text-gray-500 w-1/3 align-top">
										HS code
									</td>
									<td className="py-2 text-gray-900 font-mono">
										{product.hsCode}
									</td>
								</tr>
								<tr className="border-b border-gray-100">
									<td className="py-2 pr-4 text-gray-500 w-1/3 align-top">
										Origin
									</td>
									<td className="py-2 text-gray-900">
										{product.countryOfOrigin}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					{/* Industries — below Specifications, above Attachments, per
              request. Static tags for now; see the field comment in
              lib/products.js for how to make these clickable later. */}
					{product.industries?.length > 0 && (
						<div>
							<h2 className="text-sm text-gray-500 uppercase tracking-wide mb-3">
								Industries
							</h2>
							<div className="flex flex-wrap gap-2">
								{product.industries.map((industry) => (
									<span
										key={industry}
										className="text-sm border border-gray-200 rounded-md px-2.5 py-1 text-gray-700">
										{industry}
									</span>
								))}
							</div>
						</div>
					)}
					{/* Attachments — only shown at all if at least one isn't `false` */}
					{attachments.length > 0 && (
						<div>
							<h2 className="text-sm text-gray-500 uppercase tracking-wide mb-3">
								Attachments
							</h2>
							<div className="flex flex-wrap gap-3">
								{attachments.map((a) => (
									<Attachment key={a.label} label={a.label} url={a.url} />
								))}
							</div>
						</div>
					)}

					{product.faqs?.length > 0 && (
						<div>
							<h2 className="text-sm text-gray-500 uppercase tracking-wide mb-3">
								Common sourcing questions
							</h2>

							<div className="divide-y border-y">
								{product.faqs.map((faq) => (
									<details key={faq.question} className="group py-4">
										<summary className="flex items-center justify-between cursor-pointer font-medium text-gray-800 list-none">
											{faq.question}
											<span className="font-normal ml-4 text-gray-500 group-open:rotate-45 transition-transform">
												+
											</span>
										</summary>
										<p className="text-gray-700 mt-3">{faq.answer}</p>
									</details>
								))}
							</div>
						</div>
					)}

					{/* 	{product.faqs?.length > 0 && (
						<div>
							<h2 className="text-sm text-gray-500 uppercase tracking-wide mb-3">
								Common sourcing questions
							</h2>
							<div className="space-y-3">
								{product.faqs.map((faq) => (
									<div key={faq.question}>
										<p className="font-medium text-gray-900">{faq.question}</p>
										<p className="text-gray-700">{faq.answer}</p>
									</div>
								))}
							</div>
						</div>
					)} */}
				</div>

				{/* Enquiry form */}
				<div className="lg:col-span-4 lg:top-24 h-fit border border-gray-200 rounded-md p-6">
					<h2 className="font-semibold text-gray-900 mb-4">
						Get Pricing & Lead Time
					</h2>
					<EnquiryForm productName={product.name} productSlug={product.slug} />
				</div>
			</div>

			{related.length > 0 && (
				<section className="mx-auto max-w-6xl px-5 sm:px-8 pb-16 border-t border-gray-200 pt-10">
					<h2 className="text-sm text-gray-500 uppercase tracking-wide mb-4">
						Related
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
						{related.map((p) => (
							<ProductCard key={p.slug} product={p} />
						))}
					</div>
				</section>
			)}
		</>
	);
}

function Fact({ label, children }) {
	return (
		<div className="grid grid-cols-[130px_1fr] gap-3 py-2 border-b border-gray-100">
			<dt className="text-gray-500">{label}</dt>
			<dd className="text-gray-900">{children}</dd>
		</div>
	);
}

// `url` here is only ever null or a string — the `false` (not offered)
// case is filtered out by the caller before this ever renders. Opens in
// a new tab, never downloads automatically — same for every PDF link on
// the site.
function Attachment({ label, url }) {
	if (url) {
		return (
			<a
				href={assetUrl(url)}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-flex items-center gap-1.5 border border-gray-300 rounded-md px-4 py-2 text-sm hover:border-navy cursor-pointer">
				{/* Green check = genuinely available now, vs. gray "on request"
            below — a quick visual scan of which documents are ready. */}
				<Download
					className="w-3.5 h-3.5 text-navy/90 flex-shrink-0"
					strokeWidth={2}
					aria-hidden="true"
				/>
				{label}
			</a>
		);
	}
	return (
		<span className="border border-gray-200 rounded-md px-4 py-2 text-sm text-gray-400">
			{label} — on request
		</span>
	);
}

/* function CheckIcon({ className = "" }) {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="3"
			className={className}
			aria-hidden="true">
			<path d="M20 6L9 17l-5-5" />
		</svg>
	);
} */
