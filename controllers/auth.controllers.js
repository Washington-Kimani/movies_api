import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
//importing function for token generation
import generateToken from "../auth/jwtUtils.js";

//registration function
export const registerUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    // Input validation
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try{
        const hash = await bcrypt.hash(password, 10);
        const user = new User({
            firstname,
            lastname,
            email,
            password: hash
        });
        await user.save();
        res.status(201).json({ message: 'User created successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//login function
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = generateToken({id: user._id, email: user.email});
        res.status(200).json({ message: 'User logged in successfully', token, user: { id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email } });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}