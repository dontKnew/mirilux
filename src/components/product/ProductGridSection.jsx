"use client";

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import Container from "../layout/Container";
import ProductFilterBar from "./ProductFilterBar";
import { Products } from "@/data/product";

export default function ProductGridSection({ products = Products }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // SEARCH
    if (search) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // SORT
    switch (sort) {
      case "oldest":
        list.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case "popular":
        list.sort((a, b) => b.reviews - a.reviews);
        break;
      case "price_low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        list.sort((a, b) => b.price - a.price);
        break;
      default: // newest
        list.sort((a, b) => b.createdAt - a.createdAt);
    }

    return list;
  }, [products, search, sort]);

  return (
    <Container py={5}>
      <ProductFilterBar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        totalResults={filteredProducts.length}
      />

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
}
