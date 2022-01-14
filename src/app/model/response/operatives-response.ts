export class OperativesResponse {
    info: string[];
    code : string;
    error : string;
    token: string;

    constructor(info:string[],code : string, error : string, token: string) {
        this.info = info;
        this.code = code;
        this.error = error;
        this.token = token; 
    }
}
