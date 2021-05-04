import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './SuggestedProfile';

const Suggestions = ({ id, following, loggedInUserDocId }) => {

    const [profiles, setProfiles] = useState(null);

    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(id, following);
            console.log(response)
            setProfiles(response);
        }
        if (id) {
            suggestedProfiles();
        }
    }, [id])

    return (
        !profiles ? (
            <Skeleton count={1} height={150} className="mt-5" />
        ) : profiles.length > 0 ? (
            <div className="flex flex-col rounded">
                <div className="flex text-sm items-center align-items justify-between mb-2">
                    <p className="font-bold text-grey-base">Suggestions for you</p>
                </div>
                <div className="grid gap-5 mt-4">
                    {profiles.map((profile) => (
                        <SuggestedProfile
                            key={profile.docId}
                            profileDocId={profile.docId}
                            username={profile.username}
                            profileId={profile.id}
                            id={id}
                            loggedInUserDocId={loggedInUserDocId}
                        />
                    ))}
                </div>
            </div>
        ) : null
    );
}

export default Suggestions;

Suggestions.propTypes = {
    id: PropTypes.string,
    following: PropTypes.array,
    loggedInUserDocId: PropTypes.string
}