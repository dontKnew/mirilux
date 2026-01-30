import { ORDER_STATUS, ORDER_STATUS_MESSAGE, WEBSITE } from "@/data/constant";
import {CheckCircle,PackageCheck,Truck,MapPin,HelpCircle,Search,XCircle,} from "lucide-react";
function StatusItem({ icon, title, desc, datetime, state }) {
  const styles = {
    completed: "bg-green-500 text-white",
    active: "bg-[var(--primary)] text-white",
    pending: "bg-gray-200 text-gray-500",
    cancelled: "bg-red-500 text-white",
    disabled: "bg-gray-100 text-gray-300",
  };

  return (
    <div className="flex items-center gap-4">
      <div
        className={`h-10 w-10 rounded-full flex items-center justify-center ${styles[state]}`}
      >
        {icon}
      </div>

      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>

        {datetime && (
          <p className="text-xs text-gray-400 mt-1">
            {datetime}
          </p>
        )}
      </div>
    </div>
  );
}

const BASE_TIMELINE = [
  { status: ORDER_STATUS.PENDING, title: "Order Placed", icon: <CheckCircle /> },
  { status: ORDER_STATUS.CONFIRMED, title: "Confirmed", icon: <PackageCheck /> },
  { status: ORDER_STATUS.SHIPPED, title: "Shipped", icon: <Truck /> },
  { status: ORDER_STATUS.DELIVERED, title: "Delivered", icon: <MapPin /> },
];
const RETURN_TIMELINE = [
  {
    status: ORDER_STATUS.RETURN_REQUESTED,
    title: "Return Requested",
    icon: <HelpCircle />,
  },
  {
    status: ORDER_STATUS.RETURN_APPROVED,
    title: "Return Approved",
    icon: <CheckCircle />,
  },
  {
    status: ORDER_STATUS.RETURNED,
    title: "Returned",
    icon: <PackageCheck />,
  },
];
export {StatusItem, BASE_TIMELINE, RETURN_TIMELINE};