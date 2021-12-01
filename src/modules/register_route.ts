import express, { Request, Response } from 'express';
import {sign_up} from '../modules/mongoose';
import token from './token';
import regexEmail from '../general data/regexEmail';
import mongoose from 'mongoose';
import { User_interface } from '../interfaces/interfaces';


function createRouter (connection: mongoose.Model<User_interface>) {
    const router = express.Router();
    
    const register = async (req: Request, res: Response) => {
        const {login, password, email} = req.body;
        if (!login || !password || !email?.match(regexEmail)) {
            res.sendStatus(400);
            return;
        }
        const haveTheUser = await connection.findOne({email});
        if (!haveTheUser) {
            const newUser = await sign_up(login, password, email, connection);
            res.send(JSON.stringify({auth_token: token(newUser.login, newUser.password)}));
        } else {
            res.sendStatus(403);
        }
    }
    router.post('/', express.json(), register);
    router.get('/', (_, res) => res.sendStatus(200));

    return router;
}

export default createRouter