export class User {
    id: Number | null
    storeId: Number;
    statusId: Number;
    statusName: string;
    roleId: Number;
    nick: string;
    name: string;
    cellphone: string;
    address: string;
    password: string;
    email: string;
    emergencyPhone: string;
    emergencyContact: string; 

    constructor(
        id: Number | null,
        storeId: Number, statusId: Number, statusName:string,
        roleId: Number, password: string, nick: string, name: string,
        cellphone: string, address: string,
        email: string, emergencyPhone: string, emergencyContact: string
    ) {
        this.storeId = storeId;
        this.statusId = statusId;
        this.statusName=statusName;
        this.roleId = roleId;
        this.nick = nick;
        this.name = name;
        this.cellphone = cellphone;
        this.address = address;
        this.email = email;
        this.password = password;
        this.emergencyPhone = emergencyPhone;
        this.emergencyContact = emergencyContact;
        this.id = id;
    }
}

