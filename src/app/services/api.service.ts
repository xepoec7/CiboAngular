import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "src/environments/environment";
import { Cart } from "../models/cart.model";

@Injectable({providedIn: 'root'})
export default class ApiService {

    private api_url: string;
    private client: any;


    constructor() {
        this.api_url = environment.apiUrl;
    }


    private init = () => {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 31000,
            headers: headers
        });

        return this.client;
    }


    public getCategories() {
        return this.init().get("/category");
    }


    public getAllProducts() {
        return this.init().get("/product");
    }


    public getProductByCategory(category_id: number) {
        return this.init().get(`/category/${category_id}`);
    }


    public sendOrder(data: any): void {
        return this.init().post('/order/', data);
    }
}