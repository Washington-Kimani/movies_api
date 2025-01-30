import Movie from "../models/movie.model.js";
import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import Actor from "../models/actors.model.js";

dotenv.config();

//get all movies
export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get a single movie
export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(404).json({ message: "Movie not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// searches for a movie by title
export const searchMovie = async (req, res) => {
    const query = req.query.q;

    // Log the query to debug
    console.log('Search Query:', query);

    // Check if the query looks like an ObjectId
    if (mongoose.Types.ObjectId.isValid(query)) {
        return res.status(400).json({ error: 'Invalid search query (ObjectId format). Please search by title.' });
    }

    try {
        // Perform the search using the name field and a case-insensitive regex
        const movies = await Movie.find({
            name: { $regex: new RegExp(query + '.*', 'i') }
        }).exec();

        // Return the results as JSON
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while searching for movies.' });
    }
};

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// create a movie
export const createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        if (req.file) {
            const { secure_url } = await cloudinary.uploader.upload(req.file.path);
            movie.poster = secure_url;
        }
        await movie.save();
        res.status(201).json({message: "Movie created successfully", movie});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update a movie
export const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (req.file) {
            const { secure_url } = await cloudinary.uploader.upload(req.file.path);
            movie.poster = secure_url;
            await movie.save();
        }
        res.status(200).json({ message: "Movie updated successfully", movie });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete a movie
export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (movie) {
            res.status(200).json({ message: "Movie deleted successfully" });
        } else {
            res.status(404).json({ message: "Movie not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};