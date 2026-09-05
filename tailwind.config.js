/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,mdx}", "./components/**/*.{js,jsx}"],
	theme: {
		extend: {
			colors: {
				// Three colors, each with one job. Gray scale for everything else
				// comes from Tailwind's built-in `gray` palette.
				navy: "#1C2B45", // brand / structure / navigation / headings
				accent: "#9E2A2B", // the one color for "act now" — form submit
				// buttons and the highest-intent CTA only.
				// If you're reaching for accent on something
				// that isn't asking the visitor to act,
				// reach for navy instead.
				trust: "#1F6B44", // confirmation signal only — verified brands,
				// available documents. Green reads as
				// "checked/cleared" cross-culturally, which
				// is the specific job it's doing here, not
				// decoration.
			},
			fontFamily: {
				// Inter for everything readable. Familiar, neutral, doesn't call
				// attention to itself — that's the point.
				sans: ["var(--font-inter)", "sans-serif"],
				// Mono is reserved for actual technical data (part numbers, spec
				// values, HS codes) — not used decoratively for labels or headings.
				mono: ["var(--font-roboto-mono)", "monospace"],
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
