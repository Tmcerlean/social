import { useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/sidebar/index';
import Feed from '../components/Feed';
import useUser from '../hooks/useUser';
import LoggedInUserContext from '../context/logged-in-user';

const Home = ({ user: loggedInUser }) => {

    const { user, setActiveUser } = useUser(loggedInUser.uid);

    useEffect(() => {
        document.title = 'Social';
    }, []);

    return (
        <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
            <div className="">
                <Header />
            </div>
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                <Feed />
                <Sidebar />
            </div>
        </LoggedInUserContext.Provider>
    )
}

export default Home;