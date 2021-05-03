import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

export default function useUser() {
    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(UserContext);

    useEffect(() => {
        async function getUserObjByUserId() {
            console.log(user.uid)
            const [response] = await getUserByUserId(user.uid);
            await console.log(response);
            setActiveUser(response);
        }

        if (user?.uid) {
            getUserObjByUserId();
        }

    }, [user]);

    useEffect(() => {
        console.log(activeUser)
    
    }, [activeUser])

    return { user: activeUser };
};


