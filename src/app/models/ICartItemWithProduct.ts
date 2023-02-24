import { CartItem } from "./cart-item.model";
import { Product } from "./product.model";

export interface ICartItemWithProduct extends CartItem {
    product: Product;
    totalCost: number;
    qty: number;
}