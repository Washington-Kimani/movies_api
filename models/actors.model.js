import mongoose, {Schema} from 'mongoose';

//create the actor schema
const actorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    birthPlace:{
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    children: {
        type: [String],
    },
    movies: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

//create the actor model
const Actor = mongoose.model('Actor', actorSchema);

//export the model
export default Actor;