import { Router } from 'express';
import multer from 'multer';


const router = Router();

// Multer middleware for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Importing controllers
import {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie, searchMovie
} from '../controllers/movie.controllers.js';

// Middleware to check if user is authenticated
import { isAuthenticated } from '../middlewares/auth.middleware.js';

// Applying middleware to routes
router.use(isAuthenticated);

// Routes
// route to get all movies
router.get('/', getAllMovies);
// route to get movie by id
router.get('/:id', getMovieById);
// route to search movies by title
router.post('/search', searchMovie);
// route to create a movie
router.post('/', upload.single('poster'), createMovie);
// route to update a movie
router.put('/:id', upload.single('poster'), updateMovie);
// route to delete a movie
router.delete('/:id', deleteMovie);


export default router;