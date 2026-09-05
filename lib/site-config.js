// Company info in one place. Edit this file once — it feeds the header,
// footer, every page's metadata, and the structured data (JSON-LD).

const yearsInExport = 19;
// A fixed fact, not derived from yearsInExport above (that count will
// need updating by hand periodically anyway — keep this one in sync
// with it, or just replace both with real numbers).
const foundedYear = 2007;

export const siteConfig = {
	name: "Sigma Industrial Solutions",
	legalName: "Sigma Industrial Solutions",

	// Large, low-opacity line at the very bottom of the footer — optional.
	// Keep it short (2-4 words) if you use it; this is brand texture, not
	// another place to explain what the company does. Set to null to drop
	// it entirely and keep the footer plain.
	footerTagline: "Industrial Sourcing, Made Simple.",

	// One line, factual. Shown in <meta description> and social previews.
	description:
		"Industrial equipment and spares sourced in India and shipped worldwide.",
	url: "https://www.sigmaindustrial.in",

	contactEmail: "contact@sigmaindustrial.in",
	phone: "+91-8657276904",
	whatsappUrl: "https://wa.me/918657276904",

	location: {
		addressLocality: "F-3, Neighborhood Commercial Complex, Nerul, Navi Mumbai",
		addressRegion: "Maharashtra",
		postalCode: "400706",
		addressCountry: "IN",
	},

	// Shown in the footer and on the About page.
	sisterConcern: {
		name: "Hi-Tech Consultants & Services",
		url: "https://hitechcs.co.in/",
	},

	yearsInExport,
	foundedYear,

	// Homepage hero image — a transparent-background PNG works best, since
	// it's shown without a container/border (see app/page.jsx). Leave null
	// for a placeholder box.
	heroImage: "/hero2.png",

	// About page's full-width banner, standing in for a plain divider.
	// Two crops on purpose — see the comment in app/about/page.jsx.
	aboutBanner: {
		desktop: "/images/about2.png", // wide/short, e.g. 2100×600
		mobile: null, // taller, e.g. 800×600
	},

	// Contact page image — a photo of the office or the person(s) who
	// actually answer enquiries does more for a contact page than any
	// amount of copy; it's the one page where "who am I actually talking
	// to" is the whole question.
	contactImage: null,

	// Founder section on the Company page — a real photo does more work
	// here than another paragraph of copy. 4:3, same convention as
	// everything else.
	founderImage: "/images/sameer2.png",

	// The full-width banner tile for the "Sigma Verified Manufacturers"
	// section on /brands — one image standing in for the whole group,
	// since none of those brands are individually named or logo'd. Same
	// height as the small brand tiles above it (h-32 in
	// components/BrandGrid.jsx's sibling on that page — see
	// app/brands/page.jsx), just full width instead of one column.
	sigmaVerifiedBanner: "images/svm.png",

	shipping: {
		coverage: "Worldwide",
		methods: ["Sea freight", "Air freight"],
		originPort: "Mumbai",
		currency: "USD",
		creditTerms: "Up to 90 days, subject to a background/credit check",
	},

	// Homepage trust stats. Plain numbers you edit by hand — these are
	// headline claims, not derived from the (much smaller) sample catalog
	// in lib/products.js, so keep them accurate to your real numbers.
	stats: [
		{ value: "800+", label: "Orders exported" },
		{ value: "2,500+", label: "Products supplied" },
		{ value: "15+", label: "Categories" },
		{ value: `${yearsInExport}+`, label: "Years in export" },
	],

	// Export compliance documents shown on the homepage. Put each PDF in
	// /public/documents/ and set its URL below; leave null to show
	// "available on request" instead of a dead link.
	compliance: [
		{
			label: "GST Certificate",
			url: "https://pub-102ea2743b29417eaabebe113d13f3cb.r2.dev/sigma_gst_certificate.pdf",
		},
		{
			label: "IEC (Import Export Code)",
			url: "https://pub-102ea2743b29417eaabebe113d13f3cb.r2.dev/sigma_iec_fy_26_27.pdf",
		},
		{
			label: "RCMC",
			url: "https://pub-102ea2743b29417eaabebe113d13f3cb.r2.dev/sigma_rcmc_fy_26_27.pdf",
		},
		/* { label: "LUT", url: null }, */
	],
};
