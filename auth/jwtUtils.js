import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Configure dotenv to load environment variables from .env file
dotenv.config();

// Function to generate token
const generateToken = (payload) => {
    // Ensure JWT_SECRET is available
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    try {
        // Generate token with added claims and security options
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return token;
    } catch (err) {
        console.error('Error generating token:', err);
        throw new Error('Failed to generate token');
    }
}

export default generateToken;
