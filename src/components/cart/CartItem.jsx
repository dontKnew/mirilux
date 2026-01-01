import { Plus, Minus, Trash2 } from "lucide-react";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div
      className="flex gap-4 items-center pb-2 border-b border-color hover:shadow-sm transition bg-white"
    >
      {/* Product Image */}
      <div className="flex flex-col items-center">
        <img
          src={item.image}
          className="w-18 h-18 object-contain rounded border bg-gray-300"
          alt={item.name}
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <p className="font-medium text-sm leading-snug">
          {item.name}
        </p>
        <p className="text-xs text-gray-500">{item.size}</p>
        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-1">
          <button
            onClick={() => onDecrease(item.id)}
            className="h-7 w-7 rounded-full border border-gray-300
                       flex items-center justify-center
                       hover:bg-gray-100 active:scale-95 transition"
          >
            <Minus size={14} />
          </button>

          <span className="min-w-[20px] text-center text-sm font-medium">
            {item.qty}
          </span>

          <button
            onClick={() => onIncrease(item.id)}
            className="h-7 w-7 rounded-full border border-gray-300
                       flex items-center justify-center
                       hover:bg-gray-100 active:scale-95 transition"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Price + Remove */}
      <div className="flex flex-col h-full items-end justify-between gap-5">
        <p className="font-semibold text-sm">
          ₹{item.price}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-gray-400 hover:text-red-500 transition"
          title="Remove item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
