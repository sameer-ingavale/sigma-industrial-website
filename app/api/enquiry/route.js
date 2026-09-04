import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

// Required env vars (set in Vercel project settings):
//   RESEND_API_KEY   — from resend.com
//   ENQUIRY_TO_EMAIL — where enquiries land (defaults to siteConfig.contactEmail)

export async function POST(req) {
	try {
		const body = await req.json();
		const {
			firstName,
			lastName,
			company,
			email,
			phone,
			country,
			quantity,
			timeline,
			category,
			specifications,
			productName,
			productSlug,
		} = body;

		if (!firstName || !lastName || !company || !email || !phone || !country) {
			return NextResponse.json(
				{ error: "Please fill in all required fields." },
				{ status: 400 },
			);
		}

		const apiKey = process.env.RESEND_API_KEY;
		if (!apiKey) {
			console.error("RESEND_API_KEY is not set.");
			return NextResponse.json(
				{
					error:
						"Enquiry service is not configured yet. Please email or WhatsApp us directly.",
				},
				{ status: 500 },
			);
		}

		const resend = new Resend(apiKey);
		const toEmail =
			process.env.ENQUIRY_TO_EMAIL ||
			siteConfig.contactEmail ||
			"ingavale.sameer99@gmail.com";

		const subject = productName
			? `New enquiry: ${productName} — ${company}`
			: `New enquiry (${category || "uncategorized"}) — ${company}`;

		const html = `
      <h2>New enquiry</h2>
      ${productName ? `<p><strong>Product:</strong> ${escapeHtml(productName)} (${escapeHtml(productSlug || "")})</p>` : ""}
      ${category ? `<p><strong>Category:</strong> ${escapeHtml(category)}</p>` : ""}
      <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone / WhatsApp:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Country:</strong> ${escapeHtml(country)}</p>
      ${timeline ? `<p><strong>Timeline:</strong> ${escapeHtml(timeline)}</p>` : ""}
      ${quantity ? `<p><strong>Quantity required:</strong> ${escapeHtml(quantity)}</p>` : ""}
      <p><strong>Details:</strong><br/>${escapeHtml(specifications || "—").replace(/\n/g, "<br/>")}</p>
    `;

		await resend.emails.send({
			/* 	from: `Sigma Industrial Enquiries <enquiries@${new URL(siteConfig.url).hostname}>`, */
			from: "onboarding@resend.dev",
			to: toEmail,
			reply_to: email,
			subject,
			html,
		});

		return NextResponse.json({ ok: true });
	} catch (err) {
		console.error("Enquiry submission failed:", err);
		return NextResponse.json(
			{
				error:
					"Failed to send your enquiry. Please try again or email us directly.",
			},
			{ status: 500 },
		);
	}
}

function escapeHtml(str) {
	return String(str)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}
