import Link from 'next/link';

const Navbar = () => {
    return (
        <div className="container flex bg-gray-800 text-white min-w-full justify-between p-4">
            <Link href="/">
                <h3 className="text-lg cursor-pointer">Blog App</h3>
            </Link>

            <div>
                <Link href="/">
                    <a className="mr-6 hover:underline transition duration:150">Recent Posts</a>
                </Link>

                <Link href="/posts/create">
                    <a className="mr-4 hover:underline transition duration:150">New Post</a>
                </Link>
            </div>
        </div>
    );
}


export default Navbar;