"use client";

import { useState } from "react";
import { categories } from "@/lib/products";
import { countries, timelineOptions } from "@/lib/enquiry-options";

const GENERAL_ENQUIRY = "General enquiry (not a purchase)";

// Posts to /api/enquiry, which emails the submission via Resend.
// Plain controlled-by-FormData submit — no form library, nothing to learn.
//
// When `productName` is passed (used on a product page), the enquiry is
// already implicitly categorized by that product, so the category
// dropdown is skipped. Quantity always shows there (a product-page
// enquiry is always purchase intent), but Required Delivery Timeline
// never does — asking "when do you need it" makes less sense once
// you're already looking at one specific product's own lead time.
//
// Everywhere else (the Contact page, the catalog's "don't see what you
// need" form) shows the category dropdown — and if the person picks
// "General enquiry (not a purchase)", quantity and timeline both hide
// entirely and stop being required, since neither question makes sense
// for a non-purchase contact.
export default function EnquiryForm({ productName, productSlug }) {
	const [status, setStatus] = useState("idle"); // idle | submitting | success | error
	const [errorMsg, setErrorMsg] = useState("");
	const [category, setCategory] = useState("");
	const showCategorySelect = !productName;
	const isGeneralEnquiry = showCategorySelect && category === GENERAL_ENQUIRY;
	const showQuantity = !isGeneralEnquiry;
	const showTimeline = !isGeneralEnquiry && showCategorySelect; // never on a product page

	async function handleSubmit(e) {
		e.preventDefault();
		setStatus("submitting");
		setErrorMsg("");

		const form = e.currentTarget;
		const data = Object.fromEntries(new FormData(form).entries());

		try {
			const res = await fetch("/api/enquiry", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...data, productName, productSlug }),
			});

			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.error || "Something went wrong.");
			}

			setStatus("success");
			form.reset();
			setCategory("");
		} catch (err) {
			setStatus("error");
			setErrorMsg(err.message || "Something went wrong.");
		}
	}

	if (status === "success") {
		return (
			<p className="text-gray-700 border border-gray-200 rounded-md bg-gray-50 p-4">
				Message sent{productName ? ` for ${productName}` : ""}.
			</p>
		);
	}

	return (
		<form onSubmit={handleSubmit} id="enquire" className="space-y-4">
			{productName && (
				<input type="hidden" name="productName" value={productName} />
			)}

			{showCategorySelect && (
				<div>
					<label
						htmlFor="category"
						className="block text-sm text-gray-700 mb-1">
						Enquiry Type *
					</label>
					<select
						id="category"
						name="category"
						required
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-navy outline-none bg-white">
						<option value="" disabled></option>
						{categories.map((cat) => (
							<option key={cat.slug} value={cat.name}>
								{cat.name}
							</option>
						))}
						<option value="Other (category not listed)">
							Other (category not listed)
						</option>
						<option value={GENERAL_ENQUIRY}>{GENERAL_ENQUIRY}</option>
					</select>
				</div>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Field label="First name" name="firstName" required />
				<Field label="Last name" name="lastName" required />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Field label="Company" name="company" required />
				<Field label="Email" name="email" type="email" required />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Field label="Phone / WhatsApp" name="phone" required />
				<div>
					<label htmlFor="country" className="block text-sm text-gray-700 mb-1">
						Country *
					</label>
					<select
						id="country"
						name="country"
						required
						defaultValue=""
						className="w-full border border-gray-300 rounded-md px-2 py-2 focus:border-navy outline-none bg-white">
						<option value="" disabled></option>
						<optgroup label="Top countries">
							{countries.top.map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</optgroup>
						<optgroup label="Other countries">
							{countries.rest.map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</optgroup>
					</select>
				</div>
			</div>

			{/* Quantity and timeline only make sense for purchase intent — both
          disappear (and stop being required) for a general enquiry.
          Timeline additionally never shows on a product page at all —
          see the comment at the top of this file. */}
			{showQuantity && (
				<div
					className={
						showTimeline ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : ""
					}>
					<Field label="Quantity (if applicable)" name="quantity" />
					{showTimeline && (
						<div>
							<label
								htmlFor="timeline"
								className="block text-sm text-gray-700 mb-1">
								Required Delivery Timeline
							</label>
							<select
								id="timeline"
								name="timeline"
								required
								defaultValue=""
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-navy outline-none bg-white">
								<option value="" disabled></option>
								{timelineOptions.map((t) => (
									<option key={t} value={t}>
										{t}
									</option>
								))}
							</select>
						</div>
					)}
				</div>
			)}

			<div>
				<label
					htmlFor="specifications"
					className="block text-sm text-gray-700 mb-1">
					{showCategorySelect ? "Details" : "Details"}
				</label>
				<textarea
					id="specifications"
					name="specifications"
					rows={3}
					className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-navy outline-none"
				/>
			</div>

			{status === "error" && <p className="text-accent">{errorMsg}</p>}

			{/* Accent color here on purpose — this is the single highest-intent
          action on the whole site, so it's the one button that gets the
          "act now" color instead of the structural navy everything else
          uses. */}
			<button
				type="submit"
				disabled={status === "submitting"}
				className="bg-accent text-white text-sm px-5 py-2.5 rounded-md hover:bg-accent/90 disabled:opacity-50">
				{status === "submitting" ? "Sending…" : "Send"}
			</button>
		</form>
	);
}

function Field({ label, name, type = "text", required = false }) {
	return (
		<div>
			<label htmlFor={name} className="block text-sm text-gray-700 mb-1">
				{label}
				{required && " *"}
			</label>
			<input
				id={name}
				name={name}
				type={type}
				required={required}
				className="w-full border border-gray-300 rounded-md px-2 py-1.5 outline-none"
			/>
		</div>
	);
}
