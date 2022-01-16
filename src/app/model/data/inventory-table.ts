export class InventoryTable {
    productId: number;
    productName:string;
    cant: number;
    constructor(productId: number,  productName: string, cant: number) { 
        this.productId = productId;
        this.productName = productName;
        this.cant = cant;
    }
}
