import { DetailSale } from "./detail-sale";

export class Sale {
    id: number | null;
    storeId: number;   
    detail:any;

     // id_detail: number | null ,cant: number , productId: number 
    constructor(id: number | null, storeId: number, detail: any ) { 
        this.id = id; 
        this.storeId = storeId;
        this.detail = detail;
    } 
} 