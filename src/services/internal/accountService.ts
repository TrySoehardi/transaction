// import { UserModel, user } from "../../model/ServiceModel";
import { v1 as uuidv4 } from 'uuid';
import { BaseService } from "../baseServie";
import { AccountModel, account } from '../../model/AccountModel';

export class AccountService extends BaseService {
    private accountModel: AccountModel;
    private uuid: any;
    constructor() {
        super()
        this.accountModel = new AccountModel;
        this.uuid = uuidv4
    }

    public async createAccount(user_id: string) {
        const data: account = {
            user_id: user_id,
            id : uuidv4(),
            account_name : process.env.ACCOUNT_NAME_1 || "banana",
            account_type : 1,
            balance : 0,
            opening_date : new Date(),
        }

        const result = await this.accountModel.create(data);
        return result;
    }

    public async getBalance(user_id: string) {
        const result = await this.accountModel.findByIdUser(user_id);
        return result.balance;
    }

    public async topUp(user_id: string, amount: number) {
        const account: account = {
            user_id: user_id,
            balance: amount
        }

        const result = await this.accountModel.updateBalance(account,"+");
        return result;
    }

    public async payment(user_id: string, amount: number) {
        const account: account = {
            user_id: user_id,
            balance: amount
        }

        const result = await this.accountModel.updateBalance(account,"-");
        return result;
    }

   
}