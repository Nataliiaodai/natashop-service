import {Category} from "./category.model";

export class Product {
    _id: number;
    name: string;
    price: number;
    currency: string;
    categories: number[];

    constructor(_id: number = 0,
                name: string = '',
                price: number = 0,
                categories: number [] = [],
                currency: string = '') {
        this._id = _id;
        this.name = name;
        this.price = price;
        this.categories = categories;
        this.currency = currency;
    }

    getDetailsLabel(): string {
        // return `Product name: ${this.name} price: ${this.price}, ID: ${this.id}, categories: ${this.categories[0]}, ${this.categories[1]}`;
         return `Product name: ${this.name} price: ${this.price}, ID: ${this._id}, categories: ${this.categories}`;

    }

}
