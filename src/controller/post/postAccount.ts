import { NextFunction, Request, Response } from "express"
import { Base } from "../baseController";
import { SeService } from "../../services/internal/seService";
import { AccountService } from "../../services/internal/accountService";
import { account } from "../../model/AccountModel";
import Joi from "joi";


export class PostAccount extends Base {
    public method = "POST"
    public path = "/account"
    private accountService: AccountService;

    constructor() {
        super();
        this.accountService = new AccountService;
    }

    public async api(Req: Request, Res: Response, Next: NextFunction) {
        const bodyFormat = Joi.object({
            user_id : Joi.string().required(),

        });
        const validate = bodyFormat.validate(Req.body).error?.details
        if (validate) {
            this.response(Res,400,102,validate[0].message,null);
        } else {
            const result = await this.accountService.createAccount(Req.body.user_id);
            this.response(Res,200,0,"Sukses", result);
        }
    }
}