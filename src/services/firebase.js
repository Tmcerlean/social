import firebase from '../lib/firebase';

const checkUsernameDuplicate = async (username) => {
    const queryResult = await firebase.firestore().collection("users").where("username", "==", username).get();

    if (queryResult.docs.length === 0) {
        return false;
    } else {
        return true;
    }
};

const getUserByUserId = async (id) => {
    const response = await firebase.firestore().collection("users").where("id", "==", id).get();

    const user = response.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return user;
}

const getSuggestedProfiles = async (id, following) => {
    const result = await firebase.firestore().collection("users").limit(10).get();

        return result.docs.map((user) => ({
        ...user.data(), docId: user.id
    })).filter((profile) => {
        console.log(profile.id);
        console.log(following)
        return profile.id !== id && !following.includes(profile.id)
    });
}

const updateLoggedInUsersFollowing = async (loggedInUserDocId, profileId, isFollowingProfile) => {

    // Add the profileId to the following array of user with id

    return firebase.firestore().collection("users").doc(loggedInUserDocId).update({
        following: isFollowingProfile
            ? firebase.firestore.FieldValue.arrayRemove(profileId)
            : firebase.firestore.FieldValue.arrayUnion(profileId)
    });
}

const updateTargetUserFollowers = async (profileDocId, loggedInUserDocId, isFollowingProfile) => {

    // Add the profileId to the following array of user with id

    return firebase.firestore().collection("users").doc(profileDocId).update({
        followers: isFollowingProfile
            ? firebase.firestore.FieldValue.arrayRemove(loggedInUserDocId)
            : firebase.firestore.FieldValue.arrayUnion(loggedInUserDocId)
    });
}

export { checkUsernameDuplicate, getUserByUserId, getSuggestedProfiles, updateLoggedInUsersFollowing, updateTargetUserFollowers };

