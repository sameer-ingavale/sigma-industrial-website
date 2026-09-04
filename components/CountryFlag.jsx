"use client";

import { useEffect, useState } from "react";

// Shows the visitor's country flag, guessed from their IP via a free,
// keyless public geolocation API (ipapi.co — swap for a different
// provider if you hit its rate limit, or move this to a Vercel Edge
// Middleware reading the built-in geo headers if you're deployed there,
// which is more robust but Vercel-specific).
//
// Flag images go in /public/flags/<lowercase-country-code>.png (e.g.
// /public/flags/us.png, /public/flags/tz.png) — you haven't added any
// yet, so right now this always falls back to showing the country name
// as plain text instead of a broken image.
//
// For production, once you've added real flag files: change the
// onError handler below from setImgFailed(true) [falls back to text] to
// setHidden(true) [renders nothing] if you'd rather a failed image
// disappear silently than show text — that's a one-line change, see the
// comment right on the <img> tag.
export default function CountryFlag() {
	const [country, setCountry] = useState(null); // { code, name } | null
	const [imgFailed, setImgFailed] = useState(false);

	useEffect(() => {
		let cancelled = false;
		fetch("https://ipapi.co/json/")
			.then((res) => res.json())
			.then((data) => {
				if (!cancelled && data?.country_code && data?.country_name) {
					setCountry({
						code: data.country_code.toLowerCase(),
						name: data.country_name,
					});
				}
			})
			.catch(() => {
				// Silently do nothing — no flag, no text, just nothing.
			});
		return () => {
			cancelled = true;
		};
	}, []);

	if (!country) return null;

	if (imgFailed) {
		// Today's fallback: show the country name as text. For strict
		// "show nothing on failure" production behavior, change the onError
		// below to a separate "hidden" state instead and return null here.
		return <span className="text-xs text-gray-400">{country.name}</span>;
	}

	return (
		<img
			src={`/images/flags/${country.code}.png`}
			alt={country.name}
			title={country.name}
			width={20}
			height={14}
			className="rounded-sm"
			onError={() => setImgFailed(true)}
		/>
	);
}
