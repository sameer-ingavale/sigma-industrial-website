import { Lock } from "lucide-react";

// Renders an indicativePrice string like "From $45" or "From $8 per
// unit" with the number itself blurred (not masked with dots/asterisks)
// — a CSS blur keeps the number's width, so a 2-digit price still visibly
// reads as shorter than a 4-digit one, but the exact figure isn't
// legible. A lock icon signals "enquire to see the real number."
//
// Splits the string into prefix (everything up to and including "$"),
// the number itself, and whatever comes after (e.g. "per unit") — only
// the number gets blurred, the rest of the string reads normally.
export default function BlurredPrice({ price, className = "" }) {
	const match = price.match(/^(.*?\$)([\d,]+(?:\.\d+)?)(.*)$/);

	// If the string doesn't look like "...$<number>...", just show it
	// as-is rather than breaking — e.g. if you ever write a price without
	// a "$" in front of it.
	if (!match) {
		return <span className={className}>{price}</span>;
	}

	const [, prefix, number, suffix] = match;

	return (
		<span className={`inline-flex items-center gap-1.5 ${className}`}>
			<span>{prefix}</span>
			<span className="blur-[5px] select-none" aria-hidden="true">
				{number}
			</span>
			<span className="sr-only">Price hidden — send an enquiry to see it</span>
			<Lock
				className="w-3.5 h-3.5 text-gray-500 flex-shrink-0"
				strokeWidth={2.5}
				aria-hidden="true"
			/>
			{suffix && <span>{suffix}</span>}
		</span>
	);
}
