import { useContext } from 'react';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { DEFAULT_IMAGE_PATH } from '../constants/paths';

const Header = () => {

    const { firebase } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);

    return (
        <header className="flex items-center align-items h-12 bg-gray-800 border-b mb-8">
            <div className="container mx-auto w-full flex justify-between">
                <h1 className="text-3xl text-white">
                    <Link to={ROUTES.HOME}>
                        Social.
                    </Link>
                </h1>
                <div className="text-white text-center flex items-center align-items">
                    {user ? (
                        <>
                            <button
                                type="button"
                                title="Home"
                            >
                                <Link to={ROUTES.HOME}>
                                    <svg
                                        className="w-6 mr-6 text-white cursor-pointer"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                </Link>
                            </button>

                            <button
                                type="button"
                                title="Sign Out"
                                onClick={() => firebase.auth().signOut()}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        firebase.auth().signOut();
                                    }
                                }}
                            >
                                <svg
                                    className="w-6 mr-6 text-white cursor-pointer"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                            </button>
                            {user && (
                                <div className="flex items-center cursor-pointer">
                                    <Link to={`/p/${user?.displayName}`}>
                                        <img
                                            className="rounded-full h-7 w-7 flex"
                                            src= {`../images/avatars/${user?.displayName}.jpg`}
                                            alt={`${user?.displayName} profile`}
                                            onError={(e) => {
                                            e.target.src = DEFAULT_IMAGE_PATH;
                                            }}
                                        />
                                    </Link>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <Link to={ROUTES.LOGIN}>
                                <button
                                    type="button"
                                    className="bg-blue-500 font-bold text-sm rounded text-white w-20 h-8"
                                >
                                    Log In
                                </button>
                            </Link>
                            <Link to={ROUTES.SIGNUP}>
                                <button
                                    type="button"
                                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                                >
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header;