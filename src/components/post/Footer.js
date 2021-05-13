import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; 

const Footer = ({ username, description }) => {
    return (
        <div className="p-4 pt-2 pb-0">
            <Link to={`/p/${username}`}>
                <span className="mr-1 font-bold cursor-pointer">{username}</span>
            </Link>
            <span>{description}</span>
        </div>
    )
}

export default Footer;

Footer.propTypes = {
    username: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}