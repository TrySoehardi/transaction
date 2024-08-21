import { NextFunction, Request, Response } from "express"
import { Base } from "../baseController";
import { SeService } from "../../services/internal/seService";


export class GetService extends Base {
    public method = "GET"
    public path = "/service"
    private seService: SeService;

    constructor() {
        super();
        this.seService = new SeService;
    }

    public async api(Req: Request, Res: Response, Next: NextFunction) {
        const result = await this.seService.getAll();
        this.response(Res,200,0,"Sukses",result);
    }
}