/* eslint-disable jsx-a11y/img-redundant-alt */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = ( { username }) => {
    return (
        <div className="flex border-b border-gray-500 h-4 p-4 py-8">
            <div className="flex items-center">
                <Link to={`/p/${username}`} className="flex items-center">
                    <img
                        className="flex rounded-full h-8 w-8 mr-3 object-cover"
                        src={`./images/avatars/${username}.jpg`}
                        alt={`${username} photo`}
                    />
                    <p className="font-bold">{username}</p>
                </Link>
            </div>
        </div>
    )
}

export default Header;

Header.propTypes = {
    username: PropTypes.string.isRequired
}