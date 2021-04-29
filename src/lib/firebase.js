import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyD_jqx10Rq9gwGAviJz-ve-j6RtuZLM4og",
    authDomain: "social-2dcd8.firebaseapp.com",
    projectId: "social-2dcd8",
    storageBucket: "social-2dcd8.appspot.com",
    messagingSenderId: "938033086004",
    appId: "1:938033086004:web:213f5905f963d510a21461"
};

firebase.initializeApp(firebaseConfig);

export default firebase;