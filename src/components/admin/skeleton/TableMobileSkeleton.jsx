export default function TableMobileSkeleton ({ rowsCount = 5 }){
  return (
    <>
      <div className="block md:hidden divide-y divide-gray-100">
        {[...Array(rowsCount)].map((_, i) => (
          <div key={i} className="p-4 space-y-3 bg-white animate-pulse">
            {[...Array(3)].map((_, j) => (
              <div key={j} className="flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};