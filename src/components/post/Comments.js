import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom'; 

const Comments = ({docId, comments: allComments, datePosted, commentInput}) => {

    const [comments, setComments] = useState(allComments);

    useEffect(() => {
        console.log(datePosted.seconds);
        console.log(Math.floor(Date.now() / 1000));
    }, [])

    return (
        <>
            <div className="p-4 pt-1 pb-4">
                {comments.length >= 3 && (
                    <p className="text-sm text-gray-500 mb-1 cursor-pointer">
                        View all {comments.length} comments
                    </p>
                )}
                {comments.slice(0,3).map((item) => (
                    <p key={`${item.comment}-${item.displayName}`} className="mb-1">
                        <Link to={`/p/${item.displayName}`}>
                            <span className="mr-1 font-bold">{item.displayName}</span>
                        </Link>
                        <span>{item.comment}</span>
                    </p>
                ))}
                <p className="text-gray-500 uppercase text-xs">
                    {formatDistance(datePosted.seconds, Math.floor(Date.now() / 1000))} ago
                </p>
            </div>
        </>
    )
};

export default Comments;

Comments.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    datePosted: PropTypes.object.isRequired,
    commentInput: PropTypes.object.isRequired
}