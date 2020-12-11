import connectToMongo from '../../../database/connection';
import mongoose, { connection } from 'mongoose';
import PostSchema from '../../../database/models/Post';

import { NextApiRequest, NextApiResponse } from 'next';

connectToMongo();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id },
        method
    } = req;
    
    let Post;

    try {
        Post = mongoose.model('Post');
    } catch (err) {
        Post = mongoose.model('Post', PostSchema);
    }

    switch (method) {
        case 'GET':
            try {
                const post = await Post.findById(id);

                res.status(201).json({ success: true, data: post })
            } catch (err) {
                res.status(400).json({ success: false })
            }
            break;
        
        case 'PATCH':
            try {
                const updatedPost = await Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false });

                res.status(201).json({ success: true, data: updatedPost })
            } catch (err) {
                res.status(400).json({ success: false })
            }
            break;
        
        case 'DELETE':
            try {
                const deletedPost = await Post.findByIdAndDelete(id);

                res.status(201).json({ success: true, data: deletedPost })
            } catch (err) {
                res.status(400).json({ success: false })
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}