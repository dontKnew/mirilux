"use client";

export default function ViewMoreButton() {
  const toggle = (e) => {
    const container = e.currentTarget.closest("[data-expanded]");
    const isExpanded = container.dataset.expanded === "true";
    container.dataset.expanded = String(!isExpanded);
  };

  return (
    <button
      onClick={toggle}
      className="mt-2 text-sm font-medium text-blue-600 hover:underline"
    >
      View More / View Less
    </button>
  );
}
