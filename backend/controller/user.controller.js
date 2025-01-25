
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';


export const userProfile = async (req, res) => {
    const {id} = req.params;
    

    try {
        const user = await User.findById(id).select('-password');
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }

        res.status(200).json(user);

    } catch (error) {
        console.log(`Error getting user profile: ${error.message}`);
        res.status(500).json({error: error.message});
    }
}



export const updateUser = (req, res) =>{
    res.send("user updated")
}