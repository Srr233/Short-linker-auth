import express, { Request, Response } from 'express';
import {sign_up} from '../modules/mongoose';
import token from './token';
import regexEmail from '../general data/regexEmail';
import User from '../general data/mongo_scheme';

const router = express.Router();

const register = async (req: Request, res: Response) => {
    const {login, password, email} = req.body;
    if (!login || !password || !email?.match(regexEmail)) {
        res.sendStatus(400);
        return;
    }
    const haveTheUser = await User.findOne({email});
    if (!haveTheUser) {
        const newUser = await sign_up(login, password, email);
        res.send(JSON.stringify({auth_token: token(newUser.login, newUser.password)}));
    } else {
        res.sendStatus(403);
    }
}
router.post('/', express.json(), register);
router.get('/', (_, res) => res.sendStatus(200));

export default router;