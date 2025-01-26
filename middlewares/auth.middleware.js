// This middleware checks if the user is authenticated or not. If not, it redirects to the login page.
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

export const isAuthenticated = (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}