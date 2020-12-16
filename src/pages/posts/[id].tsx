import {useState, useEffect} from 'react';

import Layout from '../../components/Layout';
import api from '../../services/api';

import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';
import { AiOutlineEdit } from 'react-icons/ai';

import { useRouter } from 'next/router';

interface PostDataProps {
    _id: String;
    title: String;
    description: String;
    message: String;
    sender: String;
    createdAt: String;
    __v: Number;
}

const Post = ({ postData }) => {

    const router = useRouter();

    const [hasVoted, setHasVoted] = useState(false);
    const [upvotes, setUpvotes] = useState(postData.votes.upvotes);
    const [downvotes, setDownvotes] = useState(postData.votes.downvotes);

    async function submitVoteToDB() {
        await api.patch(`/posts/${postData["_id"]}`, {
            votes: {
                upvotes,
                downvotes
            }
        })

        console.log('====================================');
        console.log('Submitted to database');
        console.log('====================================');
    }

    function changeVotes(e) {
        const vote = e.currentTarget.name;

        if (vote === "upvote" && !hasVoted) {
            setUpvotes(upvotes + 1);
            setHasVoted(true);

        } else if (vote === "downvote" && !hasVoted) {
            setDownvotes(downvotes + 1);
            setHasVoted(true);

        }

        submitVoteToDB();
    }

    async function handleDeletePost() {
        await api.delete(`/posts/${postData["_id"]}`);

        console.log('====================================');
        console.log('Deleted post');
        console.log('====================================');

        router.push('/');
    }

    return (
        <Layout title={postData.title}>
            <div className="m-auto mx-80 pt-10 grid grid-cols-7 text-white">

                {/* Votes */}
                <div className="mr-10 flex flex-col justify-center">
                    <button name="upvote" onClick={changeVotes}>
                        <FiArrowUpCircle color="#979797" size={40} className="m-auto cursor-pointer mb-2" />
                    </button>
                    <p className="text-center text-2xl text-green-300">
                        {upvotes}
                    </p>
                    <p className="text-center text-lg text-red-300">
                        {downvotes}
                    </p>
                    <button name="downvote" onClick={changeVotes}>
                        <FiArrowDownCircle color="#979797" size={40} className="m-auto cursor-pointer mt-2" />
                    </button>
                </div>

                {/* Post Body */}
                <div className="col-span-4">
                    <h1 className="text-2xl bg-gray-800 p-4 rounded flex justify-between">
                        {postData.title}
                        <AiOutlineEdit color="#FFF" size={26} className="cursor-pointer self-center" />
                    </h1>
                    <p className="text-lg mt-10 text-gray-400 mb-5 capitalize break-words flex justify-between">
                        {postData.description}
                        <AiOutlineEdit color="#979797" size={26} className="cursor-pointer self-center" />
                    </p>
                    <p className="max-w-4 break-words flex justify-between">
                        {postData.message}
                        <AiOutlineEdit color="#FFF" size={26} className="cursor-pointer self-center" />
                    </p>
                </div>

                {/* Sidebar */}
                <div className="col-span-2 ml-20 flex flex-col">
                    <div className="border-2 rounded border-gray-700 h-auto p-4"></div>

                    <button onClick={handleDeletePost} className="w-full h-auto p-3 bg-red-500 mt-5 rounded cursor-pointer">
                        Delete post
                    </button>
                </div>
            
            </div>
    
        </Layout>
    );
}

async function getPostIds() {
    const response = await api.get('/posts');
    const data = response.data.ids;

    return data.map((db) => {
        return {
            params: {
                id: db["_id"]
            }
        }
    });
}

export async function getStaticPaths() {
    const paths = await getPostIds();

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const response = await api.get('/posts');
    const data = response.data.data;

    const postData = data.filter(db => db["_id"] === params.id)[0];

    return {
        props: {
            postData
        }
    }
}

export default Post;