import firebase from '../lib/firebase';

const checkUsernameDuplicate = async (username) => {
    const queryResult = await firebase.firestore().collection('users').where("username", "==", username).get();

    if (queryResult.docs.length === 0) {
        return false;
    } else {
        return true;
    }
};

export { checkUsernameDuplicate };