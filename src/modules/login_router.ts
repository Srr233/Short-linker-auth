import express, { Request, Response } from 'express';
import token from './token';
import {sign_in} from '../modules/mongoose';
import mongoose from 'mongoose';
import { User_interface, User_link_interface } from '../interfaces/interfaces';



function createRouter(connection_user: mongoose.Model<User_interface>, connection_user_links: mongoose.Model<User_link_interface>) {
    const router = express.Router();
    
    const login = async (req: Request, res: Response) => {
        const {login, password} = req.body;
        if (!login || !password) {
            res.sendStatus(400);
            return;
        }
        const user = await sign_in(login, password, connection_user);
        if (user && user.isActivated) {
            const user_link = await connection_user_links.findOne({login});
            if (user_link) {
                if (user_link.login === login) {
                    const links = user_link.links;
                    res.send(JSON.stringify({
                        auth_token: token(user.login, user.password),
                        links
                    }));
                    return;
                }
                res.sendStatus(401);
                return;
            }
            res.send(JSON.stringify({
                auth_token: token(user.login, user.password),
            }));
            return;
        }
        res.sendStatus(401);
    }
    router.post('/', express.json(), login);
    router.get('/', (_, res) => res.sendStatus(200));

    return router;
}

export default createRouter;