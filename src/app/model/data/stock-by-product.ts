export class StockByProduct{ 
    productId: number; 
    productName: string;
    cantPhysical: number; 

    constructor(productId: number, productName: string, cantPhysical: number ) { 
        this.productName = productName;
        this.productId = productId;
        this.cantPhysical=cantPhysical;
    }
}
