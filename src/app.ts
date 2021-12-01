import express from 'express';
import cors_options from './general data/cors_options';
import register_router from "./modules/register_route";
import login_router from './modules/login_router';
import activate_router from './modules/activate_router';
import cors from 'cors';
import mongoose from 'mongoose';
import {userURL, user_linksURL} from './general data/mongo_uri';
import create_schemes from './general data/mongo_scheme';

const env_port = process.env.PORT || 3000;

const app = express();

const start = async () => {
    const connection_user = await mongoose.createConnection(userURL);
    const connection_user_links = await mongoose.createConnection(user_linksURL);
    const schemes = create_schemes(connection_user, connection_user_links);

    app.use(cors(cors_options));
    app.get('/', (_, res) => res.sendStatus(200));
    app.use('/register', register_router(schemes.User));
    app.use('/login', login_router(schemes.User, schemes.User_link));
    app.use('/verify', activate_router(schemes.User));
    app.listen(env_port, () => {
        console.log('started');
    });
}

start();