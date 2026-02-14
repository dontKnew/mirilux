"use client";

import { flexRender, getCoreRowModel, useReactTable, } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZES } from "@/data/admin/constant";
import useApiRequest from "@/hooks/useApiRequest";
import { useToast } from "../ui/toast/ToastProvider";
import TableMobileSkeleton from "./skeleton/TableMobileSkeleton";
import TableDesktopSkeleton from "./skeleton/TableDesktopSkeleton";
import DataTableTopBar from "./DataTableTopBar";
import DataTableFooter from "./DataTableFooter";
import { EyeIcon, Pencil, Trash2 } from "lucide-react";
import Popup from "../ui/Popup";
import TablePopupSkeleton from "./skeleton/TablePopupSkeleton";

export default function DataTable({ title = "Table", endpoint, columns, enableExport = true }) {
  const pageSizes = PAGE_SIZES;
  // const [loading, setLoading] = useState(true); // Default loading true
  const { send2, loading } = useApiRequest();
  const [data, setData] = useState([]);
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [meta, setMeta] = useState({
    total: 0,
    perPage: pageSizes[0],
    currentPage: 1,
    lastPage: 1,
  });
  const [popupData, setPopupData] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  // delete
  const handleDelete = async (ids) => {
    if (!window.confirm(`Are you sure you want to delete ${ids.length} item(s)?`)) return;

    try {
      const response = await send2(`/auth/admin/${endpoint}/delete`, { ids });
      showToast("Deleted successfully!");
      await fetchData();
      // setData((prev) => prev.filter((item) => !ids.includes(item.id)));
      // setRowSelection({}); 

      // setMeta((p) => {
      //   const newTotal = p.total - ids.length;
      //   return { 
      //     ...p, 
      //     total: newTotal,
      //     // Agar current page par koi data nahi bacha toh pichle page par jayein
      //     currentPage: data.length === ids.length && p.currentPage > 1 ? p.currentPage - 1 : p.currentPage 
      //   };
      // });
    } catch (e) {
      showToast(e.message || "Failed to delete");
    }
  };

  const viewData = async (id) => {
    setShowPopup(true)
    try {
      const response = await send2(`/auth/admin/${endpoint}/view`, { id });
      setPopupData(response);
    } catch (e) {
      showToast(e.message || "Something is wrong");
    }
  }


  const fetchData = async () => {
    try {
      const response = await send2('/auth/admin/' + endpoint, {
        page: meta.currentPage,
        limit: meta.perPage,
        search: search
      });
      setData(response.data);
      setMeta((p) => ({
        ...p,
        total: response.total,
        lastPage: response.lastPage,
      }));
    } catch (e) {
      showToast(e.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [endpoint, meta.currentPage, meta.perPage, search]);

  if (!data) { return; }

  const dynamicColumns = useMemo(() => {
    return buildColumns({ columns }); // Pass as an object
  }, [columns]);

  const table = useReactTable({
    data,
    columns: dynamicColumns,
    pageCount: meta.lastPage,
    meta: {
      handleDelete: handleDelete,
      viewData: viewData,
    },
    state: {
      pagination: {
        pageIndex: meta.currentPage - 1,
        pageSize: meta.perPage,
      },
      rowSelection,
    },
    manualPagination: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });




  /* ================= EXPORT ================= */
  const exportCSV = () => {
    if (!data) { return; }
    if (!data.length) return;

    const headers = Object.keys(data[0]);
    const rows = data.map((row) =>
      headers.map((h) => `"${row[h] ?? ""}"`).join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };


  const getPages = () => {
    const totalPages = meta.lastPage;
    const current = meta.currentPage;
    const maxVisible = 4; // How many buttons to show at once

    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const NestedData = ({ data }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
        {Object.entries(data).map(([k, v]) => {
          if (v === null || typeof v === 'object') return null; // Deep nesting ko avoid karne ke liye
          return (
            <div key={k} className="flex flex-col border-b border-gray-100 pb-1">
              <label className="text-xs font-semibold text-gray-400 uppercase">{k.replace('_', ' ')}</label>
              <span className="text-xs  font-semibold text-gray-800 break-words">{v.toString()}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return <>
    <div className="bg-white rounded shadow-sm overflow-hidden">
      <DataTableTopBar fetchData={fetchData}
        setMeta={setMeta} meta={meta} search={search} setSearch={setSearch} title={title} pageSizes={pageSizes} exportCSV={exportCSV} enableExport={enableExport}
      />

      <div className="w-full">
        <div className="block md:hidden divide-y divide-gray-100 space-y-4">
          {
            loading ? (
              <TableMobileSkeleton rowsCount={meta.perPage} />
            ) : (
              table.getRowModel().rows.map((row, index) => (
                <div key={row.id} className="md:p-4 px-2 space-y-2 bg-white border-b border-gray-400 mb-5 pb-4">
                    <div className="flex justify-center gap-4 bg-[var(--secondary)] text-white">
                        {index+1}
                    </div>
                  {row.getVisibleCells().map((cell) => (
                    <div key={cell.id} className="flex justify-between gap-4 text-sm">
                      <span className="font-semibold text-gray-500 uppercase text-[10px] tracking-wider">
                        {flexRender(cell.column.columnDef.header, cell.getContext())}
                      </span>
                      <span className="text-gray-900 text-right">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </span>
                    </div>
                  ))}
                </div>
              ))
            )
          }
        </div>

        {/* Desktop Table View (Hidden on small screens) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--primary)] border-b border-gray-100 text-white font-medium">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => (
                    <th key={h.id} className="px-6 py-4">
                      {flexRender(h.column.columnDef.header, h.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <TableDesktopSkeleton columnsCount={columns.length+2} rowsCount={meta.perPage} />
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-orange-100 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )
              }
            </tbody>
          </table>
        </div>
      </div>

      <DataTableFooter meta={meta} setMeta={setMeta} getPages={getPages} />
    </div>

    <Popup isOpen={showPopup} onClose={()=>{setShowPopup(false)}}  >
      <div className="flex items-center justify-between pb-3 mb-2">
        <h3 className="text-xl font-bold text-gray-800 tracking-tight">
          {title} Details
        </h3>
      </div>
      {
        loading ? (
          <TablePopupSkeleton />
        ) : (
          <>
      <div>
        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          {Object.entries(popupData).map(([key, value]) => {
            if (value === null || key.includes('password') || key === 'order_token' || key === 'updated_at' || key === 'created_at' || key === 'datetime') return null;
            if (Array.isArray(value)) {
              return (
                <div key={key} className="space-y-2 mt-10">
                  <h4 className="text-sm font-black uppercase text-orange-500 tracking-widest border-l-4 border-orange-500 pl-2">
                    {key.replace('_', ' ')}
                  </h4>
                  <div className="grid gap-3">
                    {value.map((item, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        {/* Yahan hum nested object rendering function ko call kar sakte hain */}
                        <NestedData data={item} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            // 3. Agar value ek OBJECT hai (e.g., order_address, user)
            if (typeof value === 'object') {
              return (
                <div key={key} className="space-y-2 mt-10">
                  <h4 className="text-sm font-black uppercase text-orange-500 tracking-widest border-l-4 border-orange-500 pl-2">
                    {key.replace('_', ' ')}
                  </h4>
                  <div className="p-3 bg-gray-50 rounded-xl border border-orange-100">
                    <NestedData data={value} />
                  </div>
                </div>
              );
            }
            return (
              <div key={key} className="flex flex-row justify-between border-b border-gray-100">
                <label className="text-xs md:text-sm font-semibold text-gray-400 uppercase">{key.replace('_', ' ')}</label>
                <span className="text-xs md:text-sm font-semibold text-gray-800 break-words">{value.toString()}</span>
              </div>
            );
          })}
        </div>
      </div>
          </>
        )
      }
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => {
            setShowPopup(false)
            setPopupData({})
          }}
          className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold shadow-sm transition-all active:scale-95"
        >
          Close
        </button>
      </div>
    </Popup>
  </>
}



function buildColumns({ columns, defaultCheckbox = true, defaultAction = true }) {
  const dynamicColumns = [];

  if (defaultCheckbox) {
    dynamicColumns.push({
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
          className="cursor-pointer"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
          className="cursor-pointer"
        />
      ),
    });
  }

  // 2. Middle Columns: Dynamic mapping
  columns.forEach((col) => {
    const isString = typeof col === 'string';
    const accessorKey = isString ? col : col.key;
    const headerText = isString
      ? col.replace('_', ' ').toUpperCase()
      : (col.name || col.key.replace('_', ' ').toUpperCase());

    // Basic column object
    const columnDef = {
      id: isString ? col : (col.id || col.key),
      accessorKey: accessorKey,
      header: headerText,
    };

    // FIX: Sirf tabhi 'cell' add karein jab callback maujood ho
    if (!isString && col.callback) {
      columnDef.cell = ({ getValue }) => col.callback(getValue());
    }

    dynamicColumns.push(columnDef);
  });

  // 3. Last Column: Actions
  if (defaultAction) {
    dynamicColumns.push({
      id: "actions",
      header: "Actions",
      cell: ({ row, table }) => (
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (table.options.meta?.viewData) {
                table.options.meta.viewData(row.original.id);
              }
            }}
            className="text-green-700 hover:text-primary-600 transition-colors"
          >
            <EyeIcon size={18} />
          </button>
          <button
            onClick={() => console.log("Edit ID:", row.original.id)}
            className="hover:text-blue-600 transition-colors"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => {
              if (table.options.meta?.handleDelete) {
                table.options.meta.handleDelete([row.original.id]);
              }
            }}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    });
  }

  return dynamicColumns;
}