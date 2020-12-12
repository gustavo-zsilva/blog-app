import { useState, useEffect } from 'react';
import api from '../services/api';

interface PostProps {
    id: String;
    title: String;
    message: String;
    sender: String;
    createdAt: String;
}

const Index = ({ posts }) => {

    return (
        <div className="bg-gray-50">
            <h1 className="">Hello World</h1>

            
            {
                // Iterar sobre array de posts
                // do banco de dados e mostrá-los em tela.

                posts.map((post: PostProps) => {
                    return (
                        <div key={post["_id"]}>
                            <h2>{post.title}</h2>
                            <p>{post.message}</p>
                        </div>
                    )
                })
            }
        </div>
    );
}

export async function getServerSideProps(context) {
    const response = await api.get('/posts');
    const posts = response.data.data
    

    return {
        props: {
            posts
        }
    }
}

export default Index;