import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

const AddComment = ({ docId, comments, setComments, commentInput }) => {
    const [comment, setComment] = useState('');
    const { firebase } = useContext(FirebaseContext);
    const {
        user: { displayName }
    } = useContext(UserContext);

    const handleSubmitComment = (e) => {
        e.preventDefault();

        setComments([{displayName, comment}, ...comments]);
        setComment('');

        return firebase.firestore().collection("photos").doc(docId).update({
            comments: firebase.firestore.FieldValue.arrayUnion({ displayName, comment })
        });   
    }

    return (
        <div className="border-t border-gray-500">
            <form
                className="flex justify-between pl-0 pr-5"
                method="POST"
                onSubmit={(e) => comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault()}
            >
                <input
                    autocomplete="off"
                    className="text-sm text-gray-500 w-full mr-3 px-4"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment ..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    ref={commentInput}
                />
                <button
                    className={`text-sm font-bold text-blue-500 ${!comment && 'opacity-25'}`}
                    type="button"
                    disabled={comment.length < 1}
                    onClick={handleSubmitComment}
                >
                    Post
                </button>
            </form>
        </div>
    )
}

export default AddComment;

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object
}