import Link from "next/link";

// The plain "don't see what you need?" nudge used at the bottom of
// /products, /categories, /categories/[slug], /brands, and /brands/[slug].
// One component so the wording and styling stay consistent — edit here
// to change it everywhere at once. Plain text, left-aligned, no box — the
// accent-colored link is what carries the emphasis, not a container.
export default function EnquiryPrompt({
	message = "Can't find what you need?",
}) {
	return (
		<p className="text-gray-700">
			{message}{" "}
			<Link
				href="/contact#enquire"
				className="text-accent font-medium hover:underline">
				Send us a general enquiry →
			</Link>
		</p>
	);
}
