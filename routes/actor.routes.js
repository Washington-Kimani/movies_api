import {Router} from 'express';

// import authentication middleware
import {isAuthenticated} from '../middlewares/auth.middleware.js';

const router = Router();

// use the authentication middleware for all routes
router.use(isAuthenticated);

// import controllers
import {getAllActors, getActorById, createActor, updateActor, deleteActor} from "../controllers/actor.controllers.js";

//get all actors
router.get('/', getAllActors);

//get actor by id
router.get('/:id', getActorById);

//create actor
router.post('/', createActor);

//update actor
router.put('/:id', updateActor);

//delete actor
router.delete('/:id', deleteActor);

export default router;