export class StockByProduct{ 
    productId: number; 
    productName: string;
    cantPhysical: number; 
    productPrice: number; 
    constructor(productId: number, productName: string, cantPhysical: number, productPrice: number) { 
        this.productName = productName;
        this.productId = productId;
        this.cantPhysical=cantPhysical;
        this.productPrice=productPrice;
    }
}
