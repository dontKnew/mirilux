import Link from "next/link";
import Main from "@/components/layout/Main";
import { Home, ShoppingBag, ArrowRight } from "lucide-react";

export default function NotFoundPage() {
  return (
    <Main>
      <section className="relative min-h-[80vh] flex items-center justify-center px-4 overflow-hidden">

        {/* Background Glow */}
        <div className="absolute -top-32 -left-32 h-96 w-96 bg-[var(--primary)]/20 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 bg-[var(--secondary)]/20 blur-[120px]" />

        {/* Glass Card */}
        <div className="relative z-10 max-w-xl w-full text-center
                        bg-white/80 backdrop-blur-xl
                        rounded-3xl p-10 shadow-2xl border">

          {/* 404 */}
          <h1
            className="text-[110px] md:text-[140px] font-extrabold
                       bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]
                       bg-clip-text text-transparent leading-none"
          >
            404
          </h1>

          {/* Title */}
          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-gray-900">
            Lost in Fragrance?
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-gray-600 text-sm md:text-base">
            Looks like this page vanished into thin air.
            Don’t worry — your perfect perfume is just a click away ✨
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

            {/* Primary */}
            <Link
              href="/"
              className="
                inline-flex items-center justify-center gap-2
                px-6 py-3 rounded-xl
                bg-[var(--primary)] text-white font-semibold
                hover:bg-[var(--secondary)]
                hover:scale-[1.03] transition
              "
            >
              <Home size={18} />
              Go Home
            </Link>

            {/* Secondary */}
            <Link
              href="/shop"
              className="
                inline-flex items-center justify-center gap-2
                px-6 py-3 rounded-xl
                border-2 border-[var(--primary)]
                text-[var(--primary)] font-semibold
                hover:bg-[var(--primary)] hover:text-white
                hover:scale-[1.03] transition
              "
            >
              Shop Perfumes
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Soft hint */}
          <p className="mt-6 text-xs text-gray-400">
            MiriLux · Crafted for modern lifestyles
          </p>
        </div>
      </section>
    </Main>
  );
}
