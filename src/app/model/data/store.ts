export class Store {
    id: number| null;
    statusId: number;
    statusName: string;
    name: string;
    phone: string;
    address: string;
    email: string;
    image: string;

    constructor(id: number| null, statusId: number, statusName: string,
        name: string, phone: string, address: string, email: string,image: string) {
        this.id = id;
        this.statusId = statusId;
        this.phone = phone;
        this.name = name;
        this.address = address;
        this.email = email;
        this.image = image;
        this.statusName=statusName;
    }
}

