import { TransactionModel, dataOrder, transaction } from '../../model/transactionModel';
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
            return this.returnData(102,"Service ataus Layanan tidak ditemukan",null);
        };

        //~~~~~~~~~~~~~~~create transaction invoice~~~~~~~~~~~~~~~~~~~
        // before order check balance
        const balance = await this.accountService.getBalance(user_id);
        if((balance - service.service_tariff) < 0) {
            return this.returnData(108,"Saldo Tidak Cukup",null);
        }
        // calculating balance after payment
        const account = await this.accountService.payment(user_id, service.service_tariff);
        console.log(account);

        // create invoice
        const dataTransaction: transaction = {
            account_id: account.id,
            service_id: service.id,
            invoice_number: `INV${Date.now()}`,
            transaction_type: paymentType,
            total_amount: service.service_tariff,
        }
        const transaction = await this.transactionModel.create(dataTransaction);

        const dataOrder: dataOrder = {
            invoice_number: transaction.invoice_number,
            service_code: service.service_code,
            service_name: service.service_name,
            transaction_type: paymentType,
            total_amount: service.service_tariff,
            created_on: transaction.created_at
        }

        console.log("RESULT INVOICE ",transaction);
        return dataOrder;

    }



   
}