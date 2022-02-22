export class Product {
    id: number|null;
    statusId: number;
    statusName: string;
    name: string;
    shortName: string;
    barcode: string; 
    price: number;
    cost: number;
    tax: number;
    code: string;
    color: string;
    manufacturer: string;
    image: string;

    constructor(id: number|null, statusId: number, statusName: string,
        name: string, shortName: string, barcode: string,  price: number, cost: number, 
        tax: number, code: string, color: string, manufacturer: string, image: string) {
        this.id = id;
        this.statusId = statusId;
        this.name = name; 
        this.shortName = shortName;
        this.barcode = barcode;
        this.price = price;
        this.cost = cost;
        this.image = image; 
        this.statusName=statusName;
        this.color=color;
        this.code=code;
        this.manufacturer=manufacturer
        this.tax=tax
    }
} 