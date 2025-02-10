import { contants, matchRoute } from "../lib/utils/constant.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// export const protectRoute = async (req, res, next) => {
//     try {
//         const token = req.cookies.jwt;

//         if (!token && !contants.nonAuthPaths.includes(req.path)) {
//             return res.status(401).json({ error: "Unauthorized Access" });
//         }

//         const decode = jwt.verify(token, process.env.JWT_SECRET)

//         if (!decode) {
//             return res.status(401).json({ error: "Invalid Token" });
//         }

//         const user = await User.findById(decode.userId).select('-password');

//         if (!user) {
//             return res.status(401).json({ error: "Unauthorized User" });
//         }

//         req.user = user;
//         next();

//     } catch (error) {
//         console.log(`Error in Protect Route: ${error.message}`);
//         return res.status(501).json({ error: "Internal Server Error" });
//     }
// }

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.jwt;
    console.log('response', res.cookies);
    console.log('token', token);
    const currentPath = req.path;
    console.log('Path', req.path);

    if (!token) {
        const matchingRoute = contants.nonAuthPaths.find(route => matchRoute(route, currentPath));
        console.log('matchingRoute', matchingRoute);

        if (matchingRoute) {
            next();
            return;
        } else {
            return res.status(401).json({ error: "Invalid URL" });
        }
    } else {
        const userId = jwt.verify(token, process.env.JWT_SECRET).userId;
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
            }

            if (user.user_type === 'user') {
                console.log('currentPath', currentPath);

                const matchingRoute = contants.userPaths.find(route => matchRoute(route, currentPath));
                console.log('matchingRoute', matchingRoute);

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
    }
}