export class Tag {
    id: number| null; 
    name: string;  
    typeId: number| null;
    fatherId: number| null; 

    constructor(id: number| null, name: string , typeId: number| null, fatherTypeId: number| null) {
        this.id = id; 
        this.name = name;  
        this.typeId = typeId;  
        this.fatherId = fatherTypeId;  
    }
} 