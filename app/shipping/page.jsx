import { siteConfig } from "@/lib/site-config";

export const metadata = {
	title: "Shipping & Delivery",
	description: `How ${siteConfig.name} handles lead times, freight, and delivery for export orders.`,
};

export default function ShippingPage() {
	return (
		<section className="mx-auto max-w-3xl px-5 sm:px-8 py-14">
			<p className="text-sm text-gray-500">Last updated: September 2026</p>
			<h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">
				Shipping &amp; Delivery
			</h1>
			<p className="text-gray-700 mt-3 leading-relaxed">
				{siteConfig.name} supplies industrial products to customers in India and
				international markets. Shipping and delivery arrangements depend on the
				product, order quantity, destination, and agreed commercial terms.
			</p>

			<div className="mt-10 space-y-8">
				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						1. Lead Times Are Not Delivery Times
					</h2>
					<p className="text-gray-700 leading-relaxed">
						Every product page on this website shows a lead time alongside an
						EXW (Ex Works) location — for example, &ldquo;5–7 days, EXW
						Mumbai&rdquo;. This figure is an estimate for sourcing,
						manufacturing, or preparing the goods for dispatch{" "}
						<em>from that origin point</em>. It is not the date the goods will
						reach you, and it does not include sea or air freight transit time,
						customs clearance at origin or destination, or last-mile delivery —
						all of which are additional, and which vary significantly by
						destination country and shipping mode.
					</p>
					<p className="text-gray-700 leading-relaxed mt-3">
						Lead times can also vary based on:
					</p>
					<ul className="list-disc pl-5 space-y-1 text-gray-700 mt-2">
						<li>Product specifications and quantity</li>
						<li>Manufacturer availability</li>
						<li>Custom manufacturing requirements</li>
						<li>Inspection and documentation requirements</li>
						<li>Export procedures</li>
						<li>Shipping schedules and destination</li>
					</ul>
					<p className="text-gray-700 leading-relaxed mt-3">
						A confirmed, combined lead time plus transit estimate will be
						communicated with your quotation or order confirmation — not left to
						the website figure alone.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						2. Shipping Terms
					</h2>
					<p className="text-gray-700 leading-relaxed">
						International shipments may be offered under applicable Incoterms®,
						including EXW, FOB, CFR, CIF, DAP, or other agreed terms. The
						quotation will specify the applicable delivery term and the
						responsibilities of Sigma and the buyer.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						3. Freight &amp; Delivery
					</h2>
					<p className="text-gray-700 leading-relaxed">
						We arrange shipments by sea or air freight depending on the
						order&apos;s weight, urgency, and agreed terms. Depending on the
						agreed terms, Sigma may arrange transportation, freight forwarding,
						export documentation, and related logistics. Where the buyer is
						responsible for transportation or import clearance, responsibility
						for the shipment transfers in accordance with the agreed Incoterm.
						Transit times are dependent on carriers, ports, customs authorities,
						and other third parties and may vary.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						4. Customs, Duties &amp; Taxes
					</h2>
					<p className="text-gray-700 leading-relaxed">
						Unless expressly included in the agreed commercial terms, the buyer
						is responsible for applicable import duties, customs charges, local
						taxes, port and terminal charges, destination handling charges,
						import permits and clearances, and other destination-country
						regulatory requirements. The buyer is responsible for ensuring that
						the products can legally be imported into the destination country.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						5. Inspection &amp; Documentation
					</h2>
					<p className="text-gray-700 leading-relaxed">
						Where required, Sigma can coordinate product documentation and
						third-party inspection subject to requirements agreed before
						shipment. Available documentation may include commercial invoices,
						packing lists, certificates of origin, test certificates, inspection
						reports, certificates of conformity, and other product-specific
						documents — see the &ldquo;Attachments&rdquo; section on individual
						product pages for what is already on hand versus available on
						request. Documentation availability ultimately depends on the
						product and manufacturer.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						6. Delivery Delays
					</h2>
					<p className="text-gray-700 leading-relaxed">
						Delivery may be affected by circumstances outside Sigma&apos;s
						reasonable control, including manufacturing delays, carrier
						schedules, port congestion, customs clearance, regulatory
						requirements, weather, strikes, or other force majeure events. We
						will communicate material delays where reasonably practicable.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						7. Damaged or Short Shipments
					</h2>
					<p className="text-gray-700 leading-relaxed">
						Customers should inspect shipments promptly upon receipt and notify
						Sigma of any visible damage, shortage, or discrepancy with
						supporting photographs and documentation. Claims should be raised as
						soon as reasonably possible and in accordance with the applicable
						carrier, insurance, and contractual requirements.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						8. Delivery Confirmation
					</h2>
					<p className="text-gray-700 leading-relaxed">
						A shipment is considered delivered when it reaches the delivery
						point specified under the agreed commercial terms and applicable
						Incoterm. The specific responsibilities for freight, risk,
						insurance, and import clearance will be governed by the terms stated
						in the quotation or purchase documentation.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						9. Contact
					</h2>
					<p className="text-gray-700 leading-relaxed">
						For shipping and delivery enquiries:
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
