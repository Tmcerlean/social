import firebase from '../lib/firebase';

const checkUsernameDuplicate = async (username) => {
    const queryResult = await firebase.firestore().collection('users').where("username", "==", username).get();

    // DO SOMETHING
    
};

export { checkUsernameDuplicate };