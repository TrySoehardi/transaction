import {db} from "../database"

export interface service {
    id?: string,
    service_code?: string,
    service_name?: string,
    service_icon?: string,
    service_tariff?: number,
    created_at?: Date,
    update_at?: Date
}


export class ServiceModel {
    private db;
    constructor() {
        this.db = db;
    }

    public async getAll() {
        const query = "SELECT * FROM `service`";
        const service = await this.db.query(query);    
        return service;    
    }

    public async findByServiceCode(code: string):Promise<service> {
        console.log("code: ",code);
        const query = "SELECT * FROM `service` WHERE `service_code` = ?"
        const result = await this.db.getrow(query, [code]);
        return result;
    }

}

