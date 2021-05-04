import { useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/sidebar/index';
import Feed from '../components/Feed';

const Home = () => {

    useEffect(() => {
        document.title = 'Social';
    }, []);

    return (
        <>
            <div className="">
                <Header />
            </div>
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                <Feed />
                <Sidebar />
            </div>
        </>
    )
}

export default Home;