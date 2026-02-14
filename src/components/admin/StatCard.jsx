import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function StatCard({
  title,
  value,
  icon: Icon,
  color = "var(--primary)",
  link = "#",
}) {
  return (
    <Link href={link} className="group block">
      <div
        className="
        relative overflow-hidden
        bg-white rounded p-5
        border border-gray-200
        shadow-sm
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
      "
      >
        {/* Gradient Hover Glow */}
        <div
          className="
          absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--secondary)]/5
        "
        />

        <div className="relative flex items-start justify-between">

          {/* Left Section */}
          <div className="flex items-center gap-4">

            {/* Icon Circle */}
            <div
              className="
              w-12 h-12 flex items-center justify-center
              rounded-xl
              bg-[var(--primary)]/10
              text-[var(--primary)]
              group-hover:scale-110 transition-transform duration-300
            "
            >
              {Icon && <Icon size={22} />}
            </div>

            {/* Text */}
            <div>
              <p className="text-sm text-gray-500">{title}</p>

              <h3 className="text-2xl font-semibold text-[var(--secondary)] mt-1 tracking-tight">
                {value}
              </h3>
            </div>
          </div>

          {/* Right Arrow */}
          <ArrowUpRight
            size={20}
            className="
            text-gray-300
            group-hover:text-[var(--primary)]
            group-hover:translate-x-1 group-hover:-translate-y-1
            transition-all duration-300
          "
          />
        </div>
      </div>
    </Link>
  );
}
