import Image from "next/image";
import EnquiryForm from "@/components/EnquiryForm";
import { siteConfig } from "@/lib/site-config";
import { assetUrl } from "@/lib/assets";

export const metadata = {
	title: "Contact",
	description: "Phone, WhatsApp, email, and a general enquiry form.",
};

export default function ContactPage() {
	return (
		<section className="mx-auto max-w-6xl px-5 sm:px-8 py-14 grid grid-cols-1 lg:grid-cols-3 gap-12">
			<div className="space-y-6">
				<h1 className="text-2xl font-semibold text-gray-900">Contact</h1>

				<Detail label="Phone">
					<a
						href={`tel:${siteConfig.phone}`}
						className="text-navy hover:underline">
						{siteConfig.phone}
					</a>
				</Detail>
				<Detail label="WhatsApp">
					<a
						href={siteConfig.whatsappUrl}
						className="text-navy hover:underline">
						{siteConfig.phone}
					</a>
				</Detail>
				<Detail label="Email">
					<a
						href={`mailto:${siteConfig.contactEmail}`}
						className="text-navy hover:underline">
						{siteConfig.contactEmail}
					</a>
				</Detail>
				<Detail label="Office">
					{siteConfig.location.streetAddress},{" "}
					{siteConfig.location.addressLocality}
					<br />
					{siteConfig.location.addressRegion} {siteConfig.location.postalCode},
					India
				</Detail>

				{/* A photo of the office or the person answering enquiries — see
            the comment on contactImage in lib/site-config.js. */}
				{/* <div className="relative aspect-[4/3] w-full bg-gray-50 border border-gray-200 rounded-md overflow-hidden">
					{siteConfig.contactImage ? (
						<Image
							src={assetUrl(siteConfig.contactImage)}
							alt=""
							fill
							sizes="(max-width: 1024px) 100vw, 340px"
							className="object-cover"
						/>
					) : (
						<span className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 text-center px-6">
							Photo placeholder — office or team
						</span>
					)}
				</div> */}
			</div>

			<div className="lg:col-span-2 border border-gray-200 rounded-md p-6">
				<h2 className="font-semibold text-gray-900 mb-2 text-lg">
					Send us your requirement
				</h2>
				<p className="text-gray-700 mb-4 max-w-xl text-base">
					We usually get back within 1-2 business days
				</p>
				<EnquiryForm />
			</div>
		</section>
	);
}

function Detail({ label, children }) {
	return (
		<div>
			<p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
			<p className="mt-1">{children}</p>
		</div>
	);
}
