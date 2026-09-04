import Link from "next/link";
import CountryFlag from "./CountryFlag";

export default function Header() {
	return (
		<header className="border-b border-gray-200 bg-white sticky top-0 z-40">
			<div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
				<Link href="/" className="font-semibold text-lg text-navy">
					{/* 	Sigma Industrial Solutions */}
					<img
						src={`/images/sigma-logo.png`}
						alt="logo"
						title="logo"
						width={75}
						height={50}
						className="rounded-sm mt-0.5"
					/>
				</Link>

				<nav className="flex items-center gap-6 text-sm">
					<Link
						href="/categories"
						className="hidden sm:inline font-medium text-gray-600 hover:text-accent/80">
						Categories
					</Link>
					<Link
						href="/brands"
						className="hidden sm:inline font-medium text-gray-600 hover:text-accent/80">
						Brands
					</Link>
					{/* The single most important page on the site — rich product
              pages are the actual differentiator, so this link gets
              weight and color the others don't, on purpose. */}
					<Link
						href="/products"
						className="hidden sm:inline font-medium text-gray-600 hover:text-accent/80">
						Products
					</Link>
					<Link
						href="/about"
						className="hidden sm:inline font-medium text-gray-600 hover:text-accent/80">
						About
					</Link>
					<Link
						href="/contact#enquire"
						className="relative bg-accent text-white pl-3 pr-3.5 py-1.5 rounded-md hover:bg-accent/90 transition-colors inline-flex items-center gap-2">
						{/* A restrained "alive" signal, not decoration — animate-pulse
                is a built-in Tailwind utility, no extra dependency. */}
						<span className="relative flex h-2 w-2" aria-hidden="true">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
							<span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
						</span>
						Enquire
					</Link>

					{/* Visually separate from the nav links/button above — this is
              ambient context (where the visitor seems to be from), not
              another clickable destination. */}
					<span className="pl-2 border-l border-gray-200 flex items-center">
						<CountryFlag />
					</span>
				</nav>
			</div>
		</header>
	);
}
