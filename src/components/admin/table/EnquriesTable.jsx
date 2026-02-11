import { Pencil, Trash2 } from "lucide-react";
import { formatDateToIST } from "@/utils/array";
import DataTable from "../DataTable";

export default function EnquriesTable() {
  const columnsName = ['id',  'full_name', 'email', 'phone_no',
    {
      name: "Enquiry Date",
      key: 'created_at',
      callback: (value) => formatDateToIST(value)
    }
  ];
  return (
    <DataTable
      title="Users Management"
      endpoint="enquiry"
      columns={columnsName}
    />
  );
}

