import express from 'express';
import cors_options from './general data/cors_options';
import register_router from "./modules/register_route";
import login_router from './modules/login_router';
import activate_router from './modules/activate_router';
import cors from 'cors';
import mongoose from "mongoose";
import mongo_uri from './general data/mongo_uri';

const env_port = process.env.PORT || 3000;

const app = express();

const start = async () => {
    await mongoose.connect(mongo_uri);
    app.use(cors(cors_options));
    app.get('/', (_, res) => res.sendStatus(200));
    app.use('/register', register_router);
    app.use('/login', login_router);
    app.use('/verify', activate_router)
    app.listen(env_port, () => {
        console.log('started');
    });
}

start();