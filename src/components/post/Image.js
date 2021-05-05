import PropTypes from 'prop-types';

const Image = ({ src, description }) => {

    return (
        <img src={src} alt={description} />
    )

}

export default Image;

Image.propTypes = {
    src: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}