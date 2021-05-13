import { useState, useEffect } from 'react';
import { getUsersPhotos } from '../services/firebase';

export default function usePhotos(user) {
    const [photos, setPhotos] = useState(null);

    useEffect(() => {
        async function getFeedPhotos() {
            if (user?.following?.length > 0) {
                const followedUserPhotos = await getUsersPhotos(user.id, user.following)
                followedUserPhotos.sort((a,b) => b.dateCreated - a.dateCreated);
                setPhotos(followedUserPhotos);
            }
        }
        getFeedPhotos();
    }, [user?.id, user?.following]);

    return { photos };
};


