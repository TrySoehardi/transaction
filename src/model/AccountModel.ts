import {db} from "../database"
import { v1 as uuidv4 } from 'uuid';


export interface account {
    id?: string,
    user_id: string,
    account_name?: string,
    account_type?: number,
    balance: number,
    opening_date?: Date,
    created_at?: Date,
    updated_at?: Date | null
}


export class AccountModel {
    private db;
    constructor() {
        this.db = db;
    }

    public async create(account: account) {

        const query = "INSERT INTO `account` (`id`, `user_id`, `account_name`, `account_type`, `balance`, `opening_date`,`created_at`, `updated_at`) VALUES (?)";
        
        account.created_at = new Date();
        account.updated_at = null;

        const data = [
            account.id, 
            account.user_id,// id
            account.account_name,
            account.account_type,
            account.balance,
            account.opening_date,
            new Date,
            null
        ]

        const result = await db.query(query,[data]);
        return result;
    }

    public async update(account:account) {
       const query = "UPDATE account SET ? WHERE id = ?";
        const row = await this.db.getrow(query,[
            account,
            account.user_id
        ]);
    }

    public async findByIdUser(user_id: string):Promise<account> {
        const query = "SELECT * FROM `account` WHERE `user_id` = ?";
        const row = await this.db.getrow(query, [user_id]);
        return row;
    }

    public async updateBalance(account: account, type: string) {
        const query = `UPDATE account SET balance = balance ${type} ? , updated_at = NOW() WHERE user_id = ?`
        const row = await this.db.getrow(query,[
            account.balance,
            account.user_id
        ]);
        const data = await this.findByIdUser(account.user_id);
        return data; 
    }

}

