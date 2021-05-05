import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId, getUsersPhotos } from '../services/firebase';

export default function usePhotos() {
    const [photos, setPhotos] = useState(null);
    const { user: { uid = '' } } = useContext(UserContext);

    useEffect(() => {
        async function getFeedPhotos() {
            const [{ following }] = await getUserByUserId(uid);
            let followedUserPhotos = [];

            if (following.length > 0) {
                followedUserPhotos = await getUsersPhotos(uid, following)
            }

            followedUserPhotos.sort((a,b) => b.dateCreated - a.dateCreated);
            setPhotos(followedUserPhotos);
        }
        getFeedPhotos();
    }, [uid]);

    return { photos };
};


