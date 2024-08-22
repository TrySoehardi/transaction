import  Axios  from 'axios';
import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
    interface Request {
      userId: string
    }
}


export async function protectedRoute(Req: Request, Res: Response, Next: NextFunction) {
    const membershipMs = process.env.MEMBERSHIP_MS || "http://localhost";
    const token = Req.header('Authorization');
    console.log(Req.headers);
    if (!token) {
        return Res.status(401).json({ error: 'Access denied' });
    }

    try {
        const verif = await Axios.get(`${membershipMs}/api/auth`, { headers: { Authorization: token } });
        Req.userId = verif.data.data;
    } catch(err) {
        return Res.status(401).json({
            "status": 108,
            "message": "Token tidak valid atau kadaluwarsa",
            "data": null
        });
    }
    Next();
}