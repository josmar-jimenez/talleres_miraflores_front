import { DetailInventory } from "./detail-inventory";

export class Inventory {
    id: number|null;
    storeId: number;
    comments: string;
    detail:any;
    storeName: string;
    hasMismatch: boolean;
    constructor(id: number|null, storeId: number, comments: string, detail:any,storeName:string, hasMismatch:boolean ) { 
        this.id = id;
        this.storeId = storeId;
        this.comments = comments;
        this.detail = detail;
        this.storeName=storeName;
        this.hasMismatch=hasMismatch;
    }
}
