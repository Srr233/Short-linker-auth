import bcryptjs from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';
import { sendMessageToEmail } from './mailjet';
import mongoose from "mongoose";
import { User_interface } from '../interfaces/interfaces';

const link = 'https://short-linker-auth.herokuapp.com'
const sign_up = async (login: string, password: string, email: string, connection_user: mongoose.Model<User_interface>) => {
    const passHash = await bcryptjs.hash(password, 10);
    const activateId = uuidV4();
    const newUser = new connection_user({
        login,
        email,
        password: passHash,
        isActivated: false,
        activateId,
    });
    await newUser.save();
    sendMessageToEmail(email, {
        Subject: 'Activate Share-linker link!',
        TextPart: 'Click the link and activate your account!',
        HTMLPart: `<h3>Activate the link! Be our participant!: </h3><a>${link}/verify?activateId=${activateId}</a>`,
        CustomID: activateId
    })
    return newUser;
}

const sign_in = async (login: string, password: string, connection_user: mongoose.Model<User_interface>) => {
    const user = await connection_user.findOne({ login });
    if (!user) return false
    if (!user.isActivated) return false;
    const passHash = await bcryptjs.compare(password, user.password);
    if (!passHash) return false;
    return user;
}
export {
    sign_up,
    sign_in
}