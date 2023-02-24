import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Cart } from "src/app/models/cart.model";
import { ICartItemWithProduct } from "src/app/models/ICartItemWithProduct";
import { Product } from "src/app/models/product.model";
import ApiService from "src/app/services/api.service";
import { CartService } from "src/app/services/cart.service";

@Component({
    selector: 'cart-cart',
    template: `
                <cart-items [items]="cartItems"></cart-items>
                <cart-promo></cart-promo>
                <cart-total [cart]="cart"></cart-total>
            `
})
export class CartComponent implements OnInit, OnDestroy {

    public cart: Observable<Cart> = new Observable<Cart>();
    public cartItems: ICartItemWithProduct[] = [];

    private products: Product[] = [];
    private cartSub: Subscription = new Subscription;


    
    constructor (private cartService: CartService, private api: ApiService) {}

    ngOnInit(): void {
        this.cart = this.cartService.get();
        this.cartSub = this.cart.subscribe((cart) => {
            this.api.getAllProducts()
                .then((res: any) => {
                    this.products = res.data;
                    this.cartItems = cart.items
                        .map((item) => {
                            const product = this.products.find((p) => p.id === item.product.id);
                            return {
                                ...item,
                                totalCost: product?.price ? product.price * item.qty : 0
                            };
                        });
                });
        });
    }

    ngOnDestroy(): void {
        if (this.cartSub) this.cartSub.unsubscribe();
    }
}