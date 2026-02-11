import { Download, RefreshCcw, Search } from "lucide-react";

export default function DataTableTopBar({fetchData, meta, setMeta, search, setSearch, pageSizes, title, enableExport, exportCSV}){
    return <>
    {/* ===== TOP BAR ===== */}
          <div className="p-2 md:p-4 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
    
              <div className="flex items-center gap-3">
                <select
                  value={meta.perPage}
                  onChange={(e) =>
                    setMeta((p) => ({
                      ...p,
                      perPage: +e.target.value,
                      currentPage: 1,
                    }))
                  }
                  className="bg-gray-50 border border-gray-200 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 p-1.5"
                >
                  {pageSizes.map((s) => (
                    <option key={s} value={s}>{s} / page</option>
                  ))}
                </select>
              </div>
    
              <div className="flex flex-col sm:flex-row gap-2">
                <button title="reload the data" onClick={fetchData} className="btn btn-primary"><RefreshCcw size={14} /></button>
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Search size={16} />
                  </div>
                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setMeta((p) => ({ ...p, currentPage: 1 }));
                    }}
                    placeholder="Search records..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                </div>
    
                {enableExport && (
                  <button
                    onClick={exportCSV}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <Download size={16} />
                    <span>Export</span>
                  </button>
                )}
              </div>
            </div>
          </div>
    </>
}