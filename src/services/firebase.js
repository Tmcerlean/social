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

export { checkUsernameDuplicate, getUserByUserId };

