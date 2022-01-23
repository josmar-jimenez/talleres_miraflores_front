export class SaleTable {
    storeId:number;
    productId: number;
    productName:string;
    price: number;
    cant: number;
    constructor(storeId:number,productId: number,  productName: string, price: number,cant: number) { 
        this.storeId = storeId;
        this.productId = productId;
        this.productName = productName;
        this.cant = cant;
        this.price = price;
    }
}
