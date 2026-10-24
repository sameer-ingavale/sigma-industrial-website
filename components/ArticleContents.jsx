"use client";

import { useEffect, useState } from "react";

export default function ArticleContents() {
	const [headings, setHeadings] = useState([]);
	const [activeId, setActiveId] = useState("");

	useEffect(() => {
		const article = document.querySelector(".article-content");
		if (!article) return;

		const headingElements = Array.from(article.querySelectorAll("h2, h3"));

		if (!headingElements.length) return;

		const createSlug = (text) =>
			text
				.toLowerCase()
				.trim()
				.replace(/[^\w\s-]/g, "")
				.replace(/\s+/g, "-")
				.replace(/-+/g, "-");

		const usedIds = new Set();

		const items = headingElements.map((heading) => {
			const baseId = heading.id || createSlug(heading.textContent);
			let id = baseId;
			let counter = 2;

			while (usedIds.has(id)) {
				id = `${baseId}-${counter}`;
				counter++;
			}

			heading.id = id;
			usedIds.add(id);

			return {
				id,
				text: heading.textContent.trim(),
				level: heading.tagName.toLowerCase(),
			};
		});

		setHeadings(items);

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

				if (visible.length) {
					setActiveId(visible[0].target.id);
				}
			},
			{
				rootMargin: "-120px 0px -65% 0px",
				threshold: 0,
			},
		);

		headingElements.forEach((heading) => {
			observer.observe(heading);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<aside className="hidden w-[220px] min-w-0 self-start lg:sticky lg:top-24 lg:block">
			<div className="mb-4 flex items-center justify-between">
				<span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
					Contents
				</span>
			</div>

			<nav aria-label="Table of contents" className="border-l border-gray-200">
				{headings.length > 0 ? (
					headings.map((heading, index) => (
						<a
							key={heading.id}
							href={`#${heading.id}`}
							onClick={(event) => {
								event.preventDefault();

								const target = document.getElementById(heading.id);

								if (target) {
									target.scrollIntoView({
										behavior: "smooth",
										block: "start",
									});

									window.history.replaceState(null, "", `#${heading.id}`);
								}
							}}
							className={`group -ml-px flex items-start gap-3 border-l-2 py-2 pl-4 text-[16px] transition-colors duration-150 ${
								activeId === heading.id
									? "border-accent text-accent"
									: "border-transparent text-gray-400 hover:text-gray-700"
							} ${heading.level === "h3" ? "ml-3 text-[12px]" : ""}`}>
							<span
								className={`shrink-0 font-mono text-[13px] tabular-nums tracking-wide ${
									activeId === heading.id
										? "text-accent"
										: "text-gray-300 group-hover:text-gray-500"
								}`}>
								{String(index + 1).padStart(2, "0")}
							</span>

							<span>{heading.text}</span>
						</a>
					))
				) : (
					<div aria-hidden="true" className="min-h-8 py-2 pl-4" />
				)}
			</nav>
		</aside>
	);
}
