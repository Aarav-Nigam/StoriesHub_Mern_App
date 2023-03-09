import UserModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User Doesn't Exist" })
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" })
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_Secret, { expiresIn: '10h' })
        var userdata={ ...existingUser._doc,token: token }
        delete userdata.password
        res.status(200).json(userdata);
    } catch (err) {
        res.status(500).json({ message: `Something went Wrong ,Error!! ${err.message}` });
    }
}
export const signup = async (req, res) => {
    const { email, password, firstName, lastName, confirmPass } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return res.status(404).json({ message: "User already Exist" })
        if (password != confirmPass) return res.status(400).json({ message: "Passwords don't match" })
        const hashedPass = await bcrypt.hash(password, 12);
        const result = await UserModel.create({ email, password: hashedPass, firstName, lastName })
        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_Secret, { expiresIn: '10h' })
        var userdata={ ...result._doc,token: token }
        delete userdata.password
        res.status(200).json(userdata);
    } catch (err) {
        res.status(500).json({ message: `Something went Wrong ,Error!! ${err.message}` });
    }
}
export const exists=async(req,res)=>{
    const id=req.params.id;
    try {
        const existingUser = await UserModel.findOne({ email:id});
        if(existingUser) res.status(200).json({exists:true})
        else res.status(200).json({exists:false})
    } catch (err) {
        res.status(500).json({ message: `Something went Wrong ,Error!! ${err.message}` });
    }
}