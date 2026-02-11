export default function TableDesktopSkeleton ({ columnsCount = 5, rowsCount = 5 }){
  return (
    <>
        {[...Array(rowsCount)].map((_, i) => (
          <tr key={i} className="border-b border-gray-100 animate-pulse">
            {[...Array(columnsCount)].map((_, j) => (
              <td key={j} className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </td>
            ))}
          </tr>
        ))}
    </>
  );
};