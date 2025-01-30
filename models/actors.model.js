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
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

actorSchema.index({ name: 'text', bio: 'text' });

//create the actor model
const Actor = mongoose.model('Actor', actorSchema);

//export the model
export default Actor;