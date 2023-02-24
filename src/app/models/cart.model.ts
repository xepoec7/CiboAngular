import { CartItem } from "./cart-item.model";

export class Cart {
    public items: CartItem[] = new Array<CartItem>();
    public client: string = "online";
    public total: number = 0;


    public updateForm(src: Cart) {
        this.items = src.items;
        this.client = src.client;
        this.total = src.total;
    }
}