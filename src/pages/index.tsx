import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import api from '../services/api';

const Index = () => {
    // const [posts, setPosts] = useState<AxiosResponse>([]);

    const getPosts = async () => {
        const response = await api.get('/posts');

        console.log(response.data.data);
        
        // setPosts(response)
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <div>
            <h1>Hello World</h1>

            {
                // Iterar sobre array de posts
                // do banco de dados e mostrá-los em tela.
            }
        </div>
    );
}

export default Index;