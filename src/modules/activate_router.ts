import express, { Request, Response } from 'express';
import User from '../general data/mongo_scheme';

const router = express.Router();

const verify = async (req: Request, res: Response) => {
    const activateId= req.query.activateId?.toString();

    if (activateId) {
        const currentUser = await User.findOne({activateId});
        if (currentUser) {
            currentUser.isActivated = true;
            currentUser.save();
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(401);
}
router.post('/', verify);
router.get('/', (_, res) => res.sendStatus(200));

export default router;