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
    deleteMovie
} from '../controllers/movie.controllers.js';

// Middleware to check if user is authenticated
import { isAuthenticated } from '../middlewares/auth.middleware.js';

// Applying middleware to routes
router.use(isAuthenticated);

// Routes
router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', upload.single('poster'), createMovie);
router.put('/:id', upload.single('poster'), updateMovie);
router.delete('/:id', deleteMovie);


export default router;