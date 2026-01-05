// suggest related product, like cart has winter, then show all winter product

import { Products } from "@/data/product";
import { NextResponse } from "next/server";
export async function POST(req) {
  const { ids } = await req.json();
  const products = Products.filter((p) =>
    !ids.includes(p.id)
  );
  return NextResponse.json(products);
}
