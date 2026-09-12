import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
	return (
		<footer className="border-t border-gray-200 bg-navy text-gray-300 mt-20">
			{/* <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
				<div>
					<p className="text-white font-medium mb-2">{siteConfig.name}</p>
					<p className="text-gray-400">{siteConfig.description}</p>
					<p className="text-gray-400 mt-2">
						Sister concern of{" "}
						<a
							href={siteConfig.sisterConcern.url}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-white underline">
							{siteConfig.sisterConcern.name}
						</a>
					</p>
				</div>

				<div>
					<p className="text-white font-medium mb-2">Site</p>
					<ul className="grid grid-cols-2 gap-x-4 gap-y-1">
						<li>
							<Link href="/products" className="hover:text-white">
								Products
							</Link>
						</li>
						<li>
							<Link href="/categories" className="hover:text-white">
								Categories
							</Link>
						</li>
						<li>
							<Link href="/brands" className="hover:text-white">
								Brands
							</Link>
						</li>
						<li>
							<Link href="/about" className="hover:text-white">
								About
							</Link>
						</li>
						<li>
							<Link href="/contact" className="hover:text-white">
								Contact
							</Link>
						</li>
						<li>
							<Link href="/blog" className="hover:text-white">
								Blog
							</Link>
						</li>
					</ul>
				</div>

				<div>
					<p className="text-white font-medium mb-2">Contact</p>
					<ul className="space-y-1">
						<li>
							<a href={`tel:${siteConfig.phone}`} className="hover:text-white">
								{siteConfig.phone}
							</a>
						</li>
						<li>
							<a href={siteConfig.whatsappUrl} className="hover:text-white">
								WhatsApp
							</a>
						</li>
						<li>
							<a
								href={`mailto:${siteConfig.contactEmail}`}
								className="hover:text-white">
								{siteConfig.contactEmail}
							</a>
						</li>
					</ul>
				</div>
			</div> */}
			<div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
				<div>
					<p className="text-white font-medium mb-2">{siteConfig.name}</p>
					<p className="text-gray-400">{siteConfig.description}</p>
					<p className="text-gray-400 mt-2">
						Sister concern of{" "}
						<a
							href={siteConfig.sisterConcern.url}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-white underline">
							{siteConfig.sisterConcern.name}
						</a>
					</p>
				</div>

				<div>
					<p className="text-white font-medium mb-2">Site</p>
					<ul className="grid grid-cols-2 gap-x-4 gap-y-1">
						<li>
							<Link href="/products" className="hover:text-white">
								Products
							</Link>
						</li>
						<li>
							<Link href="/categories" className="hover:text-white">
								Categories
							</Link>
						</li>
						<li>
							<Link href="/brands" className="hover:text-white">
								Brands
							</Link>
						</li>
						<li>
							<Link href="/about" className="hover:text-white">
								Company
							</Link>
						</li>
						<li>
							<Link href="/contact" className="hover:text-white">
								Contact
							</Link>
						</li>
						<li>
							<Link href="/blog" className="hover:text-white">
								Blog
							</Link>
						</li>
					</ul>
				</div>

				<div>
					<p className="text-white font-medium mb-2">Contact</p>
					<ul className="space-y-1">
						<li>
							<a href={`tel:${siteConfig.phone}`} className="hover:text-white">
								{siteConfig.phone}
							</a>
						</li>
						<li>
							<a href={siteConfig.whatsappUrl} className="hover:text-white">
								WhatsApp
							</a>
						</li>
						<li>
							<a
								href={`mailto:${siteConfig.contactEmail}`}
								className="hover:text-white">
								{siteConfig.contactEmail}
							</a>
						</li>
					</ul>
				</div>

				{/* Legal links live only here — deliberately not in the header nav,
      since they're reference pages a visitor looks up, not somewhere
      they browse to. */}
				<div>
					<p className="text-white font-medium mb-2">Legal</p>
					<ul className="space-y-1">
						<li>
							<Link href="/privacy-policy" className="hover:text-white">
								Privacy Policy
							</Link>
						</li>
						<li>
							<Link href="/terms" className="hover:text-white">
								Terms of Use
							</Link>
						</li>
						<li>
							<Link href="/shipping" className="hover:text-white">
								Shipping &amp; Delivery
							</Link>
						</li>
						<li>
							<Link href="/disclaimer" className="hover:text-white">
								Disclaimer
							</Link>
						</li>
					</ul>
				</div>
			</div>

			<div className="border-t border-white/10">
				<div className="mx-auto max-w-6xl px-5 sm:px-8 py-4 text-xs text-gray-500">
					© {new Date().getFullYear()} {siteConfig.legalName}
				</div>
			</div>

			{/* Optional brand texture — see the comment on footerTagline in
          lib/site-config.js. Purely decorative, so aria-hidden; the real
          copyright line above already covers the accessible content. */}
			{/*  {siteConfig.footerTagline && (
        <div className="overflow-hidden" aria-hidden="true">
          <p className="text-white/[0.06] font-black text-[13vw] sm:text-7xl leading-none whitespace-nowrap text-center py-4 select-none">
            {siteConfig.footerTagline}
          </p>
        </div>
      )} */}

			{siteConfig.footerTagline && (
				<div className="w-full overflow-hidden">
					<p
						className="mx-auto w-full text-center font-black leading-none pt-4 pb-12 select-none text-white/[0.06]"
						style={{
							fontSize: "min(4rem, 5.5vw)",
						}}>
						{siteConfig.footerTagline}
					</p>
				</div>
			)}
		</footer>
	);
}
