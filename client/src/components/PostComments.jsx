import '../styles/comments.css';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { CommentModal } from './Modal';
import { toast } from 'react-toastify';

export const PostComments = ({ postId, postAuthor, onCommentPosted }) => {
    const { userInfo } = useContext(UserContext);
    const [comment, setComment] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const APP_URL = import.meta.env.VITE_APP_URL;

    const toggleModal = () => setModalOpen(!modalOpen);

    async function postComment(e) {
        e.preventDefault();
        if (!userInfo?.username) return toggleModal();
        if (!comment.trim()) return toast.error('Write a comment before posting');

        try {
            const response = await fetch(`${APP_URL}/comments/postcomment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    comment,
                    author: userInfo.username,
                    postId,
                    userId: userInfo.id,
                    postAuthor
                }),
                credentials: 'include',
            });

            if (response.ok) {
                const newComment = await response.json();
                setComment('');
                toast.success('Comment Posted');
                onCommentPosted(newComment); // update comment list in parent
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="comm-container">
            <form onSubmit={postComment} className="comm-content-container">
                <div className="comm-content">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Comment here"
                    />
                </div>
                <div className="comm-postBtn-container">
                    <button className="comm-post-btn">Post</button>
                </div>
            </form>
            <CommentModal
                isOpen={modalOpen}
                closeModal={toggleModal}
                title={"You are not Logged In!"}
                description={"Log in to comment."}
            />
        </div>
    );
};
