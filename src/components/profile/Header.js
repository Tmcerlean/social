/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';
import useUser from '../../hooks/useUser';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';


const Header = ({ photosCount, profile: {
    docId: profileDocId, id: profileUserId, name, followers = [], following = [], username: profileUsername
}, followerCount, setFollowerCount }) => {
    const { user } = useUser();
    const [isFollowingProfile, setIsFollowingProfile] = useState(null);
    const activeBtnFollow = user?.username && user?.username !== profileUsername;

    //TEST
    useEffect(() => {
        console.log(isFollowingProfile)
    }, [isFollowingProfile])
    
    const handleToggleFollow = async () => {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount -1 : followerCount + 1
        });
        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.id);
    };

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            await console.log(isFollowing)
            setIsFollowingProfile(!!isFollowing);
        }
        if (user?.username && profileUserId) {
            isLoggedInUserFollowingProfile();
        }
    }, [user?.username, profileUserId])
    
    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center">
                {user.username && (<img
                    className="flex rounded-full h-40 w-40"
                    src="/images/avatars/tom-avatar.jpg"
                    alt={`${profileUsername} profile picture`}
                />
                )}
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{profileUsername}</p>
                    {activeBtnFollow && (
                        <button
                            className="bg-blue-500 font-bold text-sm rounded text-white w-20 h-8"
                            type="button"
                            onClick={handleToggleFollow}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleToggleFollow();
                                }
                            }}
                        >
                            {isFollowingProfile ? 'Unfollow' : 'Follow'}
                        </button>
                    )}
                </div>
                <div className="container flex mt-4">
                    {followers === undefined || following === undefined ? (
                        <Skeleton count={1} width={677} height={24} /> ) : (
                            <>
                                <p className="mr-10">
                                    <span className="font-bold">{photosCount}</span>
                                    {` `}
                                    photos
                                </p>
                                <p className="mr-10">
                                    <span className="font-bold">{followerCount}</span>
                                    {` `}
                                    {followerCount === 1 ? `follower` : `followers`}
                                </p>
                                <p className="mr-10">
                                    <span className="font-bold">{followers.length}</span>
                                    {` `}
                                    following
                                </p>
                            </>
                        )
                    }
                </div>
                <div className="container mt-4">
                    <p className="font-medium">{!name ? <Skeleton count={1} height={24} /> : name} </p>
                </div>
            </div>
        </div>
    );
}

export default Header;

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        username: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array
    }).isRequired

}