import {db} from "../database"
import { v1 as uuidv4 } from 'uuid';

export interface transaction {
    id?: string
    account_id?: string
    service_id?: string,
    invoice_number?: string,
    transaction_type?: string,
    total_amount?: number,
    created_at?: Date,
    updated_at?: Date,
}

export interface dataOrder {
    invoice_number: string | undefined,
    service_code: string | undefined,
    service_name: string | undefined,
    transaction_type: string | undefined,
    total_amount: number | undefined,
    created_on?: Date
}


export class TransactionModel {
    private db;
    constructor() {
        this.db = db;
    }

    public async create(transaction:transaction):Promise<transaction> {
        transaction.id = uuidv4();
        transaction.created_at = new Date();
        const data = [
            transaction.id,
            transaction.account_id,
            transaction.service_id,
            transaction.invoice_number,
            transaction.transaction_type,
            transaction.total_amount,
            transaction.created_at,
            transaction.updated_at
        ];

        const query = "INSERT INTO `transaction` (`id`,`account_id`,`service_id`,`invoice_number`,`transaction_type`,`total_amount`,`created_at`,`updated_at`) VALUES (?)";
        await this.db.getrow(query, [data]);

        const result = await this.findByAccount(transaction.account_id);
        return result;
        
    }

    public async findByAccount(account_id: string | undefined) {
        const query = "SELECT * FROM `transaction` WHERE `account_id` = ?";
        const result = await this.db.getrow(query,[account_id]);
        return result;
    }

}

