import { Product } from "./product";
import { propiedades_globales as prop_glo } from 'src/app/globals';


export class ProductFound {
    id: number|null;
    name: string;
    price: number;
    stores: any;
    image:string;
    constructor(product:Product) {
        this.id = product.id;
        this.name = product.name; 
        this.price = product.price;
        this.image= prop_glo.info_globals.info_component.no_image;
    }
} 