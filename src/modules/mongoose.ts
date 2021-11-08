import User from "../general data/mongo_scheme";
import bcryptjs from 'bcryptjs';

const sign_up = async (login: string, password: string) => {
    const passHash = await bcryptjs.hash(password, 10);
    const newUser = new User({
        login,
        password: passHash,
        links: []
    });
    await newUser.save();
    return newUser;
}

const sign_in = async (login: string, password: string) => {
    const user = await User.findOne({ login });
    if (!user) return false
    const passHash = await bcryptjs.compare(password, user.password);
    if (!passHash) return false;
    return user;
}
export {
    sign_up,
    sign_in
}