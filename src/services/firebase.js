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
        return profile.id !== id && !following.includes(profile.id)
    });
}

const updateLoggedInUsersFollowing = async (loggedInUserDocId, profileId, isFollowingProfile) => {
    return firebase.firestore().collection("users").doc(loggedInUserDocId).update({
        following: isFollowingProfile
            ? firebase.firestore.FieldValue.arrayRemove(profileId)
            : firebase.firestore.FieldValue.arrayUnion(profileId)
    });
}

const updateTargetUserFollowers = async (profileDocId, loggedInUserDocId, isFollowingProfile) => {
    return firebase.firestore().collection("users").doc(profileDocId).update({
        followers: isFollowingProfile
            ? firebase.firestore.FieldValue.arrayRemove(loggedInUserDocId)
            : firebase.firestore.FieldValue.arrayUnion(loggedInUserDocId)
    });
}

const getUsersPhotos = async (uid, following) => {
    const result = await firebase.firestore().collection("photos").where("userId", "in", following).get();

    const userFollowedPhotos = result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }));

    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if (photo.likes.includes(uid)) {
                userLikedPhoto = true;
            }
            const user = await getUserByUserId(photo.userId);
            const { username } = user[0];
            return { username, ...photo, userLikedPhoto };
        })
    )

    return photosWithUserDetails;
}

const getUserByUsername = async (username) => {
    const result = await firebase.firestore().collection("users").where("username", "==", username).get();
    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return user;
}

const getUserPhotosByUsername = async (username) => {

    const [user] = await getUserByUsername(username);
    const result = await firebase.firestore().collection("photos").where("userId", "==", user.id).get();

    const photos = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))

    return photos;
}

const isUserFollowingProfile = async (loggedInUserUsername, profileUserId) => {
    const result = await firebase.firestore().collection("users").where("username", "==", loggedInUserUsername).where("following", "array-contains", profileUserId).get();

    const [response = {}] = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))

    return response.id;
}

const toggleFollow = async (isFollowingProfile, activeUserDocId, profileDocId, profileUserId, followingUserId) => {
    await updateLoggedInUsersFollowing(activeUserDocId, profileUserId, isFollowingProfile);
    await updateTargetUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}

export { checkUsernameDuplicate, getUserByUserId, getSuggestedProfiles, updateLoggedInUsersFollowing, updateTargetUserFollowers, getUsersPhotos, getUserByUsername, getUserPhotosByUsername, isUserFollowingProfile, toggleFollow };