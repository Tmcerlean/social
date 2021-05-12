import { useEffect } from 'react';
import Header from '../components/Header';

const NotFound = () => {

    useEffect(() => {
        document.title = 'Not Found';
    }, []);

    return (
        <div>
            <Header />
            <div className="w-full mx-auto max-w-screen-lg">
                <p className="text-center text-2xl mt-16">
                    Not Found!
                </p>
            </div>
        </div>
    )
}

export default NotFound;