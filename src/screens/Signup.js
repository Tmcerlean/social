import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { checkUsernameDuplicate } from '../services/firebase';

const Signup = () => {

    const history = useHistory();
    const { firebase, auth } = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const isEmailValid = (email.includes("@") && email.includes("."));
    const isNameValid = name.length > 0;
    const isUsernameValid = username.length > 0;
    const isPasswordValid = (password !== '' && password.length > 5);
    const isSignupValid = isEmailValid && isNameValid && isUsernameValid && isPasswordValid;

    useEffect(() => {
        document.title = 'Signup';
    }, []);

    const signUp = async (e) => {

        e.preventDefault();

        
        // Check if username already exists
        const usernameExists = await checkUsernameDuplicate(username);

        console.log("Here", usernameExists)

        if (usernameExists) {
            console.log("Duplicate user");
            console.log(usernameExists)
        } else {
            console.log("Creating User");
        }


        // auth.signInWithEmailAndPassword(email, password)
        // .then((userCredential) => {
        //   // Signed in
        //   var user = userCredential.user;
        //   console.log(user);
        //   history.push(ROUTES.DASHBOARD);
        // })
        // .catch((error) => {
        //   var errorMessage = error.message;
        //   setError(errorMessage);
        // });

        // firebase.auth().createUserWithEmailAndPassword(email, password)
        // .then((userCredential) => {
        //     // Signed in 
        //     var user = userCredential.user;
        // })
        // .catch((error) => {
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // ..
        // });
    }

    return (
        <div className="container mx-auto flex flex-col flex-wrap h-screen">
            <div className="container border m-auto w-4/12 flex flex-wrap justify-center bg-white shadow-new">
                <h1 className="text-5xl m-4">Social.</h1>
                <div className="mb-4">
                    <h2 className="text-gray-500 font-medium">Sign up to see photos and videos from your friends.</h2>
                </div>
                <form className="flex flex-wrap justify-center">
                    <input 
                        className="border rounded w-9/12 p-1 mb-2 pl-2" 
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        className="border rounded w-9/12 p-1 mb-2 pl-2" 
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input 
                        className="border rounded w-9/12 p-1 mb-2 pl-2" 
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input 
                        className="border rounded w-9/12 p-1 mb-4 pl-2" 
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                        className={`border rounded w-9/12 p-1 mb-4 bg-blue-400 text-white font-medium ${isSignupValid ? "cursor-pointer" : "bg-opacity-50 cursor-default"}`}
                        onClick={signUp}
                    >Register</button>
                    <div className="mb-4">
                        <p>Have an account? <Link to={ROUTES.LOGIN} className="font-medium text-blue-500 cursor-pointer">Log in</Link></p>
                    </div>
                    {error.length > 0 && <p className="text-xs text-red-600">{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default Signup;
