import express from 'express';
import cors_options from './general data/cors_options';
import register_router from "./modules/register_route";
import login_router from './modules/login_router';
import cors from 'cors';

const env_port = process.env.PORT || 3000;

const app = express();

app.use(cors(cors_options));
app.get('/', (_, res) => res.sendStatus(200));
app.use('/register', register_router);
app.use('/login', login_router);
app.listen(env_port, () => {
    console.log('started');
});

