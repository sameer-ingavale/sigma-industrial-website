"use client";

import { useEffect, useState } from "react";

const countries = [
	"Tanzania",
	"Uganda",
	"Kenya",
	"Rwanda",
	"Zambia",
	"Egypt",
	"Mozambique",
	"South Africa",
];

export default function CountryTicker() {
	const [index, setIndex] = useState(0);
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setVisible(false);

			setTimeout(() => {
				setIndex((current) => (current + 1) % countries.length);
				setVisible(true);
			}, 500);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<span
			className="inline-block align-baseline"
			style={{
				// Helps Safari create a separate compositing layer
				transform: "translateZ(0)",
			}}>
			<span
				className={`inline-block rounded-md bg-[#eef3f7] mt-1 px-2 pt-0.5 pb-1 text-navy ${
					visible ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
				}`}
				style={{
					transition: "opacity 500ms ease, transform 500ms ease",
					willChange: "opacity, transform",
					backfaceVisibility: "hidden",
					WebkitBackfaceVisibility: "hidden",
					WebkitTransform: "translateZ(0)",
				}}>
				{countries[index]}
			</span>
		</span>
	);
}
