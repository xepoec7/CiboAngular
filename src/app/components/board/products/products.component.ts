import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "src/app/models/product.model";
import ApiService from "src/app/services/api.service";
import { CategoryService } from "../services/category.service";

@Component({
    selector: 'board-products',
    templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

    public products: Product[] = [];
    private category_id: number = 0;


    constructor(private api: ApiService, 
                private catService: CategoryService,
                private router: Router) {}


    
    ngOnInit(): void {
        this.fillProducts(1);
        this.catService.categorySource.subscribe((id) => {
            this.fillProducts(id);
        })
    }


    private fillProducts(category_id: number): void {
        this.api.getProductByCategory(category_id)
            .then((res: any) => {
                this.products = res.data;
            });
    }


    public clickProduct(product: Product): void {
        this.router.navigateByUrl("product/", {state: product});
    }
}