import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AllergiesComponent } from "./allergies/allergies.component";
import { DescriptionComponent } from "./description/description.component";
import { DetailsComponent } from "./details.component";
import { ActionComponent } from './action/action.component';

@NgModule({
    declarations: [
        DetailsComponent,
        DescriptionComponent,
        AllergiesComponent,
        ActionComponent,
    ],
    bootstrap: [DetailsComponent],
    imports: [CommonModule],
    exports: [DetailsComponent]
})
export class DetailsModule {}