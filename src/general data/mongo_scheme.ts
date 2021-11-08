import mongoose from 'mongoose';

const userScheme = new mongoose.Schema({
    login: String,
    password: String,
    links: [{
        link: String,
        statistic: {
            clicked: Number
        }
    }]
});
const User = mongoose.model('User', userScheme);

export default User