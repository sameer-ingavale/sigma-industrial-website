"use client";

// WhatsApp + email share links. Plain anchor tags — no share-sheet
// library, no clipboard API. `url` should be the full absolute URL of
// the page (build it with siteConfig.url + path, not a relative path).
export default function ShareButtons({ url, title }) {
	const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`;
	const emailHref = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
	return (
		<div className="inline-flex items-center border border-gray-200 bg-white rounded-md">
			{" "}
			<span className="px-2.5 text-[11px] font-medium uppercase tracking-wide text-gray-500">
				{" "}
				Share{" "}
			</span>{" "}
			<a
				href={whatsappHref}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Share on WhatsApp"
				title="Share on WhatsApp"
				className=" flex h-9 w-9 items-center justify-center border-l border-gray-200 text-gray-500 transition-colors duration-100  hover:text-[#25D366] ">
				{" "}
				<WhatsAppIcon />{" "}
			</a>{" "}
			<a
				href={emailHref}
				aria-label="Share by email"
				title="Share by email"
				className=" flex h-9 w-9 items-center justify-center border-l border-gray-200 text-gray-500 transition-colors duration-150 hover:text-accent ">
				{" "}
				<EmailIcon />{" "}
			</a>{" "}
		</div>
	);
}

function WhatsAppIcon() {
	return (
		<svg
			width="17"
			height="17"
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true">
			{" "}
			<path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5s-.6-1.5-.9-2c-.2-.5-.4-.4-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2.1 3.2 5 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.6.2-1.2.2-1.3-.1-.2-.3-.2-.5-.3z" />{" "}
			<path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.2 4.9 1.2h.1c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.1h-.1c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3C4 15 3.5 13.5 3.5 12 3.5 7.3 7.3 3.5 12 3.5S20.5 7.3 20.5 12 16.7 20.1 12 20.1z" />{" "}
		</svg>
	);
}

function EmailIcon() {
	return (
		<svg
			width="17"
			height="17"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.7"
			aria-hidden="true">
			{" "}
			<rect x="2" y="4" width="20" height="16" rx="2" />{" "}
			<path d="M2 6l10 7 10-7" />{" "}
		</svg>
	);
}
