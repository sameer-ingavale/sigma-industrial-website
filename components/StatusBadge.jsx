// Two distinct pill styles instead of plain gray uppercase text — solid
// navy for "sourced on demand" (we go get it, standard process), a
// navy-outlined pill for "made to order" (built to your spec, a
// different kind of commitment). No new color introduced — just the
// existing navy used two ways, since the two statuses are different
// enough to deserve visibly different treatment, not just different words.
const STATUS_LABEL = {
	"sourced-on-demand": "Sourced on demand",
	"made-to-order": "Made to order",
};

export default function StatusBadge({ status }) {
	const label = STATUS_LABEL[status] || status.replace("-", " ");
	const isMadeToOrder = status === "made-to-order";

	return (
		<span
			className={
				!isMadeToOrder
					? "inline-block text-xs font-medium uppercase tracking-wide border border-navy text-navy rounded-md px-2.5 py-1 pt-1.5"
					: "inline-block text-xs font-medium uppercase tracking-wide bg-navy text-white rounded-md px-2.5 py-1 pt-1.5"
			}>
			{label}
		</span>
	);
}
