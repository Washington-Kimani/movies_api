// import mongoose for db connection
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    release_year: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    genre: {
        type: [String],
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    actors: {
        type: [String],
        required: true,
    },
    poster: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true });


movieSchema.index({ name: 'text', description: 'text' });

const Movie = mongoose.model('movie', movieSchema);

export default Movie;