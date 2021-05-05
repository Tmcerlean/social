import PropTypes from 'prop-types';

const Footer = ({ username, description }) => {
    return (
        <div className="p-4 pt-2 pb-0">
            <span className="mr-1 font-bold">{username}</span>
            <span>{description}</span>
        </div>
    )
}

export default Footer;

Footer.propTypes = {
    username: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}