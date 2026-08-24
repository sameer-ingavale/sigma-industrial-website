import { assetUrl } from "@/lib/assets";
import { Download } from "lucide-react";

// Renders the GST/IEC/RCMC/LUT document links from
// lib/site-config.js → compliance. Used on both the homepage (compact,
// low-key) and the About page (same component, just given more room) —
// one place to change the styling for both.
export default function ComplianceLinks({ docs, size = "sm" }) {
	const isSmall = size === "sm";
	return (
		<div className="flex flex-wrap gap-3">
			{docs.map((doc) => (
				<ComplianceLink
					key={doc.label}
					label={doc.label}
					url={doc.url}
					small={isSmall}
				/>
			))}
		</div>
	);
}

function ComplianceLink({ label, url, small }) {
	const sizeClasses = small ? "text-xs px-3 py-1.5" : "text-sm px-4 py-2";

	if (url) {
		return (
			<a
				href={assetUrl(url)}
				target="_blank"
				rel="noopener noreferrer"
				className={`inline-flex items-center gap-1.5 border border-gray-200 rounded-md text-gray-700 hover:border-navy hover:text-navy cursor-pointer ${sizeClasses}`}>
				{/* <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="text-trust flex-shrink-0" aria-hidden="true">
          <path d="M20 6L9 17l-5-5" />
        </svg> */}
				<Download
					className="w-3.5 h-3.5 text-navy/90 flex-shrink-0"
					strokeWidth={2}
					aria-hidden="true"
				/>
				{label}
			</a>
		);
	}
	return (
		<span
			className={`border border-gray-100 rounded-md text-gray-400 ${sizeClasses}`}>
			{label} — on request
		</span>
	);
}
