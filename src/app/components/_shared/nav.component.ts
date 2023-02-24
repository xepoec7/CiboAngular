import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { CartItem } from "src/app/models/cart-item.model";
import { Cart } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
    selector: '<shared-nav></shared-nav>',
    template: `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a href="/" class="navbar-brand text-warning">Cibo Colorato</a>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a #cartLink href="cart/" class="nav-link cart-link">
                            <i class="material-icons">shopping_cart</i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    `
})
export class HeaderComponent implements AfterViewInit, OnDestroy {

    @ViewChild('cartLink') a: ElementRef | undefined;
    public cart: Observable<Cart> = new Observable<Cart>();
    public isEmpty: boolean = true;

    private cartSub: Subscription = new Subscription;

    constructor(private cartService: CartService) {}


    ngAfterViewInit(): void {
        this.cart = this.cartService.get();
        this.cartSub = this.cart.subscribe((cart) => this.cartService.isCartEmpty() ? this.unHighlightCart() : this.highlightCart())
    }


    ngOnDestroy(): void {
        if (this.cartSub) this.cartSub.unsubscribe();
    }

    public highlightCart(): void {
        this.a?.nativeElement.classList.add('text-warning');
    }

    public  unHighlightCart(): void {
        this.a?.nativeElement.classList.remove('text-warning');
    }
}