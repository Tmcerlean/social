import useUser from '../../hooks/useUser';
import User from './User';
import Suggestions from './Suggestions';

const Sidebar = () => {

    const { user: {
        name, username, id, following, docId
    } } = useUser();

    return (
        <div>
            <User name={name} username={username} />
            <Suggestions id={id} following={following} loggedInUserDocId={docId} />
        </div>
    )
}

export default Sidebar;