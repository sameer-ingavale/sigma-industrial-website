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

export default function MarketTicker() {
	const [index, setIndex] = useState(0);
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setVisible(false);

			setTimeout(() => {
				setIndex((current) => (current + 1) % countries.length);
				setVisible(true);
			}, 350);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<span className="inline-block align-baseline min-w-[280px] mt-1.5">
			<span
				className={`inline-block bg-[#eef3f7] text-navy px-2.5 pt-1 pb-1.5 rounded-md transition-all duration-500 ease-out ${
					visible ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
				}`}>
				{countries[index]}
			</span>
		</span>
	);
}
