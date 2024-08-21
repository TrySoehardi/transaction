import { TransactionModel, dataOrder, transaction } from "../../model/transactionModel";
import { BaseService } from "../baseServie";
import { AccountService } from "./accountService";
import { SeService } from "./seService";

export class TransactionService extends BaseService {
    protected transactionModel: TransactionModel;
    protected seService: SeService;
    protected accountService: AccountService;
    constructor() {
        super();
        this.seService = new SeService;
        this.accountService = new AccountService;
        this.transactionModel = new TransactionModel;
    }

    public async order(service_code: string, user_id: string, paymentType: string):Promise<any> {

        const service = await this.seService.findByCode(service_code);
        console.log("SERVICE ",service);
        if(!service) {
            const dataFail = this.returnData(102,"Service ataus Layanan tidak ditemukan",null);
            return dataFail;
        };

        const dataOrder: dataOrder = {
            invoice_number: `INV${Date.now()}`,
            service_code: service.service_code,
            service_name: service.service_name,
            transaction_type: paymentType,
            total_amount: service.service_tariff,
            created_on: `${Date.now()}`
        }

        //~~~~~~~~~~~~~~~create transaction invoice~~~~~~~~~~~~~~~~~~~
        // calculating balance after payment
        const account = await this.accountService.payment(user_id, service.service_tariff);
        console.log(account);

        // create invoice
        const dataTransaction: transaction = {
            account_id: account.id,
            service_id: service.id,
            invoice_number: dataOrder.invoice_number,
            transaction_type: dataOrder.transaction_type,
            total_amount: service.service_tariff,
        }
        const result = await this.transactionModel.create(dataTransaction);

        console.log("RESULT INVOICE ",result);
        return dataOrder;

    }



   
}