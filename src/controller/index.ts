

// every controller must regist in here

import { GetBalance } from "./get/getBalance";
import { GetService } from "./get/getService";
import { PostAccount } from "./post/postAccount";
import { PostBalance } from "./post/postBalance";
import { PostTransaction } from "./post/postTransaction";

//~~~~~~~~~~~~~~public api controller~~~~~~~~~~~~~~~
export const controllers = [
    // new Login,
    new PostAccount,
];


//~~~~~~~~~~~~~~~private api controller~~~~~~~~~~~~~~
export const privateControllers = [
    new GetService,
    new GetBalance,
    new PostBalance,
    new PostTransaction
];


