import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { siteConfig } from "@/lib/site-config";
import { organizationJsonLd } from "@/lib/seo";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const robotoMono = Roboto_Mono({
	subsets: ["latin"],
	variable: "--font-roboto-mono",
	display: "swap",
});

export const metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.name,
		template: `%s — ${siteConfig.name}`,
	},
	description: siteConfig.description,
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(organizationJsonLd()),
					}}
				/>
			</head>
			<body
				className={`${inter.variable} ${robotoMono.variable} font-sans antialiased`}>
				<GoogleAnalytics />
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
