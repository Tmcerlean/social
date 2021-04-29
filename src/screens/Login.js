import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

const Login = () => {

    const history = useHistory();
    const { firebase, auth } = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const isEmailValid = (email.includes("@") && email.includes("."));
    const isPasswordValid = (password !== '' && password.length > 5);
    const isLoginValid = isEmailValid && isPasswordValid;

    useEffect(() => {
        document.title = 'Login';
    }, []);

    const signIn = (e) => {

        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log(user);
          history.push(ROUTES.DASHBOARD);
        })
        .catch((error) => {
          var errorMessage = error.message;
          setError(errorMessage);
        });
    }

    return (
        <div className="container mx-auto flex flex-col flex-wrap h-screen">
            <div className="container border m-auto w-4/12 flex flex-wrap justify-center bg-white shadow-new">
                <h1 className="text-5xl m-4">Social.</h1>
                <form className="flex flex-wrap justify-center">
                    <input 
                        className="border rounded w-9/12 p-1 mb-2 pl-2" 
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        className="border rounded w-9/12 p-1 mb-4 pl-2" 
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                        className={`border rounded w-9/12 p-1 mb-4 bg-blue-400 text-white font-medium ${isLoginValid ? "cursor-pointer" : "bg-opacity-50 cursor-default"}`}
                        onClick={signIn}
                    >Log In</button>
                    <div className="mb-4">
                        <p>Don't have an account? <Link to={ROUTES.SIGNUP} className="font-medium text-blue-500 cursor-pointer">Sign up</Link></p>
                    </div>
                    {error.length > 0 && <p className="text-xs text-red-600">{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default Login;