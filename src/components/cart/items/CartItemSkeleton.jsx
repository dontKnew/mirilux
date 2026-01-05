export default function CartItemSkeleton() {
  return (
    <div className="flex gap-4 items-center pb-2 border-b animate-pulse bg-white">
      <div className="w-18 h-18 bg-gray-200 rounded" />

      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="flex gap-2 mt-2">
          <div className="h-7 w-7 bg-gray-200 rounded-full" />
          <div className="h-4 w-6 bg-gray-200 rounded" />
          <div className="h-7 w-7 bg-gray-200 rounded-full" />
        </div>
      </div>

      <div className="flex flex-col items-end gap-4">
        <div className="h-4 w-12 bg-gray-200 rounded" />
        <div className="h-4 w-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
