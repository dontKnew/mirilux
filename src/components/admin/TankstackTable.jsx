"use client";

import { flexRender, getCoreRowModel,useReactTable} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpDown, Pencil, Trash2, Download } from "lucide-react";
import { formatDateToIST } from "@/utils/array";
import { PAGE_SIZES } from "@/data/admin/constant";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TanstackTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [meta, setMeta] = useState({ total: 0, perPage: 10, currentPage: 1, lastPage: 1 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    fetch(`/admin/api/users?page=${meta.currentPage}&limit=${meta.perPage}&search=${globalFilter}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        setMeta({
          total: json.total,
          perPage: json.perPage,
          currentPage: json.currentPage,
          lastPage: json.lastPage,
        });
      });
  }, [meta.currentPage, meta.perPage, globalFilter]);

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },

      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "full_name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phone_no",
        header: "Phone No",
      },
      {
        accessorKey: "created_at",
        header: "Registered Date",
        cell: ({ getValue }) => (
          <span className={`px-3 py-1 rounded-full text-sm bg-blue-100`}>
            {formatDateToIST(getValue())}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-3">
            <button
              onClick={() => alert(`Edit User ID: ${row.original.id}`)}
              className="text-[var(--secondary)] hover:opacity-80"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="text-red-600 hover:opacity-80"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  /* ================= TABLE ================= */
  const table = useReactTable({
    data,
    columns,
    pageCount: meta.lastPage, 
    state: {
      pagination: {
        pageIndex: meta.currentPage - 1, // TanStack is 0-based
        pageSize: meta.perPage,
      },
      rowSelection,
    },
    manualPagination: true, // 🔥 REQUIRED
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDelete = (id) => {
    setData((prev) => prev.filter((row) => row.id !== id));
  };

  const handleBulkDelete = () => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((r) => r.original.id);
    setData((prev) => prev.filter((row) => !selectedIds.includes(row.id)));
    setRowSelection({});
  };

  const exportCSV = () => {
    const headers = ["ID", "Name", "Email", "Role"];
    const rows = data.map((row) =>
      [row.id, row.name, row.email, row.role].join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getPageNumbers = () => {
    const total = meta.lastPage;
    const current = meta.currentPage;

    const delta = 2; // pages before & after current
    const pages = [];

    for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
      pages.push(i);
    }

    return pages;
  };
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Top Bar */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <h3 className="flex gap-2 text-lg font-semibold text-[var(--secondary)]">
          <div className="flex items-center gap-2">
            <select
              value={meta.perPage}
              onChange={(e) =>
                setMeta((prev) => ({
                  ...prev,
                  perPage: Number(e.target.value),
                  currentPage: 1, // 🔥 reset page
                }))
              }
              className="border rounded-md px-2 py-1 text-sm
               focus:ring-2 focus:ring-[var(--primary)]"
            >
              {PAGE_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          Users Management
        </h3>

        <div className="flex gap-2 items-center">
          {table.getSelectedRowModel().rows.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-3 py-2 text-sm rounded-md bg-red-600 text-white"
            >
              Delete Selected
            </button>
          )}

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-3 py-2 text-sm
                       rounded-md border hover:bg-gray-100"
          >
            <Download size={16} />
            Export CSV
          </button>

          <input
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="border rounded-md px-3 py-2 text-sm
                       focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[var(--secondary)] text-white">
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-3 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <ArrowUpDown size={14} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-300 hover:bg-[rgba(241,101,4,0.05)]"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-500">
          Showing {(meta.currentPage - 1) * meta.perPage + 1}–
          {Math.min(meta.currentPage * meta.perPage, meta.total)} of {meta.total}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() =>
              setMeta((prev) => ({
                ...prev,
                currentPage: Math.max(prev.currentPage - 1, 1),
              }))
            }
            disabled={meta.currentPage === 1}
            className="p-2 border rounded disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() =>
                setMeta((prev) => ({
                  ...prev,
                  currentPage: page,
                }))
              }
              className={`px-3 py-1 rounded border text-sm
          ${meta.currentPage === page
                  ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                  : "hover:bg-gray-100"
                }
        `}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() =>
              setMeta((prev) => ({
                ...prev,
                currentPage: Math.min(prev.currentPage + 1, prev.lastPage),
              }))
            }
            disabled={meta.currentPage === meta.lastPage}
            className="p-2 border rounded disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

    </div>
  );
}
