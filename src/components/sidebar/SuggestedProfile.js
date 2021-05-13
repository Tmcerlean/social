import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateLoggedInUsersFollowing, updateTargetUserFollowers } from '../../services/firebase';

const SuggestedProfile = ({profileDocId, username, profileId, id, loggedInUserDocId}) => {

    const [followed, setFollowed] = useState(false);
    const [hovered, setHovered] = useState(false);

    const toggleHover = () => setHovered(!hovered);

    async function handleFollowUser() {
        setFollowed(true);

        await updateLoggedInUsersFollowing(loggedInUserDocId, profileId, false);

        await updateTargetUserFollowers(profileDocId, id, false);
    }
    

    return (
        !followed ? (
            <div className="flex flex-row items-center align-items justify-between">
                <div className="flex items-center justify-between">
                    <Link to={`/p/${username}`}>
                        <img
                            className="flex rounded-full w-8 mr-3"
                            src={`./images/avatars/${username}.jpg`}
                            alt=""
                        />
                    </Link>
                    <Link to={`/p/${username}`}>
                        <p 
                            className={`font-bold text-sm ${hovered ? 'underline' : ''}`}
                            onMouseEnter={toggleHover}
                            onMouseLeave={toggleHover}
                        > 
                            {username}
                        </p>
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