export class Product {
    id: number|null;
    statusId: number;
    statusName: string;
    name: string;
    shortName: string;
    barcode: string; 
    price: number;
    cost: number;
    image: string;

    constructor(id: number|null, statusId: number, statusName: string,
        name: string, shortName: string, barcode: string,  price: number, cost: number, 
        image: string) {
        this.id = id;
        this.statusId = statusId;
        this.name = name; 
        this.shortName = shortName;
        this.barcode = barcode;
        this.price = price;
        this.cost = cost;
        this.image = image; 
        this.statusName=statusName;
    }
} 