import { Component, Input, OnInit } from "@angular/core";
import { Product } from "src/app/models/product.model";

@Component({
    selector: 'details-description',
    templateUrl: './description.component.html'
})
export class DescriptionComponent implements OnInit{
    ngOnInit(): void {
    }

    @Input() public product: Product = new Product;
}