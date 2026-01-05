export default function CartItemSuggestion({ item, addToCart }) {
  return (
    <div className="flex gap-3 items-center">
      <img
        src={`/images/products/${item.image}`}
        className="w-12 h-12 object-contain rounded border"
        alt={item.name}
      />

      <div className="flex-1">
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-gray-500">
          ₹{item.price}
          <span className="line-through ml-1">₹{item.mrp}</span>
        </p>
      </div>

      <button onClick={()=>{addToCart(item.id)}} className="text-[var(--primary)] font-semibold">
        ADD
      </button>
    </div>
  );
}
