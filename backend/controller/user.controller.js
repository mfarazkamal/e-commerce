
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';


export const userProfile = async (req, res) => {
    const { id } = req.params;


    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);

    } catch (error) {
        console.log(`Error getting user profile: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}



export const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const { username, address, password } = req.body;

        if(!username || !address) { 
            return res.status(400).json({ error: "Please provide all the details" });
        }

        if(username) user.username = username;
        if(address) user.address = address;

        await User.updateOne({ _id: id }, user);

        res.status(200).json({ 
            username: user.username,
            address: user.address
         });

    } catch (error) {
        console.log(`Error updating user: ${error.message}`);
        res.status(500).json({ error: error.message });

    }
}