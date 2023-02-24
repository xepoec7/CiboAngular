import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CartComponent } from "./cart.component";
import { ItemsComponent } from "./items/items.component";
import { PromoComponent } from "./promo/promo.container";
import { TotalComponent } from "./total/total.component";

@NgModule({
    declarations: [
        CartComponent,
        ItemsComponent,
        PromoComponent,
        TotalComponent
    ],
    bootstrap: [CartComponent],
    imports: [CommonModule],
    exports: [CartComponent]
})
export class CartModule {}