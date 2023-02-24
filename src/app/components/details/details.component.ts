import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/product.model";

@Component({
    selector: 'details-details',
    template: `
            <details-description [product]="product" ></details-description>
            <details-allergies [allergies]="product.allergens"></details-allergies>
            <details-action [product]="product"></details-action>
            `,
    styles: ['.marg-top { margin-top: 24px }']
})
export class DetailsComponent implements OnInit {

    public product: Product | any;

    constructor(private location: Location) {}

    ngOnInit(): void {
        this.product = this.location.getState() as Product;
        console.log(this.product);
        
    }
}