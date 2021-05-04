import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateLoggedInUsersFollowing, updateTargetUserFollowers } from '../../services/firebase';

const SuggestedProfile = ({profileDocId, username, profileId, id, loggedInUserDocId}) => {

    const [followed, setFollowed] = useState(false);

    async function handleFollowUser() {
        setFollowed(true);

        await updateLoggedInUsersFollowing(loggedInUserDocId, profileId, false);

        await updateTargetUserFollowers(profileDocId, id, false);
    }
    

    return (
        !followed ? (
            <div className="flex flex-row items-center align-items justify-between">
                <div className="flex items-center justify-between">
                    <img
                        className="flex rounded-full w-8 mr-3"
                        src="./images/avatars/tom-avatar.jpg"
                        alt=""
                    />
                    <Link to={`/p/${username}`}>
                        <p className="font-bold text-sm">{username}</p>
                    </Link>
                </div>
                <button
                    className="text-xs font-bold text-blue-500"
                    type="button"
                    onClick={() => handleFollowUser()}
                >
                    Follow
                </button>
            </div>
        ) : null
    )
}

export default SuggestedProfile;

SuggestedProfile.propTypes = {
    profileDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired
}