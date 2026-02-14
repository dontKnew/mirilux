import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DataTableFooter({meta, setMeta, getPages }){
    return <>
    {/* ===== FOOTER ===== */}
      <div className="p-2 md:p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-xs md:text-sm text-gray-500 font-medium">
          Showing <span className="text-gray-900">{(meta.currentPage - 1) * meta.perPage + 1}</span> to <span className="text-gray-900">{Math.min(meta.currentPage * meta.perPage, meta.total)}</span> of <span className="text-gray-900">{meta.total}</span> entries
        </span>

        <div className="flex items-center gap-2">
          <button
            disabled={meta.currentPage === 1}
            onClick={() => setMeta((p) => ({ ...p, currentPage: p.currentPage - 1 }))}
            className="p-2 border border-gray-200 rounded bg-white disabled:opacity-30 hover:bg-gray-50 transition-all"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="hidden sm:flex items-center gap-1">
            {getPages().map((p) => (
              <button
                key={p}
                onClick={() => setMeta((m) => ({ ...m, currentPage: p }))}
                className={`w-9 h-9 flex items-center justify-center rounded border text-sm font-medium transition-all
                  ${p === meta.currentPage
                    ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-200"
                    : "bg-white border-gray-200 text-gray-600 hover:border-orange-500 hover:text-orange-500"}`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            disabled={meta.currentPage === meta.lastPage}
            onClick={() => setMeta((p) => ({ ...p, currentPage: p.currentPage + 1 }))}
            className="p-2 border border-gray-200 rounded bg-white disabled:opacity-30 hover:bg-gray-50 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </>
}