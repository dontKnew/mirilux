export default function TablePopupSkeleton() {
  return (
    <div className="animate-pulse space-y-6 max-h-[70vh] overflow-hidden pr-2">

      <div className="grid grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      <hr className="border-gray-100" />

      {/* 3. Nested Object Section (e.g., User/Address) */}
      <div className="space-y-3">
        <div className="h-4 bg-orange-100 rounded w-1/4 mb-4 border-l-4 border-orange-200 pl-2"></div>
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="h-2 bg-gray-200 rounded w-1/3"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Array Section (e.g., Order Items) */}
      <div className="space-y-3">
        <div className="h-4 bg-orange-100 rounded w-1/4 mb-4 border-l-4 border-orange-200 pl-2"></div>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="p-4 border border-gray-100 rounded-lg flex gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-md shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}