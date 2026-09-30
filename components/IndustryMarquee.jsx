"use client";

import { useEffect, useRef } from "react";

const industries = [
	"FOOD & BEVERAGES",
	"BREWERIES",
	"MINING & MINERALS",
	"ENGINEERING & EPC",
	"CONSTRUCTION",
	"OIL & GAS",
	"PHARMACEUTICALS",
];

const SPEED = 45; // pixels per second

function IndustrySet() {
	return (
		<div className="flex shrink-0 items-center">
			{industries.map((industry) => (
				<div key={industry} className="flex shrink-0 items-center">
					<span className="whitespace-nowrap px-6 text-xs font-medium tracking-[0.12em] text-gray-600">
						{industry}
					</span>
					<span className="text-gray-300" aria-hidden="true">
						•
					</span>
				</div>
			))}
		</div>
	);
}

export default function IndustryMarquee() {
	const trackRef = useRef(null);
	const firstSetRef = useRef(null);

	useEffect(() => {
		const track = trackRef.current;
		const firstSet = firstSetRef.current;
		if (!track || !firstSet) return;

		let x = 0;
		let last = performance.now();
		let raf = 0;

		const tick = (now) => {
			const dt = Math.min((now - last) / 1000, 0.1);
			last = now;

			const width = firstSet.offsetWidth;
			if (width > 0) {
				x -= SPEED * dt;
				if (x <= -width) x += width;
				track.style.transform = `translate3d(${x}px, 0, 0)`;
			}

			raf = requestAnimationFrame(tick);
		};

		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, []);

	return (
		<section
			className="flex h-10 w-full overflow-hidden border-b border-gray-200 bg-[#f7f9fa]"
			aria-label="Industries we serve">
			{/* Fixed label */}
			<div className="relative z-20 shrink-0 items-center bg-[#f7f9fa] px-5 sm:px-8 hidden sm:flex">
				<span className="whitespace-nowrap text-xs font-semibold tracking-[0.12em] text-gray-700">
					INDUSTRIES WE SERVE
				</span>
			</div>

			{/* Moving area */}
			<div className="relative min-w-0 flex-1 overflow-hidden">
				{/* Left fade */}
				<div
					className="pointer-events-none absolute inset-y-0 left-0 z-10 w-64 sm:w-12"
					style={{
						background:
							"linear-gradient(to right, #f7f9fa 0%, rgba(247,249,250,0) 100%)",
					}}
				/>

				{/* Right fade */}
				<div
					className="pointer-events-none absolute inset-y-0 right-0 z-10 w-4 sm:w-12"
					style={{
						background:
							"linear-gradient(to left, #f7f9fa 0%, rgba(247,249,250,0) 100%)",
					}}
				/>

				{/* Track */}
				<div
					ref={trackRef}
					className="absolute left-0 top-0 flex h-full items-center"
					style={{ willChange: "transform" }}>
					<div ref={firstSetRef} className="flex shrink-0 items-center">
						<IndustrySet />
					</div>
					<IndustrySet />
					<IndustrySet />
				</div>
			</div>
		</section>
	);
}
