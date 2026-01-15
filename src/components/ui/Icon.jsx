import { useEffect, useState } from "react";

function Icon({ Icon, label, count }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      className="relative active:scale-95 flex flex-col items-center gap-1 text-[var(--secondary)] hover:text-[var(--primary)] transition group"
    >
      {/* ICON WRAPPER */}
      <div className="relative">
        <Icon
          size={28}
          strokeWidth={1.5}
          className="group-hover:scale-105 transition-transform"
        />

        {/* CART BADGE */}
        {mounted && count > 0 && (
          <span className="absolute -top-2 -right-2 bg-[var(--primary)] text-white text-[10px] font-semibold h-5 min-w-[20px] px-1 flex items-center justify-center rounded-full shadow">
            {count}
          </span>
        )}
      </div>

      {/* LABEL */}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

export default Icon;
