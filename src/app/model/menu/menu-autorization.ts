export class MenuAutorization {
    operative_name : string;
    symbolClass : string;
    action_name: string[];

    constructor(operative_name: string,symbolClass:string, action_name: string[]) {
        this.operative_name = operative_name;
        this.action_name = action_name;
        this.symbolClass = symbolClass;
    }
}
