"use client";

const industries = [
	"FOOD & BEVERAGES",
	"BREWERIES",
	"MINING & MINERALS",
	"MANUFACTURING",
	"ENGINEERING & EPC",
	"CONSTRUCTION",
	"OIL & GAS",
	"PHARMACEUTICALS",
];

function IndustrySet() {
	return (
		<div className="flex shrink-0 items-center">
			{industries.map((industry) => (
				<div key={industry} className="flex shrink-0 items-center">
					<span className="px-6 text-xs font-medium tracking-[0.12em] text-gray-600">
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
	return (
		<section
			className="flex h-10 w-full overflow-hidden border-b border-gray-200 bg-[#f7f9fa]"
			aria-label="Industries we serve">
			{/* Fixed label */}
			<div className="relative z-20 flex shrink-0 items-center bg-[#f7f9fa] px-5 sm:px-8">
				<span className="whitespace-nowrap text-xs font-semibold tracking-[0.12em] text-gray-700">
					INDUSTRIES WE SERVE
				</span>
			</div>

			{/* Moving area */}
			<div className="relative min-w-0 flex-1 overflow-hidden">
				{/* Left fade */}
				<div
					className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16"
					style={{
						background:
							"linear-gradient(to right, #f7f9fa 0%, rgba(247,249,250,0) 100%)",
					}}
				/>

				{/* Right fade */}
				<div
					className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16"
					style={{
						background:
							"linear-gradient(to left, #f7f9fa 0%, rgba(247,249,250,0) 100%)",
					}}
				/>

				<div className="industry-marquee flex h-full w-max items-center">
					<IndustrySet />
					<IndustrySet />
				</div>
			</div>
		</section>
	);
}
