export default function Topbar() {
  return (
    <div className="bg-[var(--primary)] text-white text-sm">
      <div className="md:max-w-7xl mx-auto px-4 py-1 flex justify-between md:text-sm text-xs md:text-start text-center">
        <span>Asia's 1st Brand with MADE SAFE Certified Products</span>
        <span className="hidden sm:block">
          Valid Only Today: Flat 50% Off | Shop Now
        </span>
      </div>
    </div>
  );
}
