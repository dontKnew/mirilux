const suggestions = [
  {
    id: 1,
    name: "Narco Unisex",
    price: 449,
    mrp: 899,
    img: "/images/products/p2.png",
  },
  {
    id: 2,
    name: "Pure Musk",
    price: 449,
    mrp: 899,
    img: "/images/products/p3.png",
  },
  {
    id: 3,
    name: "White Oud",
    price: 565,
    mrp: 999,
    img: "/images/products/p4.png",
  },
];

export default function CartSuggestions() {
  return (
    <div className="pt-4 border-t border-color">
      <h3 className="text-sm font-semibold mb-3">
        You may also like
      </h3>

      <div className="space-y-4">
        {suggestions.map((p) => (
          <div key={p.id} className="flex gap-3 items-center">
            <img
              src={p.img}
              className="w-12 h-12 object-contain rounded border"
              alt=""
            />

            <div className="flex-1">
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-xs text-gray-500">
                ₹{p.price}
                <span className="line-through ml-1">₹{p.mrp}</span>
              </p>
            </div>

            <button className="text-xs text-[var(--primary)] font-semibold">
              ADD
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
