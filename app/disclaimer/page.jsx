import { siteConfig } from "@/lib/site-config";

export const metadata = {
	title: "Disclaimer",
	description: `Important disclaimers regarding product information on the ${siteConfig.name} website.`,
};

export default function DisclaimerPage() {
	return (
		<section className="mx-auto max-w-3xl px-5 sm:px-8 py-14">
			<p className="text-sm text-gray-500">Last updated: September 2026</p>
			<h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">
				Disclaimer
			</h1>
			<p className="text-gray-700 mt-3 leading-relaxed">
				The information provided on {siteConfig.url.replace("https://", "")} is
				intended to assist customers with industrial product research and
				sourcing. While {siteConfig.name} makes reasonable efforts to maintain
				accurate and useful information, the website should not be considered a
				substitute for manufacturer documentation, engineering review, or
				written commercial confirmation.
			</p>

			<div className="mt-10 space-y-8">
				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						Product Information
					</h2>
					<p className="text-gray-700 leading-relaxed">
						Product descriptions, specifications, dimensions, materials, images,
						standards, applications, prices, and lead times may change without
						notice. Actual products may differ from website images or
						descriptions due to manufacturer revisions, configuration changes,
						or application-specific requirements. Customers should confirm
						critical technical and commercial details with Sigma before placing
						an order.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						Technical Suitability
					</h2>
					<p className="text-gray-700 leading-relaxed">
						The inclusion of a product for a particular application or industry
						does not constitute a guarantee that the product is suitable for
						every installation or operating condition. The customer is
						responsible for confirming suitability based on the actual operating
						conditions, applicable standards, design requirements, and
						manufacturer recommendations.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						Brands, Cross-References &amp; Verified Manufacturers
					</h2>
					<p className="text-gray-700 leading-relaxed">
						Brand names and trademarks referenced on this website belong to
						their respective owners. References to alternative brands, commonly
						specified brands, replacement products, or cross-references are
						intended to assist procurement and sourcing. They do not
						automatically imply OEM equivalence, interchangeability,
						authorisation, or affiliation. Where interchangeability is
						technically important, the applicable specifications and dimensions
						should be verified before purchase.
					</p>
					<p className="text-gray-700 leading-relaxed mt-3">
						Some products are listed under &ldquo;Sigma Verified
						Manufacturer&rdquo; instead of a named brand. This denotes a
						manufacturer that Sigma has directly assessed for quality,
						reliability, and compliance, whose identity we do not disclose
						publicly on this website. It is not a claim of certification by any
						external body, and it does not imply that the manufacturer is
						otherwise unbranded or unregistered.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						Pricing &amp; Availability
					</h2>
					<p className="text-gray-700 leading-relaxed">
						Any pricing, availability, or lead-time information displayed on the
						website — including any partially obscured indicative price shown on
						a product page — is indicative only unless expressly stated
						otherwise, and does not constitute an offer capable of acceptance.
						Final pricing and commercial terms are subject to quotation and
						written confirmation.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						External Information
					</h2>
					<p className="text-gray-700 leading-relaxed">
						Sigma may link to external websites, manufacturer resources, or
						other third-party information for reference. Sigma does not
						guarantee the accuracy, completeness, or availability of third-party
						content.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						No Warranty
					</h2>
					<p className="text-gray-700 leading-relaxed">
						To the extent permitted by applicable law, Sigma provides website
						information on an &ldquo;as is&rdquo; basis and makes no warranty
						that the information will always be complete, current, or
						error-free.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">Contact</h2>
					<p className="text-gray-700 leading-relaxed">
						For product-specific technical or commercial clarification, please
						contact Sigma before relying on information published on this
						website.
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
