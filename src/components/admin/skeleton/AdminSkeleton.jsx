export default function AdminSkeleton() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Skeleton */}
      <div className="hidden md:flex w-64 flex-col bg-[#002d62]">
        <div className="p-6">
          <div className="h-8 bg-white/20 rounded-md w-3/4 mb-10 animate-pulse"></div>
          
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <div className="w-6 h-6 bg-white/10 rounded animate-pulse"></div>
                <div className="h-4 bg-white/10 rounded w-24 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Navbar Skeleton */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        </header>

        {/* Content Body Skeleton */}
        <main className="p-6 overflow-auto">
          {/* Dashboard Title */}
          <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>

          {/* Large Table Content Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
             <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
             <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-50 rounded w-full"></div>
                ))}
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}