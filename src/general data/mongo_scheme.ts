import mongoose from 'mongoose';

const userScheme = new mongoose.Schema({
    login: String,
    password: String,
    email: String,
    isActivated: Boolean,
    activatedId: String,
    links: [{
        link: String,
        statistic: {
            clicked: Number
        }
    }]
});
const User = mongoose.model('User', userScheme);

export default User