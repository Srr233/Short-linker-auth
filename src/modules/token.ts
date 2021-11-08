import jwt from 'jsonwebtoken';
import SECRET_KEY from '../general data/secret_key';
export default (login: string, password: string) => 
    jwt.sign({
        login,
        password
    }, SECRET_KEY, {expiresIn: "25m"});