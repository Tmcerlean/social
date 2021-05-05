import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Image from './Image';
import Actions from './Actions';
import Footer from './Footer';
import Comments from './Comments';

const Post = ({ content }) => {

    const commentInput = useRef(null);

    const handleFocus = () => commentInput.current.focus();

    return (
        <div className="rounded col-span-4 border bg-white border-gray-500 mb-12">
            <Header username={content.username} />
            <Image src={content.imageSrc} description={content.description} />
            <Actions 
                docId={content.docId}
                totalLikes={content.likes.length}
                likedPhoto={content.userLikedPhoto}
                handleFocus={handleFocus}
            />
            <Footer username={content.username} description={content.description} />
            <Comments 
                docId={content.docId}
                comments={content.comments}
                datePosted={content.dateCreated}
                commentInput={commentInput}
            />
        </div>
    );
}

export default Post;

Post.propTypes = {
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.object.isRequired
    })
}