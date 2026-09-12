"use client";
import { useEffect, useState } from "react";
export default function ArticleContents() {
	const [headings, setHeadings] = useState([]);
	const [activeId, setActiveId] = useState("");
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		const article = document.querySelector(".article-content");
		if (!article) return;
		const headingElements = Array.from(article.querySelectorAll("h2, h3"));
		if (!headingElements.length) return;
		/* * Generate IDs for headings automatically. * Example: * * "Why Indian Manufacturing Matters" * → * "why-indian-manufacturing-matters" */ const createSlug =
			(text) => {
				return text
					.toLowerCase()
					.trim()
					.replace(/[^\w\s-]/g, "")
					.replace(/\s+/g, "-")
					.replace(/-+/g, "-");
			};
		const usedIds = new Set();
		const items = headingElements.map((heading) => {
			let id = heading.id || createSlug(heading.textContent);
			/* * Prevent duplicate IDs if two headings have * the same text. */ const baseId =
				id;
			let counter = 2;
			while (usedIds.has(id)) {
				id = `${baseId}-${counter}`;
				counter++;
			}
			heading.id = id;
			usedIds.add(id);
			return {
				id,
				text: heading.textContent,
				level: heading.tagName.toLowerCase(),
			};
		});
		setHeadings(items);
		/* * Highlight the heading currently being read. */ const observer =
			new IntersectionObserver(
				(entries) => {
					const visible = entries
						.filter((entry) => entry.isIntersecting)
						.sort(
							(a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
						);
					if (visible.length > 0) {
						setActiveId(visible[0].target.id);
					}
				},
				{ rootMargin: "-120px 0px -65% 0px", threshold: 0 },
			);
		headingElements.forEach((heading) => {
			observer.observe(heading);
		});
		/* * Calculate reading progress based ONLY on * the article body. */ const updateProgress =
			() => {
				const rect = article.getBoundingClientRect();
				const articleTop = window.scrollY + rect.top;
				const articleHeight = article.offsetHeight;
				const viewportHeight = window.innerHeight;
				const scrollableHeight = articleHeight - viewportHeight;
				if (scrollableHeight <= 0) {
					setProgress(100);
					return;
				}
				const current =
					((window.scrollY - articleTop) / scrollableHeight) * 100;
				setProgress(Math.min(100, Math.max(0, current)));
			};
		window.addEventListener("scroll", updateProgress, { passive: true });
		window.addEventListener("resize", updateProgress);
		updateProgress();
		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", updateProgress);
			window.removeEventListener("resize", updateProgress);
		};
	}, []);
	if (!headings.length) return null;
	return (
		<aside className="hidden lg:block sticky top-24 self-start w-[220px]">
			{" "}
			<div className="flex items-center justify-between mb-4">
				{" "}
				<span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
					{" "}
					Contents{" "}
				</span>{" "}
				{/* <span className="text-[11px] tabular-nums text-gray-400">
					{" "}
					{Math.round(progress)}%{" "}
				</span> */}
			</div>{" "}
			<nav className="border-l border-gray-200">
				{" "}
				{headings.map((heading, index) => (
					<a
						key={heading.id}
						href={`#${heading.id}`}
						className={` group flex items-start gap-3 border-l-2 -ml-px py-2 pl-4 text-[14px] transition-colors duration-150 ${activeId === heading.id ? "border-accent text-accent" : "border-transparent text-gray-400 hover:text-gray-700"} ${heading.level === "h3" ? "ml-3 text-[12px]" : ""} `}>
						{" "}
						<span
							className={` shrink-0 font-mono text-[13px] tabular-nums tracking-wide ${activeId === heading.id ? "text-accent" : "text-gray-300 group-hover:text-gray-500"} `}>
							{" "}
							{String(index + 1).padStart(2, "0")}{" "}
						</span>{" "}
						<span>{heading.text}</span>{" "}
					</a>
				))}{" "}
			</nav>{" "}
		</aside>
	);
}
