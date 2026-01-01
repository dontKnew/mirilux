import { X } from "lucide-react";

export default function CartHeader({ onClose }) {
  return (
    <div className="py-2 px-4 bg-[var(--primary)]  border-b flex items-center justify-between">
      <div>
        <h2 className="text-lg !text-white tracking-wide">CART</h2>
        <p className="text-xs text-white font-medium">
          Flat 5% OFF on prepaid orders
        </p>
      </div>
      <button onClick={onClose} className="text-[var(--primary)] hover:text-white hover:border hover:border-white bg-white p-1 rounded-full hover:bg-[var(--primary)] transition">
        <X size={20} />
      </button>
    </div>
  );
}
