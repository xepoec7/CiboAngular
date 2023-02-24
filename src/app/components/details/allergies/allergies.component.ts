import { Component, Input } from "@angular/core";

@Component({
    selector: 'details-allergies',
    templateUrl: 'allergies.component.html',
})
export class AllergiesComponent {

    @Input() allergies: string = "";
}