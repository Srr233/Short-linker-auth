import express, { Request, Response } from 'express';
import token from './token';
import {sign_in} from '../modules/mongoose';


const router = express.Router();

const login = async (req: Request, res: Response) => {
    const {login, password} = req.body;
    if (!login || !password) {
        res.sendStatus(400);
        return;
    }
    const user = await sign_in(login, password);
    if (user && user.isActivated) {
        res.send(JSON.stringify({
                auth_token: token(user.login, user.password)
            }));
        return;
    }
    res.sendStatus(401);
}
router.post('/', express.json(), login);
router.get('/', (_, res) => res.sendStatus(200));

export default router;