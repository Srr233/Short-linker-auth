import express, { Request, Response } from 'express';
import SECRET_KEY from '../general data/secret_key';
import jwt from 'jsonwebtoken';
import {createNewUser} from '../modules/mongoose';

const router = express.Router();

const register = (req: Request, res: Response) => {
    const {login, password} = req.body;
    let newAuth_token = null;
    createNewUser('ser', 'ser');
    // if (user?.password === password) {
    //     newAuth_token = jwt.sign({
    //         login,
    //         password
    //     }, SECRET_KEY, {expiresIn: "25m"});
    //     res.send(JSON.stringify({auth_token: newAuth_token}));
    //     return;
    // }
    // res.sendStatus(403);
    newAuth_token = jwt.sign({
        login,
        password
    }, SECRET_KEY, {expiresIn: "25m"});
    res.send(JSON.stringify({auth_token: newAuth_token}));
}
router.post('/', express.json(), register);
router.get('/', (_, res) => res.sendStatus(200));

export default router;