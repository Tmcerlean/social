import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';

const Login = () => {

    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const isInvalid = (password === '' || email === '');

    useEffect(() => {
        document.title = 'Login'
    }, [])

    return (
        <div>
            I am the login page
        </div>
    )
}

export default Login
