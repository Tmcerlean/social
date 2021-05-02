import { useEffect } from 'react';

const NotFound = () => {

    useEffect(() => {
        document.title = 'Not Found';
    }, []);

    return (
        <div>
            Not Found
        </div>
    )
}

export default NotFound;