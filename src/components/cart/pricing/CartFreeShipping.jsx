import { useCart } from "@/lib/useCart";
import { Truck } from "lucide-react";

export default function CartFreeShipping({ total = 485 }) {
  const FREE_LIMIT = 399;
  const percent = Math.min((total / FREE_LIMIT) * 100, 100);
  const hasItems = useCart((s) => s.hasItems());
  if(!hasItems) return ;

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
      <div className="flex items-center gap-2 text-sm text-green-700">
        <Truck size={16} />
        {total >= FREE_LIMIT ? (
          <span>You’ve unlocked FREE SHIPPING 🎉</span>
        ) : (
          <span>
            Add ₹{FREE_LIMIT - total} more for FREE SHIPPING
          </span>
        )}
      </div>

      <div className="mt-2 h-2 bg-green-100 rounded">
        <div
          className="h-2 bg-green-500 rounded transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
