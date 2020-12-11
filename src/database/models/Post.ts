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
    title: {
        type: String,
        required: true,
        // trim: true,
        // maxlength: [40, 'Title cannot have more than 40 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default PostSchema;