import { DetailInventory } from "./detail-inventory";

export class Inventory {
    id: number|null;
    storeId: number;
    comments: string;
    detail:any;
 
    constructor(id: number|null, storeId: number, comments: string, detail:any ) { 
        this.id = id;
        this.storeId = storeId;
        this.comments = comments;
        this.detail = detail;
    }
}
