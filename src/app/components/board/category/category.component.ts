import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Category } from "src/app/models/category.model";
import ApiService from "src/app/services/api.service";
import { CategoryService } from "../services/category.service";

@Component({
    selector: 'board-category',
    templateUrl: './category.component.html',
    styleUrls: ['category.component.css',]
})
export class CategoryComponent implements OnInit {

    private category_id: number = 1;
    private subscription?: Subscription;

    public categories: Category[] = [];


    constructor(private api: ApiService, private catService: CategoryService) {}

    ngOnInit(): void {
        this.api.getCategories()
            .then((res: any) => {
                this.categories = res.data;
                this.category_id = res.data[0]['id'];
            });
        this.catService.changeCategory(this.category_id);
    }


    clickNav(nav: HTMLElement, id: number): void {
        document.querySelector('.active')?.classList.remove('active');
        nav.classList.add('active');
        this.catService.changeCategory(id);
    }
}