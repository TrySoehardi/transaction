import { NextFunction, Request, Response } from "express"
import { Base } from "../baseController";
import Joi from "joi";
import { TransactionService } from "../../services/internal/transactionService";


export class PostTransaction extends Base {
    public method = "POST"
    public path = "/transaction"
    private transactionService: TransactionService;

    constructor() {
        super();
        this.transactionService = new TransactionService;
    }

    public async api(Req: Request, Res: Response, Next: NextFunction) {
        const bodyFormat = Joi.object({
            service_code : Joi.string().required(),
        });
        const validate = bodyFormat.validate(Req.body).error?.details
        
        if(validate) {
            this.response(Res,400,102,"Service ataus Layanan tidak ditemukan",null);
        }

        const result = await this.transactionService.order(Req.body.service_code, Req.userId, "ewallet");
        // console.log(result);
        console.log("FROM RESULT ",result);
        if(result.code == 102) {
            this.response(Res,400,result.code,result.message,null);
        } else {
            this.response(Res,200,0,"Transaksi berhasil",result);
        }
        
    }
}