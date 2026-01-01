import Link from "next/link";
import Main from "@/components/layout/Main";
import Title from "@/components/ui/Title";
import {
  Flame,
  Flower,
  Droplets,
  Crown,
  Gift,
  Sparkles,
  Users,
  Leaf,
} from "lucide-react";

const categories = [
  { name: "Men", slug: "men", icon: Flame },
  { name: "Women", slug: "women", icon: Flower },
  { name: "Unisex", slug: "unisex", icon: Users },
  { name: "Oud", slug: "oud", icon: Crown },
  { name: "Floral", slug: "floral", icon: Leaf },
  { name: "Woody", slug: "woody", icon: Droplets },
  { name: "Fresh", slug: "fresh", icon: Sparkles },
  { name: "Gift Sets", slug: "gifts", icon: Gift },
];

export default function Page() {
  return (
    <Main>
      <section className="max-w-7xl mx-auto px-4 py-12">

        {/* TITLE */}
        <Title
          title="Shop by Category"
          subtitle="Explore perfumes crafted for every mood & personality"
        />

        {/* CATEGORY GRID */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map(({ name, slug, icon: Icon }) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className="group"
            >
              <div
                className="flex flex-col items-center justify-center gap-3
                           bg-white border border-gray-300 rounded-xl
                           py-8 px-4 text-center
                           hover:border-[var(--primary)]
                           hover:shadow-md transition"
              >
                <div
                  className="h-14 w-14 rounded-full
                             bg-[var(--primary)]/10
                             flex items-center justify-center
                             group-hover:bg-[var(--primary)]
                             transition"
                >
                  <Icon
                    size={28}
                    className="text-[var(--primary)] group-hover:text-white transition"
                  />
                </div>

                <span className="font-medium text-gray-800 group-hover:text-[var(--primary)]">
                  {name}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </section>
    </Main>
  );
}
