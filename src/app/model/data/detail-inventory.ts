import { IDetail } from "./detail";

export interface DetailInventory extends IDetail{ 
    cantPhysical: number;
    cantSystem?: number; 
}
