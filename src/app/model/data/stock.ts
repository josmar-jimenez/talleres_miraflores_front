export class Stock {
    id: number | null;
    statusId: number;
    statusName: string;
    storeId: number;  
    productId: number;  
    stock: number; 
    productName: string;
    storeName: string;

    constructor(id: number| null, statusId: number, statusName: string, storeId: number, productId: number, 
        stock: number, producName:string, storeName:string) {
        this.id = id;
        this.statusId = statusId;
        this.storeId = storeId; 
        this.productId = productId;
        this.stock = stock; 
        this.productName=producName;
        this.storeName=storeName;
        this.statusName=statusName;
    }
} 