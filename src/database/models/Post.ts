import mongoose, { Schema } from 'mongoose';

const PostSchema: Schema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        // trim: true,
        // maxlength: [500, 'Message cannot have more than 500 characters']
    },
    description: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        // trim: true,
        // maxlength: [40, 'Title cannot have more than 40 characters']
    },
    votes: {
        upvotes: {
            type: Number,
            default: 0,
        },
        downvotes: {
            type: Number,
            default: 0,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default PostSchema;