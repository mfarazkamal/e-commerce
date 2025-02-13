import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET);

        res.cookie('authToken', token, {
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000
        });

        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        return null;
    }
};
