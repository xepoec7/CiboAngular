import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Cart } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
    selector: 'cart-total',
    templateUrl: './total.component.html'
})
export class TotalComponent {

    @Input() cart: Observable<Cart> = new Observable<Cart>();

    constructor(private cartService: CartService) {}

    public clickCheckout(): void {
        this.cartService.checkout();
    }
}