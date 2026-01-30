import { Products } from "@/data/product";

export class ProductService {
    static async getProductByIds(ids) {
        const products = Products.filter((p) =>
            ids.includes(p.id)
        );
        return products;
    }

    static async getProduct(value, key = 'id') {
        const product = Products.find((p) => p[key] === value);
        return product;
    }

    /* cartItems: [{ id: 12, qty: 3 }] */

    async getProductByCartItems(cartItems = []) {
        // Build product map for fast lookup
        const productMap = new Map();
        for (const product of Products) {
            productMap.set(product.id, product);
        }

        const cartProducts = [];

        for (const item of cartItems) {
            const product = productMap.get(item.id);
            if (!product) continue; // skip invalid product

            const unitPrice = product.price;
            const oldPrice = product.old_price ?? unitPrice;
            const qty = item.qty;

            cartProducts.push({
                product_id: product.id,
                product_name: product.name,
                product_long_name: product.long_name,
                product_size: product.size,
                product_image: product.image,

                unit_price: unitPrice,
                qty,

                product_amount: unitPrice * qty,
                discount_amount: (oldPrice - unitPrice) * qty,
            });
        }

        return cartProducts;
    }

}