import { ServiceModel } from "../../model/ServiceModel";
import { BaseService } from "../baseServie";

export class SeService extends BaseService {
    protected serviceModel:ServiceModel;
    constructor() {
        super()
        this.serviceModel = new ServiceModel;
    }

    public async getAll() {
        const service = await this.serviceModel.getAll();
        return service;
    }

    public async findByCode(code: string) {
       
        const result = await this.serviceModel.findByServiceCode(code);
        return result;
    }



   
}