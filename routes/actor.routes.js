import {Router} from 'express';

// import authentication middleware
import {isAuthenticated} from '../middlewares/auth.middleware.js';

const router = Router();


// import controllers
import {
    getAllActors,
    getActorById,
    createActor,
    updateActor,
    deleteActor,
    searchActors
} from "../controllers/actor.controllers.js";

//get all actors
router.get('/', getAllActors);

//get actor by id
router.get('/:id', getActorById);

// get actor by query
router.post('/search', searchActors);

//create actor
router.post('/', isAuthenticated, createActor);

//update actor
router.put('/:id', isAuthenticated, updateActor);

//delete actor
router.delete('/:id', isAuthenticated, deleteActor);

export default router;