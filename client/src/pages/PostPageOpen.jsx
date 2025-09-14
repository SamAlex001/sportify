import '../styles/postPageOpen.css';
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { PostComments } from "../components/PostComments";
import { Comment } from "../components/Comment";
import { Navbar } from "../components/Navbar";
import { MdDelete } from "react-icons/md";
import { PostModal } from "../components/Modal";
import { Loader } from "../components/Loaders";
import { DialogBox } from "../components/DialogBox";
import Footer from '../components/Footer';

export const PostPageOpen = () => {
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [postInfo, setPostInfo] = useState(null);
    const [commentInfo, setCommentInfo] = useState([]);
    const [postCover, setPostCover] = useState('');
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const { id } = useParams();
    const URL = import.meta.env.VITE_LOCAL_URL;
    const APP_URL = import.meta.env.VITE_APP_URL;

    const toggleLoading = () => setLoading(!loading);

    const handleDeleteCancel = () => setOpenDialog(false);

    const handleDeleteConfirm = async () => {
        setOpenDialog(false);
        setDeleteLoading(true); // show loader while deleting
        try {
            const response = await fetch(`${APP_URL}/posts/deletepost/${id}`, {
                credentials: "include",
                method: 'DELETE'
            });
            if (response.ok) {
                setDeleteLoading(false);
                navigate("/exploreBlogs");
            } else {
                console.error("Error deleting post");
                setDeleteLoading(false);
            }
        } catch (err) {
            console.error(err);
            setDeleteLoading(false);
        }
    };

    const deletePost = () => setOpenDialog(true);

    const updateCommentInState = (updatedComment) => {
        setCommentInfo(prev => prev.map(c => c._id === updatedComment._id ? updatedComment : c));
    };

    const removeCommentFromState = (commentId) => {
        setCommentInfo(prev => prev.filter(c => c._id !== commentId));
    };

    const addCommentToState = (newComment) => {
        setCommentInfo(prev => [...prev, newComment]);
    };

    useEffect(() => {
        // Fetch user profile
        fetch(`${APP_URL}/user/profile`, { credentials: 'include' })
            .then(res => res.json())
            .then(userInfo => setUserInfo(userInfo));

        // Fetch post info
        fetch(`${APP_URL}/posts/viewpost/${id}`)
            .then(res => res.json())
            .then(postInfo => {
                setPostInfo(postInfo);
                setPostCover(postInfo.cover);
            });

        // Fetch comments
        fetch(`${APP_URL}/comments/getcomment/${id}`)
            .then(res => res.json())
            .then(comments => setCommentInfo(comments));
    }, []);

    if (!postInfo || loading) return <Loader />;

    const adjustedCover = postCover.substring(10);

    return (
        <>
            <Navbar />
            <div className="postOpen-container">
                <button className="postOpen-home-btn" onClick={() => navigate("/exploreBlogs")}>Go Back</button>
                <div className="postOpen-title">{postInfo.title}</div>
                <div className="postOpen-author-container">
                    <div className="postOpen-author">Author: @{postInfo.author.username}</div>
                </div>
                <div className="postOpen-contentInfo">
                    <div className="postOpen-time">Published At: {format(new Date(postInfo.createdAt), 'dd-MM-yyyy')}</div>
                    <div className="postOpen-edit-btnWrapper">
                        {String(userInfo.id) === String(postInfo.author._id) && (
                            <>
                                <button
                                    className="postOpen-edit-btn"
                                    onClick={() => navigate(`/editPost/${postInfo._id}`)}
                                >Edit Post</button>
                                <button className="postOpen-delete-btn" onClick={deletePost}>
                                    <MdDelete />
                                    {deleteLoading && <span className="delete-loading">Deleting...</span>}
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="postOpen-cover-container">
                    <img src={URL + adjustedCover} alt="IMG_NOT_LOADING" />
                </div>

                <div className="postOpen-contentWrapper" dangerouslySetInnerHTML={{ __html: postInfo.content }} />

                {/* Comment Form */}
                <PostComments
                    postId={postInfo._id}
                    postAuthor={postInfo.author.username}
                    onCommentPosted={addCommentToState}
                />

                {/* Comment List */}
                <div className="postOpen-commentStack">
                    {[...commentInfo]
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map(comment => (
                            <Comment
                                key={comment._id}
                                commentInfoInput={comment}
                                updateCommentInState={updateCommentInState}
                                removeCommentFromState={removeCommentFromState}
                            />
                        ))}
                </div>


                {/* Delete Confirmation Dialog */}
                <DialogBox
                    isOpen={openDialog}
                    closeDialog={handleDeleteCancel}
                    handleDeleteConfirm={handleDeleteConfirm}
                    description={"Are you sure you want to delete this post?"}
                    title={"Delete the Post"}
                />
            </div>
            <Footer />
        </>
    );
};
