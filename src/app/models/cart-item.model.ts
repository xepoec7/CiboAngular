import { Product } from "./product.model";

export class CartItem {
    product: Product = new Product();
    qty: number = 0;
}