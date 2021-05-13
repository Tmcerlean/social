import { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { getUserPhotosByUsername } from '../../services/firebase';
import Photos from './Photos';

const Profile = ({ user }) => {

    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0
    };

    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function getProfileInformationAndPhotos() {
            const photos = await getUserPhotosByUsername(user.username);
            dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length});
        }
        if (user.username) {
            getProfileInformationAndPhotos();
        }
    }, [user])

    return (
        <>
            <Header 
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <Photos photos={photosCollection} />
        </>
    );
};

export default Profile;

Profile.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    }).isRequired
}