import { contants, matchRoute } from "../lib/utils/constant.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.authToken;
    console.log('token', token);
    const currentPath = req.path;
    console.log('Path', req.path);

    const matchingRoute = contants.nonAuthPaths.find(route => matchRoute(route, currentPath));
    console.log('NonAuthRoute', matchingRoute);

    if (matchingRoute) {
        next();
        return;
    }

    if (token) {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decode.userId;
        console.log('userId', userId);

        if (userId) {

            const user = await User.findById(userId).select('-password');
            console.log('user', user);

            if (!user) {
                return res.status(401).json({ error: "Unauthorized User" });
            }

            if (user.user_type === 'admin') {
                req.user = user;
                next();
                return;
            }

            if (user.user_type === 'user') {
                console.log('user1', user);
                console.log('currentPath', currentPath);

                const matchingRoute = contants.userPaths.find(route => matchRoute(route, currentPath));
                console.log('matchingRoute2', matchingRoute);

                if (matchingRoute) {
                    req.user = user;
                    next();
                    return;
                } else {
                    return res.status(401).json({ error: "Unauthorized Access" });
                }
            }
        } else {
            return res.status(401).json({ error: "Invalid Token" });
        }
    } else{
        return res.status(401).json({ error: "Unauthorized Access" });
    }
}