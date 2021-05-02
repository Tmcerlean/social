import { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../context/firebase';

export default function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                // We have an authenticated user, so we can save to local storage
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {
                // We don't have an authenticated user, so we can clear local storage
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });

        return () => {
            listener();
        };

    }, [firebase]);

    return { user };
};


