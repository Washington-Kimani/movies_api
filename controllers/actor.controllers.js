import Actor from '../models/actors.model.js';
import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
import mongoose from'mongoose';

dotenv.config();

// function to get all actors
export const getAllActors = async (req, res) => {
    try{
        const actors = await Actor.find({});
        res.status(200).json(actors);
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
        console.log(err);
    }
}

//function to get actor by id
export const getActorById = async (req, res) => {
    try{
        const actor = await Actor.findById(req.params.id);
        if(actor){
            res.status(200).json(actor);
        }else{
            res.status(404).json({message:"Actor not found"});
        }
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
        console.log(err);
    }
}

export const searchActors = async (req, res) => {
    const query = req.query.q;

    // Log the query to debug
    console.log('Search Query:', query);

    // Check if the query looks like an ObjectId
    if (mongoose.Types.ObjectId.isValid(query)) {
        return res.status(400).json({ error: 'Invalid search query (ObjectId format). Please search by name or bio.' });
    }

    try {
        // Perform the search using the name field and a case-insensitive regex
        const actors = await Actor.find({
            name: { $regex: new RegExp(query + '.*', 'i') }
        }).exec();

        // Return the results as JSON
        res.status(200).json(actors[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while searching for actors.' });
    }
};



// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//function to create a new actor
export const createActor = async (req, res) => {
    try{
        const actor = new Actor(req.body);
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            actor.image = result.secure_url;
        }
        const newActor = await actor.save();
        res.status(201).json(newActor);
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
        console.log(err);
    }
}

//function to update an actor
export const updateActor = async (req, res) => {
    try{
        const actor = await Actor.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(actor){
            res.status(200).json(actor);
        }else{
            res.status(404).json({message:"Actor not found"});
        }
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
        console.log(err);
    }
}

//function to delete an actor
export const deleteActor = async (req, res) => {
    try{
        const actor = await Actor.findByIdAndDelete(req.params.id);
        if(actor){
            res.status(200).json({message:"Actor deleted successfully"});
        }else{
            res.status(404).json({message:"Actor not found"});
        }
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
        console.log(err);
    }
}
