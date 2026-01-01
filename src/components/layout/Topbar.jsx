export default function Topbar() {
  return (
    <div className="bg-[var(--primary)] text-white text-sm">
      <div className="md:max-w-7xl mx-auto md:px-4 px-2 py-2 flex justify-between md:text-sm text-xs md:text-start text-center">
        <span className="md:text-start text-center">Asia's 1st Brand with MADE SAFE Certified Products</span>
        <span className="hidden sm:block">
          Valid Only Today: Flat 50% Off | Shop Now
        </span>
      </div>
    </div>
  );
}
