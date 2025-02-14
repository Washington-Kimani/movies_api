// Importing required modules
import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';

//importing routes
import authRoutes from './routes/auth.routes.js';
import moviesRoutes from './routes/movie.routes.js';
import actorsRoutes from './routes/actor.routes.js';

// import db connection
import connectDB from "./configs/db.js";

// Load environment variables from.env file
dotenv.config();

// initialize port variable
const port = process.env.PORT || 5000;

//create an app instance
const app = express();
const server = http.createServer(app);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
// root route
app.get('/', (req, res) => {
    res.send('Welcome to Movies API');
});
// auth route
app.use('/api/auth', authRoutes);
// movies route
app.use('/api/movies', moviesRoutes);
// actor routes
app.use('/api/actors', actorsRoutes)


// connect to database
connectDB();

//start the server
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});