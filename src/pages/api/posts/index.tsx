import mongoose from 'mongoose';
import connectToMongo from '../../../database/connection';
import PostSchema from '../../../database/models/Post';

import { NextApiRequest, NextApiResponse } from 'next';

connectToMongo();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    let Post;

    try {
        Post = mongoose.model('Post');
    } catch (err) {
        Post = mongoose.model('Post', PostSchema);
    }

    switch(method) {
        case 'GET':
            try {
                const posts = await Post.find({});

                res.status(200).json({ success: true, data: posts });
            } catch (err) {
                res.status(400).json({ success: false });
            }
            break;

        case 'POST':
            try {
                const newPost = await new Post(req.body);

                newPost.save()

                res.status(201).json({ success: true, data: newPost });
            } catch (err) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}