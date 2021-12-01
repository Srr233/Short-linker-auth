import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User_interface } from '../interfaces/interfaces';

function createRouter (connection: mongoose.Model<User_interface> ) {

    const router = express.Router();
    
    const verify = async (req: Request, res: Response) => {
        const activateId= req.query.activateId?.toString();
    
        if (activateId) {
            const currentUser = await connection.findOne({activateId});
            if (currentUser) {
                currentUser.isActivated = true;
                currentUser.save();
                res.send('<h1>Great! Now you can sign in!</h1>');
                return;
            }
        }
        res.sendStatus(401);
    }
    router.get('/', verify);
    router.get('/', (_, res) => res.sendStatus(200));

    return router;
}

export default createRouter;