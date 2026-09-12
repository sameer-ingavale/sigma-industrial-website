import Link from "next/link";
import Image from "next/image";
import { FileText, Search, FileCheck, Handshake, Ship } from "lucide-react";
import CategoryTiles from "@/components/CategoryTiles";
import ClientLogos from "@/components/ClientLogos";
import { categories } from "@/lib/products";
import { clients } from "@/lib/clients";
import { reviews } from "@/lib/reviews";
import { siteConfig } from "@/lib/site-config";
import { assetUrl } from "@/lib/assets";

// Homepage shows only categories flagged `featured: true` in
// lib/products.js, capped at 4 so the row stays on one line on desktop —
// see lib/products.js for the flag itself. The slice(0, 4) here is a
// safety net: if you ever flag more than 4, only the first 4 (array
// order) show, rather than the row silently wrapping.
const FEATURED_CATEGORIES = categories.filter((c) => c.featured).slice(0, 4);

export default function HomePage() {
	return (
		<>
			<section className="border-b border-gray-200">
				<div className="mx-auto max-w-6xl px-5 sm:px-8 flex flex-col lg:flex-row items-center gap-10">
					<div className="flex-1 py-14">
						<h1 className="text-3xl lg:text-4xl font-bold text-gray-900 max-w-2xl tracking-tight">
							Industrial equipment and spares, sourced in India, shipped
							worldwide
						</h1>

						<p className="text-gray-700 mt-4 max-w-xl text-lg">
							Supplying OEM parts, equivalents, and hard-to-source industrial
							requirements to manufacturing and industrial buyers since 2007
						</p>

						<div className="flex gap-3 mt-8">
							<Link
								href="/products"
								className="bg-navy text-white text-sm px-5 py-2.5 rounded-md hover:bg-navy/90">
								Browse catalog
							</Link>
							<Link
								href="/contact"
								className="border border-gray-300 text-sm px-5 py-2.5 rounded-md hover:border-navy">
								Contact us
							</Link>
						</div>
					</div>

					<div className="w-full max-w-xs lg:max-w-sm lg:flex-1 flex justify-center">
						{siteConfig.heroImage ? (
							<Image
								src={assetUrl(siteConfig.heroImage)}
								alt=""
								width={480}
								height={600}
								className="w-full h-auto object-contain"
								priority
							/>
						) : (
							<div className="w-full aspect-[4/5] border border-dashed border-gray-300 rounded-md flex items-center justify-center">
								<span className="text-xs text-gray-400 text-center px-6">
									Hero image
								</span>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Trust: stats + client logos. Stats are edited by hand in
          lib/site-config.js — keep them accurate. Client logos are in
          lib/clients.js; only list a client once you have permission. */}
			<section className="mx-auto max-w-6xl px-5 sm:px-8 py-12 border-b border-gray-200">
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
					{siteConfig.stats.map((stat) => (
						<div key={stat.label}>
							<p className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
								{stat.value}
							</p>
							<p className="text-base text-gray-500 mt-1">{stat.label}</p>
						</div>
					))}
				</div>

				<h2 className="text-sm text-gray-700 uppercase tracking-wide mb-4">
					Companies we&apos;ve supplied
				</h2>
				<ClientLogos clients={clients} />
			</section>

			{/* How ordering works — a real sequence, so numbering it is honest,
          not decorative. Edit the copy directly; it's plain JSX below,
          not pulled from a data file, since it changes rarely. */}
			<section className="mx-auto max-w-6xl px-5 sm:px-8 py-12 border-b border-gray-200">
				<div className="mb-6">
					<h2 className="text-sm text-gray-500 uppercase tracking-wide mb-1">
						How ordering works
					</h2>
					<Link href="/about" className="text-sm text-navy hover:underline">
						Learn more →
					</Link>
				</div>

				{/* <h2 className="text-sm text-gray-500 uppercase tracking-wide mb-6">
					How ordering works
				</h2> */}
				<ol className="grid grid-cols-1 sm:grid-cols-5 gap-6">
					<Step
						icon={FileText}
						n="1"
						title="Send an RFQ"
						body="filling the form with your requirement and contact details."
					/>
					<Step
						icon={Search}
						n="2"
						title="We verify"
						body="your requirement and follow up if we need more details."
					/>
					<Step
						icon={FileCheck}
						n="3"
						title="We quote"
						body="a complete techno-commercial offer with lead time."
					/>
					<Step
						icon={Handshake}
						n="4"
						title="You confirm"
						body="the order and make payment as per the agreed terms."
					/>
					<Step
						icon={Ship}
						n="5"
						title="We ship"
						body="the goods by sea or air, depending on weight and urgency."
					/>
				</ol>
			</section>

			{/* Browse by category — brand browsing lives at /brands instead. */}
			<section className="mx-auto max-w-6xl px-5 sm:px-8 py-12 border-b border-gray-200">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-sm text-gray-500 uppercase tracking-wide">
						Browse by category
					</h2>
					<Link
						href="/categories"
						className="text-sm text-navy hover:underline">
						View all categories →
					</Link>
				</div>
				<CategoryTiles categories={FEATURED_CATEGORIES} />
			</section>

			{/* Reviews — plain quotes, no carousel. lib/reviews.js */}
			{/* <section className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
				<h2 className="text-sm text-gray-500 uppercase tracking-wide mb-6">
					What buyers and suppliers say
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
					{reviews.map((review, i) => (
						<blockquote
							key={i}
							className="border border-gray-200 rounded-md p-5">
							<p className="text-gray-700">&ldquo;{review.quote}&rdquo;</p>
							<footer className="text-xs text-gray-500 mt-3">
								{review.author} — {review.role}
							</footer>
						</blockquote>
					))}
				</div>
			</section> */}
		</>
	);
}

// The step number is the actual heading here — large and bold, not a
// small mono digit — with the icon sitting directly beside it, no box or
// background. Muted opacity on the icon keeps it a supporting visual
// rather than a second thing competing with the number for attention.
function Step({ icon: Icon, n, title, body }) {
	return (
		<li>
			<div className="flex items-center gap-2.5">
				<span className="text-3xl font-bold text-navy leading-none tracking-tight">
					{n}
				</span>
				<Icon
					className="w-6 h-6 text-navy/90 flex-shrink-0"
					strokeWidth={2}
					aria-hidden="true"
				/>
			</div>
			<p className="font-bold text-accent mt-3 text-lg tracking-tight">
				{title}
			</p>
			<p className="text-gray-700 mt-1">{body}</p>
		</li>
	);
}
