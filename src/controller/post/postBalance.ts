import { NextFunction, Request, Response } from "express"
import { Base } from "../baseController";
import { SeService } from "../../services/internal/seService";
import { AccountService } from "../../services/internal/accountService";
import { account } from "../../model/AccountModel";
import Joi from "joi";


export class PostBalance extends Base {
    public method = "POST"
    public path = "/topup"
    private accountService: AccountService;

    constructor() {
        super();
        this.accountService = new AccountService;
    }

    public async api(Req: Request, Res: Response, Next: NextFunction) {
        const bodyFormat = Joi.object({
            top_up_amount : Joi.number().required(),

        });
        const validate = bodyFormat.validate(Req.body).error?.details
        const amount = Req.body.top_up_amount;
        if(validate || amount < 0) {
            this.response(Res,400,102,"Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",null);
        }
        
        // update balance
        const result = await this.accountService.topUp(Req.userId, amount);
        this.response(Res,200,0,"Top Up Balance berhasil",{
            balance: result.balance
        });
    }
}