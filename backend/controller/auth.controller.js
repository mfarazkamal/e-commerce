import { contants } from "../lib/utils/constant.js";
import { generateToken } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

export const userRegisterAuth = async (req, res) => {
    try {
        const { username, address, email, password } = req.body;

        if (!username || !address || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Invalid Data"
            })
        }

        if (!contants.emailRegex.test(email)) {
            return res.status(400).json({ message: "Please provide a valid email address" })
        }

        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashPass,
            address,
        })

        if(!newUser) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
        
        
            const token = generateToken(newUser._id, res)
            if(!token){
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong"
                })
            }
            await newUser.save();

            res.status(201).json({
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                address: newUser.address
            })
       

    } catch (error) {
        console.log(`Error registering user: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

export const userLoginAuth = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            })
        }

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const verifyPass = await bcrypt.compare(password, userExist?.password || '');

        if (!verifyPass) {
            return res.status(400).json({
                success: false,
                message: "Email or Password is not valid"
            })
        }

        const token = generateToken(userExist._id, res)
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Something went wrong"
            })
        }

        res.status(200).json({
            _id: userExist._id,
            username: userExist.username,
            email: userExist.email,
            user_type: userExist.user_type,
            address: userExist.address
        })

    } catch (error) {
        console.log(`Error logging in user: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}