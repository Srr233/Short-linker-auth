import express, { Request, Response } from 'express';
import SECRET_KEY from '../general data/secret_key';
import {sign_up} from '../modules/mongoose';
import token from './token';


const router = express.Router();

const register = async (req: Request, res: Response) => {
    const {login, password} = req.body;
    if (!login || !password) {
        res.sendStatus(400);
        return;
    }
    const newUser = await sign_up(login, password);
    res.send(JSON.stringify({auth_token: token(newUser.login, newUser.password)}));
}
router.post('/', express.json(), register);
router.get('/', (_, res) => res.sendStatus(200));

export default router;