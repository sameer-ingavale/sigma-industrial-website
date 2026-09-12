"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const updateProgress = () => {
			const article = document.querySelector(".article-content");

			if (!article) return;

			const rect = article.getBoundingClientRect();

			const articleTop = window.scrollY + rect.top;
			const articleHeight = article.offsetHeight;
			const viewportHeight = window.innerHeight;

			const scrollableHeight = articleHeight - viewportHeight;

			if (scrollableHeight <= 0) {
				setProgress(100);
				return;
			}

			const current = ((window.scrollY - articleTop) / scrollableHeight) * 100;

			setProgress(Math.min(100, Math.max(0, current)));
		};

		window.addEventListener("scroll", updateProgress, {
			passive: true,
		});

		window.addEventListener("resize", updateProgress);

		updateProgress();

		return () => {
			window.removeEventListener("scroll", updateProgress);
			window.removeEventListener("resize", updateProgress);
		};
	}, []);

	return (
		<div className="fixed inset-x-0 top-0 z-[100] h-[3px] bg-slate-100">
			<div
				className="h-full bg-accent transition-[width] duration-75 ease-out"
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
}
