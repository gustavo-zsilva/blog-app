import Navbar from '../components/Navbar';
import Head from 'next/head';

interface LayoutProps {
    title: String;
    children: any;
}

const Layout = (props: LayoutProps) => {
    return (
        <div>
            <Head>
                <title>{props.title}</title>
            </Head>

            <Navbar />

            <div className="bg-gray-900 h-screen">
                {props.children}
            </div>
        </div>
    );
}

export default Layout;