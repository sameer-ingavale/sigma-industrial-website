import { siteConfig } from "@/lib/site-config";

export const metadata = {
	title: "Privacy Policy",
	description: `How ${siteConfig.name} collects, uses, and protects your information.`,
};

export default function PrivacyPolicyPage() {
	return (
		<section className="mx-auto max-w-3xl px-5 sm:px-8 py-14">
			<p className="text-sm text-gray-500">Last updated: September 2026</p>
			<h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">
				Privacy Policy
			</h1>
			<p className="text-gray-700 mt-3 leading-relaxed">
				{siteConfig.name} (&ldquo;Sigma&rdquo;, &ldquo;we&rdquo;,
				&ldquo;us&rdquo; or &ldquo;our&rdquo;) respects your privacy and is
				committed to handling your personal information responsibly. This
				Privacy Policy explains what information we collect through{" "}
				{siteConfig.url.replace("https://", "")}, how we use it, and the choices
				available to you.
			</p>

			<div className="mt-10 space-y-8">
				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						1. Information We Collect
					</h2>
					<p className="text-gray-700 leading-relaxed">
						We collect information you provide directly when you submit a
						product enquiry or quotation request, or contact us by email, phone,
						or WhatsApp. Depending on the form, this may include your first and
						last name, company name, email address, phone number, country,
						quantity required, required delivery timeline, and any
						specifications or notes you choose to add.
					</p>
					<p className="text-gray-700 leading-relaxed mt-3">
						We also automatically receive basic technical information such as
						your IP address, browser type, device information, and pages visited
						when you use our website. We use your IP address to show an
						approximate country flag in the site header as a personalization
						touch — see &ldquo;Third-Party Services&rdquo; below for how that
						works.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						2. How We Use Your Information
					</h2>
					<p className="text-gray-700 leading-relaxed">
						We use the information we collect to:
					</p>
					<ul className="list-disc pl-5 space-y-1 text-gray-700 mt-2">
						<li>Respond to enquiries and quotation requests</li>
						<li>Provide product information, pricing, and lead times</li>
						<li>Source and supply products requested by you</li>
						<li>
							Communicate regarding orders and prospective transactions,
							including by WhatsApp where you initiate it
						</li>
						<li>Improve our website, products, and services</li>
						<li>Maintain website security and prevent misuse</li>
						<li>
							Meet applicable legal, regulatory, and contractual requirements
						</li>
					</ul>
					<p className="text-gray-700 leading-relaxed mt-3">
						We do not sell or rent your personal information.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						3. Sharing of Information
					</h2>
					<p className="text-gray-700 leading-relaxed">
						We may share relevant information with manufacturers, suppliers,
						logistics providers, inspection agencies, service providers, or
						other parties where reasonably necessary to respond to your enquiry
						or fulfil a transaction. We may also disclose information where
						required by law, regulation, court order, or government authority.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						4. Data Retention
					</h2>
					<p className="text-gray-700 leading-relaxed">
						We retain information only for as long as reasonably necessary for
						the purpose for which it was collected, including business,
						contractual, accounting, legal, and regulatory requirements.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						5. Data Security
					</h2>
					<p className="text-gray-700 leading-relaxed">
						We take reasonable technical and organisational measures to protect
						information against unauthorised access, loss, misuse, or
						disclosure. However, no method of transmitting or storing
						information over the internet can be guaranteed to be completely
						secure.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						6. Third-Party Services
					</h2>
					<p className="text-gray-700 leading-relaxed">
						Our website relies on a small number of third-party services to
						function:
					</p>
					<ul className="list-disc pl-5 space-y-1 text-gray-700 mt-2">
						<li>
							<strong className="font-medium text-gray-900">Hosting</strong> —
							the website is hosted on Vercel.
						</li>
						<li>
							<strong className="font-medium text-gray-900">
								Enquiry delivery
							</strong>{" "}
							— form submissions are sent to our inbox using Resend, an email
							delivery service.
						</li>
						<li>
							<strong className="font-medium text-gray-900">
								Approximate location
							</strong>{" "}
							— we use a third-party IP lookup service to guess your country,
							purely to display a flag in the site header. This does not create
							an account or profile and is not linked to any enquiry you submit.
						</li>
						<li>
							<strong className="font-medium text-gray-900">Analytics</strong> —
							where enabled, we use Google Analytics to understand website
							usage. Google Analytics uses cookies and may process your IP
							address in accordance with Google&apos;s own privacy policy.
						</li>
						<li>
							<strong className="font-medium text-gray-900">WhatsApp</strong> —
							if you choose to contact us via WhatsApp, that conversation is
							subject to WhatsApp&apos;s (Meta&apos;s) own privacy practices,
							not ours.
						</li>
					</ul>
					<p className="text-gray-700 leading-relaxed mt-3">
						These services may process information in accordance with their own
						privacy policies.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						7. Your Rights
					</h2>
					<p className="text-gray-700 leading-relaxed">
						Depending on applicable law, you may have rights relating to your
						personal information, including the right to request access,
						correction, or deletion of information, or to withdraw consent where
						processing is based on consent. To make a privacy-related request,
						contact us using the details below.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						8. Contact
					</h2>
					<p className="text-gray-700 leading-relaxed">
						For questions regarding this Privacy Policy or your personal
						information:
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
					<p className="text-gray-700 leading-relaxed mt-3">
						We may update this Privacy Policy from time to time. The latest
						version will always be published on this page.
					</p>
				</div>
			</div>
		</section>
	);
}
