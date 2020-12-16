import { useState, useEffect } from 'react';
import api from '../services/api';
import Link from 'next/link';
import Layout from '../components/Layout';
import { BiMoon } from 'react-icons/bi'

interface PostProps {
    title: String;
    message: String;
    description: String;
    sender: String;
    createdAt: String;
}

const Index = ({ posts }) => {

    return (
        <Layout title="Blog App">
            <div className="bg-gray-900 container max-w-full p-8 px-20 m-auto text-center text-white h-screen">

                <h1 className="text-xl mb-8">Recent Posts</h1>

                <div className="grid grid-cols-3 col-auto flex m-auto gap-10 justify-around">
                    {
                        // Iterar sobre array de posts
                        // do banco de dados e mostrá-los em tela.

                        posts.length > 0 ? (
                            posts.map((post: PostProps) => {
                                return (
                                    <div key={post["_id"]}>
                                        <Link href={`/posts/${post["_id"]}`}>
                                            <div className="rounded w-full bg-white p-8 bg-gray-600 cursor-pointer hover:bg-gray-700 transition duration-150 shadow-sm">
                                                <h2 className="text-lg">{post.title}</h2>
                                                <p className="break-normal mt-4">{post.description}</p>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="text-center col-span-3">
                                <h1>
                                    <BiMoon color="#FFF" size={46} className="m-auto mb-6" />
                                    Ainda não há nenhum post nesta página, ou não pudemos renderizá-los em tela.
                                </h1>
                            </div>
                        )
                    }
                </div>
            </div>
        </Layout>

     
    );
}

export async function getServerSideProps(context) {
    const response = await api.get('/posts');
    const posts = response.data.data;
    

    return {
        props: {
            posts
        }
    }
}

export default Index;