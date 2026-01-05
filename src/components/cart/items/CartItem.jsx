import { memo, useState, useEffect } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";

const CartItem = memo(function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const t = setTimeout(() => setAnimate(false), 150);
    return () => clearTimeout(t);
  }, [item.qty]);

  return (
    <div
      className={`flex gap-4 items-center pb-2 border-b bg-white transition-transform
        ${animate ? "scale-[1.02]" : "scale-100"}`}
    >
      <img
        src={`/images/products/${item.image}`}
        className="w-18 h-18 object-contain rounded border bg-gray-300"
        alt={item.name}
      />

      <div className="flex-1">
        <p className="font-medium leading-snug">{item.name}</p>
        <p className="text-xs text-gray-500">{item.size}</p>

        <div className="flex items-center gap-3 mt-1">
          <button
            onClick={onDecrease}
            className="h-7 w-7 rounded-full border flex items-center justify-center active:scale-95"
          >
            <Minus size={14} />
          </button>

          <span className="min-w-[20px] text-center font-medium transition">
            {item.qty}
          </span>

          <button
            onClick={onIncrease}
            className="h-7 w-7 rounded-full border flex items-center justify-center active:scale-95"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-5">
        <p className="font-semibold">₹{item.price}</p>
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-red-500"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
});

export default CartItem;
