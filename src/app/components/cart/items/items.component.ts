import { Component, Input } from "@angular/core";
import { ICartItemWithProduct } from "src/app/models/ICartItemWithProduct";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";

@Component({
    selector: 'cart-items',
    templateUrl: './items.component.html',
    styles: ['.marg-right { margin-right: 5px}; .marg-top { margin-top: 5px}']
})
export class ItemsComponent {
    
    @Input() items: ICartItemWithProduct[] = [];

    constructor (private cartService: CartService) {}

    public clickRemoveItem(product: Product): void {
        this.cartService.removeItem(product);
    }

    public clickMinusQty(product: Product): void {
        this.cartService.qtyMinusOne(product);
    }

    public clickPlusQty(product: Product): void {
        this.cartService.qtyPlusOne(product);
    }
}