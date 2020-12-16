import Layout from '../../components/Layout';
import {useState, useEffect, FormEvent} from 'react';
import api from '../../services/api';

const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    async function handleSubmitForm(e: FormEvent) {
        e.preventDefault();

        await api.post('/posts', {
            title,
            description,
            message,
            sender: 'Default'
        })

        setTitle('');
        setDescription('');
        setMessage('');
    }

    return (
        <Layout title={''}>
            <div className="bg-gray-900 h-screen m-auto container max-w-full p-8 px-20 m-auto text-center text-white">
                <form onSubmit={handleSubmitForm}>
                    <h2 className="text-lg">Create a new post</h2>

                    <div className="grid grid-cols-2 flex gap-6 mx-20 mt-10">

                        <div className="flex flex-col">
                            <label htmlFor="title" className="text-left mb-2">Title</label>
                            <input
                                type="text"
                                id="title"
                                className="mb-4 p-4 rounded bg-gray-300 text-black"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="description" className="text-left mb-2">Description</label>
                            <input
                                type="text"
                                id="description"
                                className="mb-4 p-4 rounded bg-gray-300 text-black"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>
              
                        <div className="flex flex-col col-span-2">
                            <label htmlFor="message" className="text-left mb-2">Message</label>
                            <textarea
                                name="message"
                                id="message"
                                cols={30}
                                rows={5}
                                className="p-4 rounded bg-gray-300 text-black"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            >
                            </textarea>
                        </div>
                    </div>

                    <button type="submit" className="bg-green-400 p-4 px-20 rounded mt-12 hover:bg-green-500 transition duration:150">Publish Post</button>
                </form>
            </div>
        </Layout>
    );
}

export default CreatePost;