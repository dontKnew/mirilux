import { Products } from "@/data/product";

export class ProductService {
    static async getProductByIds(ids){
        const products = Products.filter((p) =>
            ids.includes(p.id)
        );
        return products;
    }
}