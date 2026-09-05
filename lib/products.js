// ─────────────────────────────────────────────────────────────────────────
// PRODUCT CATALOG — the single source of truth for the site.
//
// There's no CMS and no database on purpose: adding, editing, or removing
// a product is editing this array and pushing. Vercel rebuilds and the
// product page, its catalog listing, its sitemap entry, and its llms.txt
// entry all update together — nothing else to touch.
//
// CATEGORIES AND BRANDS ARE OPEN-ENDED. Add as many as you need — nothing
// in the code assumes a fixed number or a specific set. Brands live in
// lib/brands.js; a product just points at one by slug (`brand: 'jcb'`).
//
// A PRODUCT CAN BELONG TO MORE THAN ONE CATEGORY — `categories` on a
// product is an array of slugs, not a single string. Most products will
// only need one entry in that array; add more when a part genuinely
// serves more than one category (e.g. a blowdown valve that's both
// "Valves & Flow Control" and "Boiler & Steam System Spares"). The
// product page shows every category it's filed under, and it appears on
// every one of those category pages.
//
// MODEL NUMBER vs. PART NUMBER(S): some products have one, some have the
// other, some have both. `modelNumber` (a single string or null) and
// `partNumbers` (an array — leave it `[]` if there isn't one) each only
// show up on the product page if they have a value; neither is required.
//
// CATALOGUE (variants): if you're only listing the one variant you've
// actually supplied but others exist, set `catalogueUrl` (string/null/
// false, same three-state rule as the documents below). It's shown right
// next to the model number, since a model number is what signals "this
// is one of a family" in the first place — a product with no model
// number has nothing for a catalogue link to hang off of, so just don't
// set `catalogueUrl` on those (no separate backend check needed; the UI
// only renders it inside the model-number block).
//
// IMAGES: put a file at /public/products/<slug>.jpg and set `image` below
// to "/products/<slug>.jpg". Leave `image: null` and the page shows a
// plain placeholder instead of a broken image. Categories work the same
// way against /public/categories/<slug>.jpg.
//
// DOCUMENTS: `datasheetUrl`, `drawingUrl`, `testCertificateUrl`, and
// `catalogueUrl` all use the same three-state pattern, since not every
// product has every document:
//   - a string (e.g. "/documents/tc.pdf")  → available now, downloadable
//   - null                                  → not on hand, but available
//                                             on request (shows a plain
//                                             "on request" note)
//   - false                                 → not offered for this
//                                             product at all — the whole
//                                             row/note is hidden, no
//                                             "on request" shown
// Put the PDF in /public/documents/ and point the field at it — remember
// the leading slash (see lib/assets.js if a link doesn't open). Every
// PDF link on the site opens in a new tab rather than downloading, via
// target="_blank" — that's handled per-component, not globally, so if
// you add a new document link somewhere, carry that over.
//
// INDICATIVE PRICE: `indicativePrice` is a plain string you write
// yourself — e.g. "From $45" — not a real quote, just a gateway number
// so pricing doesn't feel like a total unknown before someone enquires.
// It's EXW the same place as `originCity` below. Leave `null` if you'd
// rather not show one yet — there's no "on request" fallback for this
// one, since an absent price just reads as absent, not as a broken
// promise.
//
// LEAD TIME + ORIGIN CITY: `leadTime` is just the time range (e.g.
// "5–7 days") — no location baked into the string. `originCity` is a
// separate plain city name (e.g. "Mumbai"). The product page combines
// them at display time into "5–7 days, EXW Mumbai". Keeping them as two
// fields means you can change one without retyping the other, and it's
// per-product since not everything ships EXW the same city.
//
// INDUSTRIES: `industries` is an array of plain strings — every industry
// this product actually gets used in, not just the "main" one (a
// utility item like a belt or a filter can apply to many). Shown as
// static text for now, on the product page between Specifications and
// Attachments. Not clickable/filterable yet — if you want "click an
// industry to see everything tagged with it" later, this field is
// already shaped for it (add a lib/industries.js with slugs and a
// getProductsByIndustry() helper, same pattern as categories).
// ─────────────────────────────────────────────────────────────────────────

// `featured: true` puts a category in the homepage row (capped at 4 —
// see app/page.jsx) and nowhere else special; every category, featured
// or not, still gets its own page at /categories/<slug> and shows on the
// full /categories index. Keep at most 4 flagged true, since the
// homepage only has room for 4 on one line on desktop.
export const categories = [
	{
		slug: "general-industrial-products",
		name: "General Industrial Products",
		description: "Everyday plant consumables and general-purpose spares.",
		image: "/images/categories/general-industrial-products.png",
		featured: true,
	},
	/* {
		slug: "air-compressor-spares",
		name: "Air Compressor Spares & Accessories",
		description: "Spares and accessories for industrial air compressors.",
		image: null,
		featured: false,
	}, */
	{
		slug: "bearings-seals-gaskets",
		name: "Bearings, Seals & Gaskets",
		description:
			"Bearings, mechanical seals, and gaskets across equipment types.",
		image: "/images/categories/bearings-seals-gaskets.png",
		featured: false,
	},
	/* {
		slug: "electrical-automation-instrumentation",
		name: "Electrical, Automation & Instrumentation",
		description:
			"Electrical components, automation parts, and instrumentation.",
		image: null,
		featured: false,
	}, */
	{
		slug: "boiler-steam-system-spares",
		name: "Boiler & Steam System Spares",
		description:
			"Spares and components for industrial boilers, steam distribution and associated plant systems.",
		image: "/images/categories/boiler-steam-system-spares.png",
		featured: true,
	},
	/* {
		slug: "fasteners-hardware",
		name: "Fasteners & General Hardware",
		description: "Fasteners and general industrial hardware.",
		image: null,
		featured: false,
	}, */
	{
		slug: "valves-flow-control",
		name: "Valves & Flow Control",
		description:
			"Valves and flow-control components for process, utility, steam, water and plant-maintenance applications.",
		image: "/images/categories/valves-flow-control.png",
		featured: true,
	},
	/* {
		slug: "earthmoving-construction-spares",
		name: "Earthmoving & Construction Equipment Spares",
		description: "Spare parts for earthmoving and construction machinery.",
		image: null,
		featured: false,
	}, */
	{
		slug: "pumps-pump-spares",
		name: "Pumps & Pump Spares",
		description:
			"Pumps, replacement components and maintenance spares for industrial process and utility applications.",
		image: "/images/categories/pumps-pump-spares.png",
		featured: false,
	},
	{
		slug: "filters-filtration-elements",
		name: "Filters & Filtration Elements",
		description:
			"Air, fuel, hydraulic, lubrication and process filtration elements for equipment and plant-maintenance applications.",
		image: "/images/categories/filters-filtration-elements.png",
		featured: true,
	},
	{
		slug: "laboratory-testing-equipment",
		name: "Laboratory & Testing Equipment",
		description: "Lab and testing equipment for industrial quality control.",
		image: "/images/categories/laboratory-testing-equipment.png",
		featured: false,
	},
	/* {
		slug: "piping-flanges-fittings",
		name: "Piping, Flanges & Fittings",
		description: "Pipes, flanges, and pipe fittings.",
		image: null,
		featured: false,
	}, */
	{
		slug: "lubricants-industrial-oils",
		name: "Lubricants & Industrial Oils",
		description: "Industrial lubricants, process chemicals, and consumables.",
		image: "/images/categories/lubricants-industrial-oils.png",
		featured: false,
	},
	/* {
		slug: "brewery-beverage-processing",
		name: "Brewery & Beverage Processing Equipment",
		description:
			"Equipment and spares for brewery and beverage processing lines.",
		image: null,
		featured: false,
	}, */
	/* {
		slug: "water-wastewater-treatment",
		name: "Water & Wastewater Treatment Equipment",
		description: "Equipment for water and wastewater treatment plants.",
		image: null,
		featured: false,
	}, */
	{
		slug: "lighting-illumination",
		name: "Lighting & Illumination",
		description: "Industrial and plant lighting.",
		image: "/images/categories/lighting-illumination.png",
		featured: false,
	},
];

/* export const products = [
  {
    slug: 'jcb-hydraulic-filter-kit',
    name: 'JCB Backhoe Loader Hydraulic Filter Kit',
    categories: ['earthmoving-construction-spares'], // array — a product can belong to more than one
    image: null,

    brand: 'jcb', // slug into lib/brands.js
    crossReferenceBrands: ['Donaldson', 'Fleetguard'],
    modelNumber: null, // example: identified by part numbers only, no model number
    partNumbers: ['32/925694', '32/912601', 'HF6177 (Donaldson cross-ref)'],

    status: 'sourced-on-demand', // 'made-to-order' | 'sourced-on-demand'

    // One line. The application/use case + compatible equipment — not a
    // marketing description. E.g. "Used to service X on Y equipment."
    application:
      'Services the return-line and suction hydraulic filtration on JCB 3DX/3CX backhoe loaders.',

    specifications: [
      { label: 'Compatible models', value: 'JCB 3DX, 3CX, 3DX Super' },
      { label: 'Filter type', value: 'Return line + suction strainer' },
      { label: 'Micron rating', value: '10 micron (return), 125 mesh (suction)' },
      { label: 'Packaging unit', value: 'Set of 2' },
    ],

    hsCode: '8421.23.00',
    countryOfOrigin: 'India',
    originCity: 'Mumbai',
    leadTime: '5–7 days',
    moq: '10 sets',
    indicativePrice: 'From $45',
    industries: ['Construction', 'Mining', 'Earthmoving'],

    datasheetUrl: null, // available on request
    drawingUrl: false, // not offered for this product
    testCertificateUrl: false,
    catalogueUrl: false, // no model number, so no catalogue link either

    // Optional. Keep answers to one sentence — this isn't a blog.
    faqs: [
      {
        question: 'Genuine or aftermarket?',
        answer: 'Both available — specify on enquiry; we mark the quote accordingly.',
      },
    ],
  },
  {
    slug: 'fenner-classical-v-belt',
    name: 'Fenner Classical V-Belt',
    categories: ['general-industrial-spares'],
    image: null,

    brand: 'fenner',
    crossReferenceBrands: [],
    // Example of both a model number and part numbers — and a catalogue
    // link, since one exists to show a model number's full range.
    modelNumber: 'Fenner B/C Section Range',
    partNumbers: ['Fenner B-Series', 'Fenner C-Series'],

    status: 'sourced-on-demand',

    application: 'Drives conveyor, crusher, and mill pulleys in processing and material-handling plants.',

    specifications: [
      { label: 'Sections', value: 'B-Series, C-Series (this listing); others in catalogue' },
      { label: 'Construction', value: 'Wrapped classical V-belt, polyester cord' },
      { label: 'Temperature range', value: '-25°C to +70°C' },
    ],

    hsCode: '4010.31.00',
    countryOfOrigin: 'India',
    originCity: 'Mumbai',
    leadTime: '10–14 days',
    moq: '20 units per size',
    indicativePrice: 'From $8 per unit',
    // A utility item like this one applies broadly — list every industry
    // it's actually used in, not just the "main" one.
    industries: ['Manufacturing', 'Mining', 'Material Handling', 'Food Processing'],

    datasheetUrl: false,
    drawingUrl: false,
    testCertificateUrl: false,
    catalogueUrl: '/documents/fenner-vbelt-catalogue.pdf', // available — the full section range

    faqs: [],
  },
  {
    slug: 'donaldson-air-filter',
    name: 'Donaldson Primary Air Filter',
    categories: ['filters-filtration-elements'],
    image: null,

    brand: 'donaldson',
    crossReferenceBrands: ['JCB', 'Mahindra', 'Case'],
    // Example of a model number with no catalogue offered yet — the
    // model number still shows, the catalogue link just doesn't.
    modelNumber: 'Donaldson P-Series',
    partNumbers: ['P785379', 'P828889'],

    status: 'sourced-on-demand',

    application: 'Filters intake air on backhoe loader and excavator engines running in dusty site conditions.',

    specifications: [
      { label: 'Filter type', value: 'Primary radial seal' },
      { label: 'Media', value: 'Cellulose; PowerCore-compatible options available' },
    ],

    hsCode: '8421.31.00',
    countryOfOrigin: 'India',
    originCity: 'Mumbai',
    leadTime: '5–7 days',
    moq: '10 units',
    indicativePrice: 'From $22',
    industries: ['Construction', 'Mining', 'Earthmoving'],

    datasheetUrl: null, // on request
    drawingUrl: false,
    testCertificateUrl: null, // on request
    catalogueUrl: false,

    faqs: [],
  },
  {
    slug: 'ss-gasket-lauter-tun',
    name: 'SS304 Gasket — Lauter Tun Rake Assembly',
    // Example of a product filed under more than one category.
    categories: ['brewery-beverage-processing', 'bearings-seals-gaskets'],
    image: null,

    // Example of an undisclosed-manufacturer product — see lib/brands.js.
    // The buyer sees "Sigma Verified Manufacturer" everywhere on the
    // site, never the real manufacturer's name.
    brand: 'sigma-verified-manufacturer',
    crossReferenceBrands: [],
    modelNumber: null, // made-to-order — no standing model number
    partNumbers: ['SIG-GSK-LT-304'],

    status: 'made-to-order',

    application: 'Seals the rake arm assembly on lauter tuns used in brewery mashing/lautering lines.',

    specifications: [
      { label: 'Material', value: 'SS304, food-grade' },
      { label: 'Made to', value: 'Buyer-supplied drawing or sample' },
    ],

    hsCode: '4016.93.00',
    countryOfOrigin: 'India',
    // Example of a product shipping EXW somewhere other than Mumbai.
    originCity: 'Mundra',
    leadTime: '15–20 days after drawing/sample confirmation',
    moq: '1 (made to order)',
    indicativePrice: null, // made-to-order — price depends entirely on the drawing, so no "from" figure to give yet
    industries: ['Brewing', 'Beverage Processing', 'Food & Beverage'],

    datasheetUrl: false,
    drawingUrl: null, // on request — reasonable for a made-to-order item
    testCertificateUrl: '/documents/tc-lauter-tun-gasket.pdf', // available
    catalogueUrl: false,

    faqs: [],
  },
  // Add more products here — copy an object above, change every field.
]; */

export const products = [
	{
		slug: "ss-304-woven-wire-mesh",
		name: "SS304 Woven Wire Mesh",
		categories: ["filters-filtration-elements"],
		image: "/images/products/ss304-wire-mesh.png",

		brand: "sigma-verified-manufacturer",
		crossReferenceBrands: [],
		modelNumber: "WM-18",
		partNumbers: [],

		status: "made-to-order",

		application:
			"Used for filtration, screening, and separation of liquids, slurry, and solid particles.",

		specifications: [
			{ label: "Grade", value: "SS304" },
			{ label: "Mesh Size", value: "18 × 18" },
			{ label: "Wire Diameter", value: "0.45 mm" },
			{ label: "Roll Size", value: "4 ft × 100 ft" },
		],

		hsCode: "73141410",
		countryOfOrigin: "India",
		originCity: "Mumbai",
		leadTime: "3–4 weeks",
		moq: "1 roll",
		indicativePrice: "$829",
		industries: [
			"Mining",
			"Mineral Processing",
			"Process Industries",
			"Food Processing",
			"Agro-Processing",
			"Chemicals",
		],

		datasheetUrl: false,
		drawingUrl: false,
		testCertificateUrl:
			"https://pub-db901b1dcba8452aa7682105f4e2eb9e.r2.dev/ss304-wire-mesh.pdf",
		catalogueUrl:
			"https://pub-9d18d8e03ff14070a449df8e9f6284d5.r2.dev/ss304-wire-mesh.pdf",

		faqs: [
			{
				question:
					"What are the common applications for stainless steel wire mesh?",
				answer:
					"SS304 woven mesh is commonly used for filtration, screening, sieving, straining, separation, and as protective screens or guards. It is used wherever a specific particle size, opening, or separation is required.",
			},

			{
				question: "How do I select the right mesh size?",
				answer:
					"Mesh size determines the number of openings per linear inch and, together with wire diameter, determines the filtration opening. Select the mesh based primarily on the particle size or separation requirement.",
			},
			{
				question: "What types of weave can you supply?",
				answer:
					"Plain weave is the most common for general filtration and screening. Twill, Dutch, and other weaves can be supplied where finer filtration, higher strength, or specific flow characteristics are required.",
			},
			{
				question: "Can the wire mesh be supplied as cut pieces?",
				answer:
					"Cut panels, discs, screens, and other custom shapes can be supplied against specified dimensions, drawings, or samples.",
			},
			{
				question: "Can you supply an equivalent to an existing wire mesh?",
				answer:
					"An equivalent can be supplied using the existing mesh count, wire diameter, material grade, opening size, weave, dimensions, or an existing sample.",
			},
		],
	},

	{
		slug: "high-alumina-refractory-firebricks",
		name: "High Alumina Refractory Firebricks",
		categories: ["boiler-steam-system-spares"],
		image: "/images/products/refractory-firebricks.png",

		brand: "sigma-verified-manufacturer",
		crossReferenceBrands: [],
		modelNumber: null,
		partNumbers: [],

		status: "made-to-order",

		application:
			"Used as refractory lining material in furnaces, kilns, boilers, and other high-temperature industrial equipment.",

		specifications: [
			{ label: "Dimensions", value: "230 mm × 115 mm × 75 mm" },
			{ label: "Alumina Content", value: "40%" },
		],

		hsCode: "69029010",
		countryOfOrigin: "India",
		originCity: "Mundra",
		leadTime: "2–3 weeks",
		moq: "336 bricks (1 pallet)",
		indicativePrice: "$512",
		industries: [
			"Process Industries",
			"Food Processing",
			"Breweries",
			"Agro-Processing",
			"Cement",
			"Chemicals",
			"Pharmaceuticals",
			"Textiles",
			"Power Generation",
		],

		datasheetUrl: false,
		drawingUrl: false,
		testCertificateUrl:
			"https://pub-db901b1dcba8452aa7682105f4e2eb9e.r2.dev/refractory-firebricks-tc.pdf",
		catalogueUrl: false,

		faqs: [
			{
				question: "What applications are these refractory bricks suitable for?",
				answer:
					"They are commonly used in boiler furnaces, combustion chambers, kilns, furnaces, incinerators, and other high-temperature industrial equipment. Grade selection depends on the specific service conditions.",
			},
			{
				question:
					"What properties should I consider when procuring refractory bricks?",
				answer:
					"Key properties include alumina content, bulk density, cold crushing strength, and apparent porosity. You can refer to the sample test certificate for the tested values.",
			},
			{
				question: "What sizes of refractory bricks can you supply?",
				answer:
					"Common sizes include 230 × 115 × 75 mm, 230 × 115 × 65 mm, 230 × 115 × 50 mm, and 300 × 150 × 75 mm. Custom sizes and shapes can also be manufactured to drawings.",
			},
			{
				question: "What alumina grades are available?",
				answer:
					"Common grades include 40%, 50%, 60%, 70%, 80%, and 90% Al₂O₃. Higher alumina generally provides greater refractoriness, strength, and resistance to chemical attack.",
			},
			{
				question: "How do I select the right alumina grade?",
				answer:
					"Grade selection depends on operating temperature, mechanical load, abrasion, chemical exposure, and thermal cycling. The appropriate grade can be recommended based on the service conditions.",
			},
		],
	},

	/* {
		slug: "aluminium-ceiling-panel",
		name: "Aluminium Ceiling Panel",
		categories: ["general-industrial-products"],
		image: "/images/products/aluminium-ceiling-panel.png",

		brand: "sigma-verified-manufacturer",
		crossReferenceBrands: [],
		modelNumber: null,
		partNumbers: [],

		status: "made-to-order",

		application:
			"Used for industrial fabrication, equipment panels, enclosures, cladding, roofing, and other lightweight fabricated structures.",

		specifications: [
			{ label: "Type", value: "Plain" },
			{ label: "Thickness", value: "0.7 mm" },
			{ label: "Dimensions", value: "600 mm × 600 mm × 0.7 mm" },
		],

		hsCode: "76061200",
		countryOfOrigin: "India",
		originCity: null,
		leadTime: "2 weeks",
		moq: "100 sq. mtr.",
		indicativePrice: "$800",
		industries: [
			"Construction",
			"Industrial Fabrication",
			"Automotive",
			"Packaging",
		],

		datasheetUrl: false,
		drawingUrl: false,
		testCertificateUrl: false,
		catalogueUrl: false,

		faqs: [],
	}, */

	{
		slug: "class-300-wcb-globe-valve",
		name: "Class 300 WCB Globe Valve",
		categories: ["valves-flow-control", "boiler-steam-system-spares"],
		image: "/images/products/leader-globe-valve.png",

		brand: "leader",
		crossReferenceBrands: [
			"Forbes Marshall",
			"Spirax Sarco",
			"Velan",
			"Flowserve",
			"Crane",
			"KSB",
			"Bonney Forge",
		],
		modelNumber: null,
		partNumbers: [],

		status: "sourced-on-demand",

		application:
			"Regulates or isolates high-pressure steam flow in boiler and process steam lines.",

		specifications: [
			{ label: "Size", value: '2"' },
			{ label: "Pressure Class", value: "300#" },
			{ label: "End Connection", value: "RF Flanged" },
			{ label: "MOC", value: "ASTM A216 WCB" },
		],

		hsCode: "84818030",
		countryOfOrigin: "India",
		originCity: "Mumbai",
		leadTime: "2–3 weeks",
		moq: "1 unit",
		indicativePrice: "$200",
		industries: [
			"Process Industries",
			"Food Processing",
			"Breweries",
			"Agro-Processing",
			"Cement",
			"Chemicals",
			"Pharmaceuticals",
			"Textiles",
			"Power Generation",
		],

		datasheetUrl: false,
		drawingUrl:
			"https://pub-9f058620294c434aae836f36d8761333.r2.dev/class-300-wcb-globe-valve-dwg.pdf",
		testCertificateUrl:
			"https://pub-db901b1dcba8452aa7682105f4e2eb9e.r2.dev/class-300-wcb-globe-valve-tc.pdf",
		catalogueUrl: false,

		faqs: [],
	},

	{
		slug: "class-300-wcb-blowdown-valve",
		name: "Class 300 WCB Blowdown Valve",
		categories: ["valves-flow-control", "boiler-steam-system-spares"],
		image: "/images/products/leader-blowdown-valve.png",

		brand: "leader",
		crossReferenceBrands: [
			"Spirax Sarco",
			"Velan",
			"Forbes Marshall",
			"Flowserve",
			"Schubert & Salzer",
			"Pentair",
			"Metso",
		],
		modelNumber: null,
		partNumbers: [],

		status: "sourced-on-demand",

		application:
			"Controls blowdown discharge to remove accumulated sludge and contaminants from boilers.",

		specifications: [
			{ label: "Size", value: '2"' },
			{ label: "Pressure Class", value: "300#" },
			{ label: "End Connection", value: "RF Flanged" },
			{ label: "MOC", value: "ASTM A216 WCB" },
		],

		hsCode: "84818030",
		countryOfOrigin: "India",
		originCity: "Mumbai",
		leadTime: "2–3 weeks",
		moq: "1 unit",
		indicativePrice: "$400",
		industries: [
			"Process Industries",
			"Food Processing",
			"Breweries",
			"Agro-Processing",
			"Cement",
			"Chemicals",
			"Pharmaceuticals",
			"Textiles",
			"Power Generation",
		],

		datasheetUrl: false,
		drawingUrl:
			"https://pub-9f058620294c434aae836f36d8761333.r2.dev/class-300-wcb-blowdown-valve-dwg.pdf",
		testCertificateUrl:
			"https://pub-db901b1dcba8452aa7682105f4e2eb9e.r2.dev/class-300-wcb-blowdown-valve-tc.pdf",
		catalogueUrl: false,

		faqs: [],
	},

	{
		slug: "wire-reinforced-metallic-gasket",
		name: "Wire Reinforced Metallic Gasket",
		categories: ["bearings-seals-gaskets", "boiler-steam-system-spares"],
		image: "/images/products/champion-style-54-super-metallic-gasket-sheet.png",

		brand: "champion",
		crossReferenceBrands: [],
		modelNumber: "Style 54",
		partNumbers: [],

		status: "sourced-on-demand",

		application:
			"Used as a high-temperature and pressure-resistant jointing material for flanges and equipment handling steam, hydrocarbons, gases, and other process media.",

		specifications: [
			{ label: "Thickness", value: "5 mm" },
			{ label: "Size", value: "1500 mm × 2000 mm" },
			{
				label: "Maximum Working Pressure",
				value: "16 MPa (160 Bar)",
			},
			{
				label: "Maximum Service Temperature",
				value: "600°C",
			},
			{
				label: "Compliance Standards",
				value: "IS 2712:1998 W/1 & O/1, BS 2815 Grade A, DGS & DG/MISC/81-C",
			},
		],

		hsCode: "68129922",
		countryOfOrigin: "India",
		originCity: null,
		leadTime: "1–2 weeks",
		moq: "1 sheet",
		indicativePrice: "$200",
		industries: [
			"Boiler & Steam",
			"Power Generation",
			"Oil & Gas",
			"Refineries",
			"Air Separation",
			"Marine",
			"Industrial Manufacturing",
		],

		datasheetUrl:
			"https://pub-8ff9c573aae247689bd1ffe8bac21ffb.r2.dev/wire-reinforced-metallic-gasket-ds.pdf",
		drawingUrl: false,
		testCertificateUrl: false,
		catalogueUrl:
			"https://pub-9d18d8e03ff14070a449df8e9f6284d5.r2.dev/wire-reinforced-metallic-gasket-cat.pdf",

		faqs: [],
	},

	{
		slug: "oil-burner-fuel-pump",
		name: "Oil Burner Fuel Pump",
		categories: ["boiler-steam-system-spares", "pumps-pump-spares"],
		image: "/images/products/suntec-fuel-pump.png",

		brand: "suntec",
		crossReferenceBrands: [],
		modelNumber: null,
		partNumbers: ["E7NCK10698P"],

		status: "sourced-on-demand",

		application:
			"Supplies fuel oil to burner systems used in industrial heating and boiler applications.",

		specifications: [],

		hsCode: "84169000",
		countryOfOrigin: "France",
		originCity: null,
		leadTime: "2–3 weeks, ex-works Mumbai",
		moq: "1 piece",
		indicativePrice: "$500",
		industries: [
			"Boilers",
			"Power Generation",
			"Industrial Heating",
			"Process Industries",
		],

		datasheetUrl: "/documents/suntec-e7nck10698p-fuel-pump-datasheet.pdf",
		drawingUrl: false,
		testCertificateUrl: false,
		catalogueUrl: false,

		faqs: [],
	},

	{
		slug: "removable-insulation-jackets",
		name: "Removable Insulation Jackets",
		categories: ["general-industrial-products"],
		image: "/images/products/industrial-insulation-jackets.png",

		brand: "sigma-verified-manufacturer",
		crossReferenceBrands: [],
		modelNumber: null,
		partNumbers: [],

		status: "made-to-order",

		application:
			"Provides removable thermal insulation for valves, piping, pumps, flanges, heat exchangers, turbines, and other industrial equipment.",

		specifications: [],

		hsCode: null,
		countryOfOrigin: null,
		originCity: null,
		leadTime: null,
		moq: null,
		indicativePrice: "$500",
		industries: [
			"Power Generation",
			"Oil & Gas",
			"Petrochemicals",
			"Chemical Processing",
			"Industrial Manufacturing",
		],

		datasheetUrl: false,
		drawingUrl: false,
		testCertificateUrl:
			"https://pub-db901b1dcba8452aa7682105f4e2eb9e.r2.dev/removable-insulation-jackets-tc.pdf",
		catalogueUrl: false,

		faqs: [],
	},

	{
		slug: "worm-gearbox",
		name: "Worm Gearbox",
		categories: ["general-industrial-products"],
		image: "/images/products/bonfiglioli-worm-gearbox.png",

		brand: "bonfiglioli",
		crossReferenceBrands: [],
		modelNumber: null,
		partNumbers: ["W 75 UF1 D30 30 P80 B5 B3"],

		status: "sourced-on-demand",

		application:
			"Transmits and reduces rotary speed and torque in industrial machinery and material-handling equipment.",

		specifications: [
			{ label: "Weight", value: "9.7 kg / unit" },
			{ label: "Gear Ratio", value: "30:1" },
			{ label: "Rated Output Torque", value: "320 Nm" },
			{ label: "Mounting Position", value: "B3 (Foot Mounted)" },
			{ label: "Output Shaft", value: "Ø30 mm" },
		],

		hsCode: "84834000",
		countryOfOrigin: "India",
		originCity: null,
		leadTime: "10–12 weeks",
		moq: "1 piece",
		indicativePrice: "$500",
		industries: [
			"Food & Beverage",
			"Material Handling",
			"Mining",
			"Packaging",
			"Recycling",
			"Sugar",
			"Water & Wastewater",
			"Cement",
			"Oil & Gas",
			"Power Generation",
			"Plastics & Rubber",
			"Metal Processing",
		],

		datasheetUrl:
			"https://pub-8ff9c573aae247689bd1ffe8bac21ffb.r2.dev/worm-gearbox-ds.pdf",
		drawingUrl:
			"https://pub-9f058620294c434aae836f36d8761333.r2.dev/worm-gearbox-dwg.pdf",
		testCertificateUrl: false,
		catalogueUrl:
			"https://pub-9d18d8e03ff14070a449df8e9f6284d5.r2.dev/worm-gearbox-cat.pdf",

		faqs: [],
	},

	{
		slug: "multiparameter-photometer-with-cod-and-ph-meter",
		name: "Multiparameter Photometer with COD & pH Meter",
		categories: ["laboratory-testing-equipment"],
		image: "/images/products/hanna-hi83399-multiparameter-photometer.png",

		brand: "hanna",
		crossReferenceBrands: [],
		modelNumber: "HI83399",
		partNumbers: [],

		status: "sourced-on-demand",

		application:
			"Measures water and wastewater quality parameters including COD, total nitrogen, total phosphorus, pH, and temperature.",

		specifications: [
			{
				label: "Measurement Channels",
				value: "5 optical channels + 1 digital pH/temperature electrode input",
			},
			{
				label: "Supported Test Methods",
				value: "Up to 90 pre-programmed methods",
			},
			{
				label: "Photometer Range",
				value: "0.000–4.000 Absorbance",
			},
			{
				label: "pH Range",
				value: "2.00–16.00 pH",
			},
			{
				label: "Data Storage",
				value: "Up to 1,000 logged readings",
			},
			{
				label: "Dimensions",
				value: "206 × 177 × 97 mm",
			},
		],

		hsCode: null,
		countryOfOrigin: null,
		originCity: null,
		leadTime: null,
		moq: null,
		indicativePrice: "$3,000",
		industries: [
			"Water Treatment",
			"Wastewater Treatment",
			"Environmental Testing",
			"Laboratories",
			"Municipal Utilities",
		],

		datasheetUrl:
			"https://pub-8ff9c573aae247689bd1ffe8bac21ffb.r2.dev/multiparameter-photometer-with-cod-and-ph-meter-ds.pdf",
		drawingUrl: false,
		testCertificateUrl: false,
		catalogueUrl: false,

		faqs: [],
	},

	{
		slug: "end-suction-centrifugal-pump-with-motor-and-base-plate",
		name: "End-Suction Centrifugal Pump with Motor & Base Plate",
		categories: ["pumps-pump-spares"],
		image: "/images/products/grundfos-pump.png",

		brand: "grundfos",
		crossReferenceBrands: [],
		modelNumber: null,
		partNumbers: ["NK32-160/177AY1F2AESBAQEXW1"],

		status: "sourced-on-demand",

		application:
			"Pumps water and other industrial fluids in general utility, process, and heavy-duty industrial systems.",

		specifications: [
			{ label: "Power", value: "5.5 kW, 3 Phase" },
			{
				label: "MOC",
				value: "CI Casing / CI Impeller / SS304 Shaft",
			},
			{ label: "RPM", value: "2900, 50 Hz" },
			{ label: "Suction Condition", value: "Flooded" },
		],

		hsCode: "84137090",
		countryOfOrigin: "India",
		originCity: null,
		leadTime: "4–5 weeks",
		moq: "1 set",
		indicativePrice: "$2,000",
		industries: [
			"General Manufacturing",
			"Water Supply",
			"Process Industries",
			"HVAC",
			"Industrial Utilities",
		],

		datasheetUrl:
			"https://pub-8ff9c573aae247689bd1ffe8bac21ffb.r2.dev/end-suction-centrifugal-pump-with-motor-and-base-plate-ds.pdf",
		drawingUrl: false,
		testCertificateUrl: false,
		catalogueUrl: false,

		faqs: [],
	},

	{
		slug: "shell-tellus-s2-mx-46-hydraulic-oil",
		name: "Shell Tellus S2 MX 46 Hydraulic Oil",
		categories: ["lubricants-industrial-oils"],
		image: "/images/products/shell-tellus-s2-mx-46-hydraulic-oil.png",

		brand: "shell",
		crossReferenceBrands: [],
		modelNumber: "Tellus S2 MX 46",
		partNumbers: [],

		status: "sourced-on-demand",

		application:
			"Lubricates and protects hydraulic systems operating with mineral-based hydraulic oil.",

		specifications: [
			{ label: "Oil Type", value: "Hydraulic Oil" },
			{ label: "Viscosity Grade", value: "ISO VG 46" },
			{ label: "Base Oil", value: "Mineral" },
			{ label: "Additive Type", value: "Zinc-based" },
			{
				label: "Industry Standard",
				value: "ISO 11158 (HM)",
			},
		],

		hsCode: "27101980",
		countryOfOrigin: "India",
		originCity: "Mumbai",
		leadTime: "Ready stock",
		moq: "1 barrel",
		indicativePrice: "$3,000",
		industries: [
			"Manufacturing",
			"Mining & Mineral Processing",
			"Material Handling",
			"Power Generation",
			"Oil & Gas",
			"Food & Beverage",
			"General Industrial",
		],

		datasheetUrl:
			"https://pub-8ff9c573aae247689bd1ffe8bac21ffb.r2.dev/shell-tellus-s2-mx-46-hydraulic-oil-ds.pdf",
		drawingUrl: false,
		testCertificateUrl:
			"https://pub-db901b1dcba8452aa7682105f4e2eb9e.r2.dev/shell-tellus-s2-mx-46-hydraulic-oil-tc.pdf",
		catalogueUrl: false,

		faqs: [],
	},

	{
		slug: "manual-drum-stacker-tilter",
		name: "Manual Drum Stacker & Tilter",
		categories: ["general-industrial-products"],
		image: "/images/products/nido-manual-drum-stacker-tilter.png",

		brand: "nido",
		crossReferenceBrands: [],
		modelNumber: "ND-D-HS-ST",
		partNumbers: [],

		status: "sourced-on-demand",

		application:
			"Lifts, transports, stacks, and manually tilts industrial drums for material handling and controlled discharge.",

		specifications: [
			{ label: "Load Capacity", value: "350 kg" },
			{ label: "Lifting Height", value: "1500 mm" },
			{ label: "Drum Rotation", value: "Manual, 180°" },
			{
				label: "Function",
				value: "Lift, Transport, Stack & Tilt",
			},
		],

		hsCode: "84798999",
		countryOfOrigin: "India",
		originCity: "Mumbai",
		leadTime: "2–3 weeks",
		moq: "1 unit",
		indicativePrice: "$1,500",
		industries: [
			"Manufacturing",
			"Warehousing",
			"Chemical Processing",
			"Pharmaceuticals",
			"Food Processing",
		],

		datasheetUrl:
			"https://pub-8ff9c573aae247689bd1ffe8bac21ffb.r2.dev/manual-drum-stacker-tilter-ds.pdf",
		drawingUrl: false,
		testCertificateUrl: false,
		catalogueUrl: false,

		faqs: [],
	},

	{
		slug: "bacteriological-laboratory-incubator",
		name: "Bacteriological Laboratory Incubator",
		categories: ["laboratory-testing-equipment"],
		image: "/images/products/equitron-laboratory-incubator.png",

		brand: "equitron",
		crossReferenceBrands: [],
		modelNumber: "#7251-091",
		partNumbers: [],

		status: "sourced-on-demand",

		application:
			"Maintains controlled temperature conditions for laboratory incubation and biological culture work.",

		specifications: [
			{ label: "Capacity", value: "91 L" },
			{
				label: "Temperature Range",
				value: "Ambient +5 to 70°C",
			},
			{
				label: "Inner Dimensions (W×D×H)",
				value: "450 × 450 × 450 mm",
			},
			{
				label: "Outer Dimensions (W×D×H)",
				value: "640 × 690 × 800 mm",
			},
			{ label: "Shelves", value: "2" },
			{ label: "Heater Power", value: "0.4 kW" },
		],

		hsCode: "84198990",
		countryOfOrigin: "India",
		originCity: "Mumbai",
		leadTime: "4–5 weeks",
		moq: "1 unit",
		indicativePrice: "$1,500",
		industries: [
			"Laboratories",
			"Microbiology",
			"Pharmaceuticals",
			"Food Testing",
			"Research & Development",
		],

		datasheetUrl:
			"https://pub-8ff9c573aae247689bd1ffe8bac21ffb.r2.dev/bacteriological-laboratory-incubator-ds.pdf",
		drawingUrl: false,
		testCertificateUrl: false,
		catalogueUrl: false,

		faqs: [],
	},

	{
		slug: "fully-automatic-laboratory-autoclave",
		name: "Fully Automatic Laboratory Autoclave",
		categories: ["laboratory-testing-equipment"],
		image: "/images/products/equitron-autoclave.png",

		brand: "equitron",
		crossReferenceBrands: [],
		modelNumber: "#7451SLEFA-15PSI",
		partNumbers: [],

		status: "sourced-on-demand",

		application:
			"Sterilizes laboratory materials, instruments, glassware, and other heat- and pressure-resistant items using saturated steam.",

		specifications: [
			{ label: "Capacity", value: "180 L" },
			{
				label: "Working Chamber Dimensions",
				value: "Ø550 × 760 mm",
			},
			{ label: "Loading Type", value: "Top" },
			{ label: "Heater Power", value: "5 kW" },
			{
				label: "Temperature Range",
				value: "Up to 122°C",
			},
			{
				label: "Operating Pressure",
				value: "15 psi / 103.4 kPa",
			},
		],

		hsCode: "84192010",
		countryOfOrigin: "India",
		originCity: "Mumbai",
		leadTime: "4–5 weeks",
		moq: "1 unit",
		indicativePrice: "$4,000",
		industries: [
			"Laboratories",
			"Pharmaceuticals",
			"Healthcare",
			"Research & Development",
			"Food & Beverage Testing",
		],

		datasheetUrl:
			"https://pub-8ff9c573aae247689bd1ffe8bac21ffb.r2.dev/fully-automatic-laboratory-autoclave-ds.pdf",
		drawingUrl: false,
		testCertificateUrl: false,
		catalogueUrl: false,

		faqs: [],
	},

	{
		slug: "boiler-tube-cleaning-machine",
		name: "Boiler Tube Cleaning Machine",
		categories: ["boiler-steam-system-spares", "general-industrial-products"],
		image: "/images/products/boiler-tube-cleaning-machine.png",

		brand: "sigma-verified-manufacturer",
		crossReferenceBrands: [],
		modelNumber: "SG-BTCM-5-2800",
		partNumbers: [],

		status: "sourced-on-demand",

		application:
			"Cleans internal surfaces of boiler, heat-exchanger, condenser, and other industrial tubes to remove scale and deposits.",

		specifications: [
			{ label: "Motor Power", value: "5 HP" },
			{ label: "Motor Speed", value: "2800 RPM" },
			{
				label: "Motor Supply",
				value: "3 Phase, 440 V",
			},
			{
				label: "Mounting",
				value: "3-Roller Wheel Trolley with Handle",
			},
			{ label: "Tube ID", value: "38 mm–101 mm" },
			{
				label: "Accessories",
				value: "Turk head brush, cutter head, hand piece",
			},
		],

		hsCode: "84798999",
		countryOfOrigin: "India",
		originCity: "Mumbai",
		leadTime: "3–4 weeks",
		moq: "1 unit",
		indicativePrice: "$2,500",
		industries: [
			"Power Generation",
			"Boilers",
			"Chemical Processing",
			"Refineries",
			"HVAC",
			"Marine",
			"Sugar Processing",
		],

		datasheetUrl: false,
		drawingUrl: false,
		testCertificateUrl: false,
		catalogueUrl: false,

		faqs: [],
	},
];

// Helper lookups used by the pages. Plain functions, nothing clever.
export function getProductBySlug(slug) {
	return products.find((p) => p.slug === slug);
}

// A product matches if `categorySlug` is anywhere in its `categories` array.
export function getProductsByCategory(categorySlug) {
	return products.filter((p) => p.categories.includes(categorySlug));
}

export function getProductsByBrand(brandSlug) {
	return products.filter((p) => p.brand === brandSlug);
}

export function getCategoryBySlug(slug) {
	return categories.find((c) => c.slug === slug);
}
