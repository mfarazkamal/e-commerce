import jwt from 'jsonwebtoken';
import { contants } from './constant.js';

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: contants.tokenExpiryTime
    });
    return token;
}