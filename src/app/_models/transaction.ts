import { User } from '../_models/index';

export class Transaction {
    datetime: number;
    to: User;
    from: User;
    amount: number;
    type: string;
}