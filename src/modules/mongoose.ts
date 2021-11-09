import User from "../general data/mongo_scheme";
import bcryptjs from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';
import { sendMessageToEmail } from './mailjet';

const sign_up = async (login: string, password: string, email: string) => {
    const passHash = await bcryptjs.hash(password, 10);
    const activateId = uuidV4();
    const newUser = new User({
        login,
        email,
        password: passHash,
        isActivated: false,
        activateId,
        links: []
    });
    await newUser.save();
    sendMessageToEmail(email, {
        Subject: 'Activate Share-linker link!',
        TextPart: 'Click the link and activate your account!',
        HTMLPart: `<h3>Activate the link! Be our participant!: </h3><a>http://localhost:3000/verify?activateId="${activateId}"</a>`,
        CustomID: activateId
    })
    return newUser;
}

const sign_in = async (login: string, password: string) => {
    const user = await User.findOne({ login });
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