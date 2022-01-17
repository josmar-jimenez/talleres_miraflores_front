export class DetailInventory{ 
    productId: number; 
    cantPhysical: number;
    cantSystem?: number; 

    constructor(productId: number, cantPhysical: number, cantSystem: number ) { 
        this.cantSystem = cantSystem;
        this.productId = productId;
        this.cantPhysical=cantPhysical;
    }
}
