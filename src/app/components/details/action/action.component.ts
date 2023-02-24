import { Location } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";

@Component({
    selector: 'details-action',
    templateUrl: './action.component.html',
    styles: ['.marg-right {margin-right: 5px}']
})
export class ActionComponent implements OnInit {

    @Input() product: Product = new Product();
    public qty: number = 1;


    constructor (private location: Location, private cartService: CartService) {}


    ngOnInit(): void {
        this.product = this.location.getState() as Product;
    }


    clickMinus(): void { this.qty > 1 ? --this.qty : this.qty }
    clickPlus(): void { ++this.qty }
    clickAddToCart(): void { this.cartService.addItem(this.product, this.qty) }
}