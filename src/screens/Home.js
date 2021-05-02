import { useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';

const Home = () => {

    useEffect(() => {
        document.title = 'Social';
    }, []);

    return (
        <>
            <Header />
            <Sidebar />
            <Feed />
        </>
    )
}

export default Home;