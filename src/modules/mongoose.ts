import User from "../general data/mongo_scheme";

const createNewUser = async (login: string, password: string) => {
    const newUser = new User({
        login,
        password,
        links: []
    });
    newUser.save();
}
export {
    createNewUser
}