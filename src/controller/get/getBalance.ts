import { NextFunction, Request, Response } from "express"
import { Base } from "../baseController";
import { SeService } from "../../services/internal/seService";
import { AccountService } from "../../services/internal/accountService";


export class GetBalance extends Base {
    public method = "GET"
    public path = "/balance"
    private accountService: AccountService;

    constructor() {
        super();
        this.accountService = new AccountService;
    }

    public async api(Req: Request, Res: Response, Next: NextFunction) {
        const balance = await this.accountService.getBalance(Req.userId);
        this.response(Res,200,0,"Get Balance Berhasil",balance);
    }
}