import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { CartItem } from "../models/cart-item.model";
import { Cart } from "../models/cart.model";
import { Product } from "../models/product.model";
import ApiService from "./api.service";
import { StorageService } from "./storage.service";

const CART_KEY = "cart";

@Injectable()
export class CartService {

    private storage: Storage;
    private subscriptionObservable: Observable<Cart>;
    private subscribers: Array<Observer<Cart>> = new Array<Observer<Cart>>();
    private products: Product[] = [];


    constructor(private storageService: StorageService, private api: ApiService) {
        this.storage = this.storageService.get();
        this.api.getAllProducts().then((res: any) => this.products = res.data);

        this.subscriptionObservable = new Observable<Cart>((observer: Observer<Cart>) => {
            this.subscribers.push(observer);
            observer.next(this.retrieve());
            return () => {
                this.subscribers = this.subscribers.filter((obs) => obs !== observer);
            };
        })
    }


    public get(): Observable<Cart> {
        return this.subscriptionObservable;
    }


    public addItem(product: Product, qty: number): void {
        const cart = this.retrieve();
        let item = cart.items.find((p) => p.product.id === product.id);
        if (item === undefined) {
            item = new CartItem();
            item.product = product;
            cart.items.push(item);
        }

        item.qty += qty;
        cart.items = cart.items.filter((cartItem:CartItem) => cartItem.qty > 0);
        
        this.calculateCart(cart);
        this.save(cart);
        this.dispatch(cart);
    }


    public removeItem(product: Product): void {
        const cart = this.retrieve();
        cart.items = cart.items.filter(p => p.product.id !== product.id);

        this.calculateCart(cart);
        this.save(cart);
        this.dispatch(cart);
    }


    public qtyMinusOne(product: Product): void {
        const cart = this.retrieve();
        cart.items.forEach(p => {
            if (p.product.id === product.id) {
                if (p.qty > 1) return --p.qty;
                else return this.removeItem(product);
            }
        });

        this.calculateCart(cart);
        this.save(cart);
        this.dispatch(cart);
    }


    public qtyPlusOne(product: Product): void {
        const cart = this.retrieve();
        cart.items.forEach(p => p.product.id === product.id ? ++p.qty : p.qty);

        this.calculateCart(cart);
        this.save(cart);
        this.dispatch(cart);
    }


    public checkout(): void {
        const cart = this.retrieve();
        if (cart.items.length == 0) return ;
        let new_items: any = [];
        cart.items.forEach((item) => {
            new_items.push({product: item.product.id, qty: item.qty});
        })
        let data = {client: cart.client, orderitems: new_items};
        this.api.sendOrder(data);
        this.empty();
    }


    public empty(): void {
        const newCart = new Cart();
        this.save(newCart);
        this.dispatch(newCart);
    }


    public isCartEmpty(): boolean {
        let cart = this.retrieve();
        return cart.items.length === 0;
    }


    private calculateCart(cart: Cart): void {
        cart.total = cart.items
                    .map((item) => {
                        let product = this.products.find((p) => p.id === item.product.id);
                        if (product) return item.qty * product.price;
                        else return 0;
                    })
                    .reduce((previous, current) => previous + current, 0);
    }


    private retrieve(): Cart {
        const cart = new Cart();
        const storedCart = this.storage.getItem(CART_KEY);
        if (storedCart) {
            cart.updateForm(JSON.parse(storedCart));
        }

        return cart;
    }


    private save(cart: Cart): void {
        this.storage.setItem(CART_KEY, JSON.stringify(cart));
    }


    private dispatch(cart: Cart): void {
        this.subscribers
            .forEach((sub) => {
                try {
                    sub.next(cart);
                } catch (e) {}
            });
    }
}