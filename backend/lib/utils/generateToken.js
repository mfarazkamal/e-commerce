import jwt from 'jsonwebtoken';
import { contants } from './constant.js';

export const generateToken = (email, res) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log(token);
    res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
    });
    return token;
}