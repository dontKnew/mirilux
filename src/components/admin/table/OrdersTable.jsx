
import { Pencil, Trash2 } from "lucide-react";
import DataTable from "../DataTable";
import { formatDateToIST } from "@/utils/array";

export default function OrdersTable() {

  const columns = [
    { key: "order_number", 
      name: "Order Number" 
    },
    { key: "full_name", name: "Full Name" },
    { key: "phone_no", name: "Phone No" },
    { key: "total_amount", name: "Amount" },
    { key: "order_status", name: "Order Status" },
    { key: "order_date", name: "Order Date",
      callback: (value) => formatDateToIST(value)
     }
  ];

  return (
    <DataTable
      title="Orders Management"
      endpoint="orders"
      columns={columns}
    />
  );
}
