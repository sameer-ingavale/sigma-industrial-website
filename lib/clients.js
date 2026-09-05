// Client logos shown on the homepage as a trust signal. Purely for display
// — no linking, no slugs needed.
//
// LOGOS: put a file at /public/clients/<something>.png and reference it
// below. Leave `logo: null` for a plain text tile until you have the file.
// Only add a client here once you have permission to display their logo.

export const clients = [
	{ name: "Carlsberg", logo: "/images/clients/carlsberg.png" },
	{ name: "Coca Cola", logo: "/images/clients/cocacola.png" },
	{ name: "Diageo", logo: "/images/clients/diageo.png" },
	{ name: "Kellogs", logo: "/images/clients/kelloggs.png" },
	{ name: "Pepsi", logo: "/images/clients/pepsi.png" },
	{
		name: "Serengeti Breweries",
		logo: "/images/clients/serengeti_breweries.png",
	},
	// Add more clients here — { name: 'Acme Corp', logo: '/clients/acme.png' }
];
