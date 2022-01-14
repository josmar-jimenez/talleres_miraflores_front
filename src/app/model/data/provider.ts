export class Provider {
    id: number|null;
    statusId: number;
    statusName: string;
    name: string;
    shortName: string;
    phone: number;
    address: string; 
    email: string;
    image: string;

    constructor(id: number|null, statusId: number, statusName: string, 
        name: string, shortName: string, phone: number, address: string, email: string, image: string) {
        this.id = id;
        this.statusId = statusId;
        this.name = name; 
        this.shortName = shortName;
        this.phone = phone;
        this.address = address;
        this.email = email;
        this.image = image; 
        this.statusName=statusName;
    }
} 