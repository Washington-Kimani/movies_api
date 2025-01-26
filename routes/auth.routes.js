import { Router } from 'express';
const router = Router();

// import the user model
import User from '../models/user.model.js';

// import the controllers
import { loginUser, registerUser } from "../controllers/auth.controllers.js";

// login route
router.post('/login', loginUser);

// check if user exists
const checkIfUserExists = async (req, res, next) => {
    const { email } = req.body;
    try{
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).send({ message: "User already exists" });
        }else{
            next();
        }
    }catch (err){
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// register route
router.post('/register', checkIfUserExists, registerUser);

export default router;