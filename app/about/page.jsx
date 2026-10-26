import Link from "next/link";
import Image from "next/image";
import {
	ClipboardCheck,
	SearchCheck,
	FileCheck2,
	PackageCheck,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { organizationJsonLd } from "@/lib/seo";
import { assetUrl } from "@/lib/assets";
import ComplianceLinks from "@/components/ComplianceLinks";

export const metadata = {
	title: "Company",
	description: `Founded ${siteConfig.foundedYear}. ${siteConfig.yearsInExport} years exporting industrial spares and equipment from India.`,
};

// "What we do" — one specific icon per point rather than a repeated
// generic checkmark, since each point is a different kind of work and
// should read as distinct at a glance, not as four items in one list.
const WHAT_WE_DO = [
	{
		icon: ClipboardCheck,
		title: "Hard-to-Source Requirements",
		body: "Can't find an obsolete component or uncommon part number? We cross-reference multiple supply networks to source exact matches.",
	},
	{
		icon: SearchCheck,
		title: "OEM & Alternate Sourcing",
		body: "We give you options. Choose original OEM components or vetted equivalent alternatives with complete techno-commercial transparency.",
	},
	{
		icon: FileCheck2,
		title: "Multi-Requirement Consildation",
		body: "Stop juggling 10 different suppliers. We consolidate your complex multi-category orders into one point of contact, one invoice, and one shipment.",
	},
	{
		icon: PackageCheck,
		title: "End-to-End Execution",
		body: "From pre-shipment quality inspection and packaging to international freight and export documentation, we handle every detail.",
	},
];

export default function AboutPage() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(organizationJsonLd()),
				}}
			/>

			<section>
				<div className="mx-auto max-w-3xl px-5 sm:px-8 pt-14 pb-11">
					<h1 className=" max-w-3xl mt-1 text-3xl lg:text-4xl font-bold tracking-tight leading-[1.05] text-gray-900 ">
						{" "}
						Your On-Ground Engineering & Sourcing Partner in India since
						2007{" "}
					</h1>
					<p className="text-gray-700 text-lg mt-3">
						We eliminate the friction, risk, and complexity of sourcing from
						India, making international procurement as seamless and reliable as
						buying locally
						{/* Sigma Industrial Solutions is the sister concern of{" "}
						<a
							href={siteConfig.sisterConcern.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-navy hover:underline">
							{siteConfig.sisterConcern.name}
						</a>
						, building on more than {siteConfig.yearsInExport} years of
						industrial export experience from India */}
					</p>
				</div>
			</section>

			{/* Full-width banner, standing in for what would otherwise be a
          plain divider line — two images, not one: a wide/short crop for
          desktop and a taller crop for mobile, swapped with plain
          responsive show/hide (no JS) so neither gets awkwardly cropped
          by the browser. Set both in lib/site-config.js → aboutBanner. */}
			<section className="border-y border-gray-200 bg-gray-50">
				{siteConfig.aboutBanner.desktop || siteConfig.aboutBanner.mobile ? (
					<>
						{siteConfig.aboutBanner.desktop && (
							<div className="relative hidden sm:block w-full aspect-[21/6]">
								<Image
									src={assetUrl(siteConfig.aboutBanner.desktop)}
									alt=""
									fill
									sizes="100vw"
									className="object-cover"
								/>
							</div>
						)}
						{siteConfig.aboutBanner.mobile && (
							<div className="relative sm:hidden w-full aspect-[4/3]">
								<Image
									src={assetUrl(siteConfig.aboutBanner.mobile)}
									alt=""
									fill
									sizes="100vw"
									className="object-cover"
								/>
							</div>
						)}
					</>
				) : (
					<div className="w-full aspect-[21/6] max-sm:aspect-[4/3] flex items-center justify-center">
						<span className="text-xs text-gray-400 text-center px-6">
							Banner placeholder — wide/short crop for desktop, taller crop for
							mobile
						</span>
					</div>
				)}
			</section>

			<section className="mx-auto max-w-3xl px-5 sm:px-8 py-12 space-y-12">
				{/* The differentiation case — stated plainly, not implied. This
            is the section doing the most positioning work on this page:
            "managed platform" vs. "trading agent" is a real distinction
            for a buyer who's been burned by an unreliable middleman
            before, so it's worth spelling out rather than assuming it
            comes across. */}
				{/* <div>
					<h2 className="text-sm text-gray-500 uppercase tracking-wide mb-3">
						Why buyers work with us
					</h2>
					<p className="text-gray-700 leading-relaxed mb-4">
						Finding specialized industrial parts globally can come with hidden
						risks: unverified suppliers, misaligned specs, quality issues, and
						export headaches.
					</p>
					<p>
						As an engineering-led procurement partner, we vet manufacturers,
						verify specifications, and oversee quality to deliver exactly what
						you need, on time and on budget.
					</p>
					<br />
					<ul className="space-y-4 text-gray-800">
						<li>
							<strong className="font-medium text-gray-900">
								• Hard-to-Source Requirements:
							</strong>{" "}
							Can't find an obsolete component or uncommon part number? We
							cross-reference multiple supply networks to source exact matches.
						</li>
						<li>
							<strong className="font-medium text-gray-900">
								• OEM & Alternate Sourcing:
							</strong>{" "}
							We give you options. Choose original OEM components or vetted
							equivalent alternatives with complete techno-commercial
							transparency.
						</li>
						<li>
							<strong className="font-medium text-gray-900">
								• Multi-Requirement Consildation:
							</strong>{" "}
							Stop juggling 10 different overseas suppliers. We consolidate your
							complex multi-category orders into one point of contact, one
							invoice, and one shipment.
						</li>
						<li>
							<strong className="font-medium text-gray-900">
								• End-to-End Execution:
							</strong>{" "}
							From pre-shipment quality inspection and packaging to
							international freight and export documentation, we handle every
							detail.
						</li>
					</ul>
				</div> */}
				<div>
					<h2 className="text-sm text-gray-500 uppercase tracking-wide mb-3">
						Why buyers work with us
					</h2>
					<p className="text-gray-700 leading-relaxed mb-6">
						Procuring industrial products globally can come with hidden risks:
						unverified suppliers, misaligned specs, quality issues, and export
						headaches. As an engineering-led procurement partner, we verify
						specifications and oversee quality to deliver exactly what you need,
						on time and on budget.
					</p>
					<div className="grid grid-cols-1 gap-x-8 gap-y-6">
						{WHAT_WE_DO.map(({ icon: Icon, title, body }) => (
							<div key={title} className="flex gap-4">
								<div className="w-8 h-8 rounded-md bg-navy/5 flex items-center justify-center flex-shrink-0 mt-1">
									<Icon
										className="w-5 h-5 text-navy"
										strokeWidth={1.75}
										aria-hidden="true"
									/>
								</div>
								<div>
									<p className="font-medium text-gray-900">{title}</p>
									<p className="text-gray-700 mt-1 leading-relaxed">{body}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="flex flex-col sm:flex-row gap-6 items-stretch ">
					<div className="relative w-full sm:w-48 aspect-[4/3] bg-gray-50 border border-gray-200 rounded-md overflow-hidden flex-shrink-0">
						{siteConfig.founderImage ? (
							<Image
								src={assetUrl(siteConfig.founderImage)}
								alt="Sameer Ingavale"
								fill
								sizes="192px"
								className="object-cover"
							/>
						) : (
							<span className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 text-center px-4">
								Photo placeholder
							</span>
						)}
					</div>
					<div>
						<h2 className="text-sm text-gray-500 uppercase tracking-wide mb-2">
							Who&apos;s behind this
						</h2>
						<p className="font-medium text-gray-900">
							<a
								href="https://www.linkedin.com/in/sameeringavale"
								target="_blank"
								rel="noopener noreferrer"
								className="text-navy transition-colors underline">
								Sameer Ingavale
							</a>
							, Founder
						</p>
						<p className="text-gray-700 mt-2 leading-relaxed">
							My focus at Sigma is to make India&apos;s fragmented industrial
							supply base easier for international buyers to access. We bring
							structure and dependability to the process—from RFQ through export
							execution.
						</p>
					</div>
				</div>
				<div>
					<h2 className="text-sm text-gray-500 uppercase tracking-wide mb-3">
						What &ldquo;Sigma Verified Manufacturer&rdquo; means
					</h2>
					<p className="text-gray-700 leading-relaxed">
						Some products on this site list the brand as &ldquo;Sigma Verified
						Manufacturer&rdquo;. These aren&apos;t large, globally known brands,
						they&apos;re mid-sized Indian manufacturers, often second or
						third-generation, who&apos;ve mastered one product category.
						We&apos;ve personally visited each one&apos;s manufacturing floor
						and screened them on quality, reliability, compliance, and
						cost-effectiveness before supplying their products to a client.
					</p>
				</div>
				<div>
					<h2 className="text-sm text-gray-500 uppercase tracking-wide mb-3">
						Terms & Capabilities
					</h2>
					<dl className="divide-y divide-gray-100 border-t border-gray-100">
						<Row label="Shipping" value={siteConfig.shipping.coverage} />
						<Row
							label="Freight"
							value={siteConfig.shipping.methods.join(" / ")}
						/>
						<Row label="Currency" value={siteConfig.shipping.currency} />
						<Row label="Credit terms" value={siteConfig.shipping.creditTerms} />
					</dl>
				</div>
				{/* The compliance documents get more room here than the
            low-key homepage version — this is the page someone visits
            specifically to check credentials. */}
				<div>
					<h2 className="text-sm text-gray-500 uppercase tracking-wide mb-3">
						Export documentation
					</h2>
					<p className="text-gray-700 mb-4">
						Our GST Certificate, Import Export Code, and RCMC are available for
						verification.
					</p>
					<ComplianceLinks docs={siteConfig.compliance} size="md" />
				</div>
				<div className="flex gap-3">
					<Link
						href="/categories"
						className="bg-navy text-white text-sm px-5 py-2.5 rounded-md hover:bg-navy/90">
						View catalog
					</Link>
					<Link
						href="/contact"
						className="border border-gray-300 text-sm px-5 py-2.5 rounded-md hover:border-navy">
						Contact us
					</Link>
				</div>
			</section>
		</>
	);
}

function Row({ label, value }) {
	return (
		<div className="grid grid-cols-[140px_1fr] gap-3 py-2">
			<dt className="text-gray-500">{label}</dt>
			<dd className="text-gray-900">{value}</dd>
		</div>
	);
}
