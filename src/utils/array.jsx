import { pageData } from "@/data/admin/pageData";

export default function addValueToObject(arrayObjects, objectRow) {
    return arrayObjects.map(obj => ({
        ...obj,
        ...objectRow
    }));
}


export function printJson(value) {
  const getPrintableValue = (val) => {
    if (val === null) return "null";
    if (val === undefined) return "undefined";

    if (typeof val === "string") return val;
    if (typeof val === "number" || typeof val === "boolean")
      return String(val);
    if (typeof val === "bigint") return `${val.toString()}n`;
    if (typeof val === "symbol") return val.toString();
    if (typeof val === "function")
      return `[Function: ${val.name || "anonymous"}]`;

    if (val instanceof Date) return val.toISOString();
    if (val instanceof Error)
      return `${val.name}: ${val.message}\n${val.stack || ""}`;

    // Handle circular references
    const seen = new WeakSet();
    try {
      return JSON.stringify(
        val,
        (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) return "[Circular]";
            seen.add(value);
          }
          return value;
        },
        2
      );
    } catch {
      return "[Unserializable Object]";
    }
  };

  const output = getPrintableValue(value);

  return (
    <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto whitespace-pre-wrap break-words">
      {output}
    </pre>
  );
}



export function formatDateToIST(
  isoDate,
  options = {}
) {
  if (!isoDate) return "";

  const date = new Date(isoDate);

  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    ...options,
  }).format(date);
}


export function getPageData(pathName) {
  const data = pageData;

  const result = data.find((item) => item.href === pathName);
  
  return result || null; // Agar undefined hai to null return karega
}