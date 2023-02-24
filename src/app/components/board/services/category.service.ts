import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class CategoryService {

    categorySource: EventEmitter<number> = new EventEmitter();


    public getCategory(): number {
        return Number(this.categorySource);
    }


    public changeCategory(category_id: number): void {
        this.categorySource.next(category_id);
    }
}