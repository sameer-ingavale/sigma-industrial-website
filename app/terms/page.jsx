import { siteConfig } from "@/lib/site-config";

export const metadata = {
	title: "Terms of Use",
	description: `Terms governing use of the ${siteConfig.name} website.`,
};

export default function TermsPage() {
	return (
		<section className="mx-auto max-w-3xl px-5 sm:px-8 py-14">
			<p className="text-sm text-gray-500">Last updated: September 2026</p>
			<h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">
				Terms of Use
			</h1>
			<p className="text-gray-700 mt-3 leading-relaxed">
				Welcome to {siteConfig.url.replace("https://", "")}, operated by{" "}
				{siteConfig.name} (&ldquo;Sigma&rdquo;, &ldquo;we&rdquo;,
				&ldquo;us&rdquo; or &ldquo;our&rdquo;). By accessing or using this
				website, you agree to these Terms of Use.
			</p>

			<div className="mt-10 space-y-8">
				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						1. Website Information
					</h2>
					<p className="text-gray-700 leading-relaxed">
						The information published on this website is provided for general
						commercial and informational purposes. We make reasonable efforts to
						keep product descriptions, specifications, images, availability, and
						other information accurate. However, information may change without
						notice and should not be treated as a final technical or commercial
						specification unless confirmed by Sigma in writing.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						2. Product Enquiries and Quotations
					</h2>
					<p className="text-gray-700 leading-relaxed">
						Submitting an enquiry through the website does not constitute an
						order or create a contract. Where a product page displays an
						indicative price, that figure is a starting reference only — it is
						not a quotation and is not binding. Prices, specifications,
						quantities, lead times, availability, shipping terms, payment terms,
						and other commercial conditions are subject to confirmation by
						Sigma. A quotation issued by Sigma is subject to the terms and
						validity stated in that quotation.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						3. Product Specifications
					</h2>
					<p className="text-gray-700 leading-relaxed">
						Industrial products may be manufactured to different standards,
						configurations, and specifications depending on the manufacturer and
						application. Customers are responsible for confirming that a product
						is suitable for their intended application. Where technical
						suitability is critical, the applicable specifications, drawings,
						standards, and documentation should be reviewed and confirmed before
						ordering.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						4. Third-Party Brands
					</h2>
					<p className="text-gray-700 leading-relaxed">
						References to manufacturers, brands, trademarks, or product names
						belong to their respective owners. Unless expressly stated
						otherwise, Sigma is not affiliated with or authorised by any
						third-party manufacturer whose products or brands may be referenced
						on this website. References to alternative or commonly specified
						brands are provided to assist procurement and sourcing and do not,
						by themselves, constitute a claim of OEM equivalence or
						interchangeability.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						5. Website Content
					</h2>
					<p className="text-gray-700 leading-relaxed">
						All website content, including text, graphics, images, logos,
						layouts, and other material, is owned by or licensed to Sigma unless
						otherwise stated. You may not reproduce, copy, modify, distribute,
						or commercially exploit website content without prior written
						permission.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						6. External Links
					</h2>
					<p className="text-gray-700 leading-relaxed">
						The website may contain links to third-party websites or services,
						including WhatsApp. Sigma is not responsible for the content,
						availability, security, or privacy practices of third-party
						websites.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						7. Limitation of Liability
					</h2>
					<p className="text-gray-700 leading-relaxed">
						To the extent permitted by applicable law, Sigma shall not be liable
						for indirect, incidental, or consequential losses arising from
						reliance on information published on this website. Nothing in these
						Terms excludes liability that cannot legally be excluded or limited.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						8. Changes to These Terms
					</h2>
					<p className="text-gray-700 leading-relaxed">
						Sigma may update these Terms of Use from time to time. The updated
						version will be published on this page.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						9. Contact
					</h2>
					<p className="text-gray-700 leading-relaxed">
						For questions regarding these Terms:
					</p>
					<p className="text-gray-700 leading-relaxed mt-2">
						{siteConfig.legalName}
						<br />
						{siteConfig.location.streetAddress},{" "}
						{siteConfig.location.addressLocality}
						<br />
						{siteConfig.location.addressRegion} {siteConfig.location.postalCode}
						, India
						<br />
						Email:{" "}
						<a
							href={`mailto:${siteConfig.contactEmail}`}
							className="text-navy hover:underline">
							{siteConfig.contactEmail}
						</a>
					</p>
				</div>
			</div>
		</section>
	);
}
