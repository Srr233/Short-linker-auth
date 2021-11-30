import mongoose, { Model } from 'mongoose';
import { User_interface, User_link_interface } from '../interfaces/interfaces';


const create_scheme = (userURL: mongoose.Connection, user_linksURL: mongoose.Connection) => {
    const connection_user = userURL;
    const connection_user_links = user_linksURL;

    const userScheme = new mongoose.Schema({
        login: String,
        password: String,
        email: String,
        isActivated: Boolean,
        activateId: String,
    });
    const User: Model<User_interface> = connection_user.model('User', userScheme);
    
    const user_links_Scheme = new mongoose.Schema({
        login: String,
        links: [
            {
                original: String,
                short: String,
                statistic: {
                    clicks: Number
                }
            }
        ]
    });
    const User_link: Model<User_link_interface> = connection_user_links.model('User_links', user_links_Scheme);

    return {
        User,
        User_link
    }
}

export default create_scheme