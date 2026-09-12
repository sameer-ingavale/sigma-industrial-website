// OEM/brand catalog — shown on the "All Brands" page (/brands), each
// with its own dedicated page (/brands/<slug>), same pattern as
// categories. Add as many as you need.
//
// `origin` sorts a brand into one of the three sections on /brands:
//   - 'international' — globally known brands (JCB, Donaldson, ...)
//   - 'indian'         — named Indian brands
//   - 'verified'       — reserved for the one shared "Sigma Verified
//                        Manufacturer" brand below; don't use this for
//                        anything else
//
// UNDISCLOSED MANUFACTURERS: for a product whose actual manufacturer you
// don't want named publicly, just set its `brand` field to
// 'sigma-verified-manufacturer' — the shared brand defined below. You
// keep track of who actually made it yourself, outside this codebase;
// as far as the website and the buyer are concerned, it was sourced and
// verified by Sigma. Every such product shares this one brand, so its
// page lists all of them together — see /brands/sigma-verified-manufacturer.
//
// LOGOS: put a file at /public/brands/<slug>.png and set `logo` to
// "/brands/<slug>.png". Leave `logo: null` for a plain text tile instead
// of a broken image.
//
// CREDENTIALS (optional): certifications like ISO that back up a brand's
// third-party credibility. `url` should point at the actual certificate
// PDF (see lib/assets.js for the leading-slash rule) — shown as a
// clickable badge that opens the file in a new tab. Leave the array
// empty or omit the field if a brand has none to show.

export const brands = [
	/* {
		slug: "jcb",
		name: "JCB",
		logo: null,
		origin: "international",
		credentials: [
			// Example — replace with real certifications and their PDF paths.
			{ label: "ISO 9001:2015", url: null },
		],
	}, */
	{
		slug: "suntec",
		name: "Suntec",
		logo: "/images/brands/suntec.png",
		origin: "international",
		credentials: [],
	},
	{
		slug: "leader",
		name: "Leader",
		logo: "/images/brands/leader.png",
		origin: "indian",
		credentials: [],
	},
	{
		slug: "champion",
		name: "Champion",
		logo: "/images/brands/champion.png",
		origin: "indian",
		credentials: [],
	},
	{
		slug: "bonfiglioli",
		name: "Bonfiglioli",
		logo: "/images/brands/bonfiglioli.png",
		origin: "international",
		credentials: [],
	},
	{
		slug: "hanna",
		name: "Hanna",
		logo: "/images/brands/hanna.png",
		origin: "international",
		credentials: [],
	},
	{
		slug: "grundfos",
		name: "Grundfos",
		logo: "/images/brands/grundfos.png",
		origin: "international",
		credentials: [],
	},
	{
		slug: "shell",
		name: "Shell",
		logo: "/images/brands/shell.png",
		origin: "international",
		credentials: [],
	},
	{
		slug: "nido",
		name: "Nido",
		logo: "/images/brands/nido.png",
		origin: "indian",
		credentials: [],
	},
	{
		slug: "equitron",
		name: "Equitron",
		logo: "/images/brands/equitron.png",
		origin: "indian",
		credentials: [],
	},
	{
		slug: "fuji-electric",
		name: "Fuji Electric",
		logo: "/images/brands/fujielectric.png",
		origin: "international",
		credentials: [],
	},
	{
		slug: "phillips",
		name: "Phillips",
		logo: "/images/brands/phillips.png",
		origin: "international",
		credentials: [],
	},

	// The one shared brand for every product whose real manufacturer you
	// don't want named. See the comment at the top of this file.
	{
		slug: "sigma-verified-manufacturer",
		name: "Sigma Verified Manufacturer",
		logo: null,
		origin: "verified",
		credentials: [],
	},
];

export function getBrandBySlug(slug) {
	return brands.find((b) => b.slug === slug);
}
