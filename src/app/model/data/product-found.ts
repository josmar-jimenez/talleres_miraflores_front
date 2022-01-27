import { Product } from "./product";
import { Store } from "./store";

export class ProductFound {
    id: number|null;
    name: string;
    price: number;
    stores: any;

    constructor(product:Product) {
        this.id = product.id;
        this.name = product.name; 
        this.price = product.price;
    }
} 