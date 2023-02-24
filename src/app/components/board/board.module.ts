import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BoardComponent } from "./board.component";
import { CategoryComponent } from "./category/category.component";
import { ProductsComponent } from "./products/products.component";
import { CategoryService } from "./services/category.service";

@NgModule({
    declarations: [
        BoardComponent,
        CategoryComponent,
        ProductsComponent,
    ],
    providers: [CategoryService],
    bootstrap: [BoardComponent],
    imports: [CommonModule],
    exports: [BoardComponent]
})
export class BoardModule {}