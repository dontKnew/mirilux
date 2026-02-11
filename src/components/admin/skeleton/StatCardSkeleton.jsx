export default function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 p-5 shadow-sm bg-white">
      <div className="animate-pulse flex items-start justify-between">

        {/* Left Section */}
        <div className="flex items-center gap-4">

          {/* Icon Circle */}
          <div className="w-12 h-12 rounded-xl bg-gray-200"></div>

          {/* Text */}
          <div className="space-y-3">
            <div className="h-3 w-24 rounded bg-gray-200"></div>
            <div className="h-7 w-20 rounded bg-gray-300"></div>
          </div>
        </div>

        {/* Arrow Placeholder */}
        <div className="w-5 h-5 rounded bg-gray-200"></div>

      </div>
    </div>
  );
}
