import { MdDelete, MdEdit } from "react-icons/md";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { DialogBox } from "./DialogBox";
import '../styles/postComments.css';

export const Comment = ({ commentInfoInput, updateCommentInState, removeCommentFromState }) => {
    const { userInfo } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [editedComment, setEditedComment] = useState(commentInfoInput.comment);
    const APP_URL = import.meta.env.VITE_APP_URL;

    const handleDeleteCancel = () => setOpenDialog(false);

    const handleDeleteConfirm = async () => {
        setOpenDialog(false);
        try {
            const response = await fetch(`${APP_URL}/comments/deletecomment/${commentInfoInput._id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) removeCommentFromState(commentInfoInput._id);
        } catch (err) {
            console.log(err);
        }
    };

    const updateComment = async () => {
        try {
            const response = await fetch(`${APP_URL}/comments/updatecomment/${commentInfoInput._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comment: editedComment }),
                credentials: 'include'
            });
            if (response.ok) {
                updateCommentInState({ ...commentInfoInput, comment: editedComment });
                setIsEditing(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="postComm-container">
            <div className="postComm-content">
                <div className="postComm-user">
                    <h3 className="postComm-author">@{commentInfoInput.author}</h3>
                    {String(userInfo?.id) === String(commentInfoInput?.userId) && (
                        <>
                            <span className="postComm-edit-btn" onClick={() => setIsEditing(true)}>
                                <MdEdit />
                            </span>
                            <span className="postComm-del-btn" onClick={() => setOpenDialog(true)}>
                                <MdDelete />
                            </span>
                        </>
                    )}
                </div>
                <div className="postComm-feat">
                    <p className="postComm-date">{new Date(commentInfoInput.updatedAt).toString().slice(0, 15)}</p>
                    <p className="postComm-time">{new Date(commentInfoInput.updatedAt).toString().slice(16, 24)}</p>
                </div>
            </div>

            {isEditing ? (
                <div className="postComm-comment-edit-container">
                    <textarea
                        className="postComm-comment-edit"
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                    />
                    <div className="postComm-edit-options">
                        <button className="postComm-update-btn" onClick={updateComment}>Update</button>
                        <button className="postComm-cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <p className="postComm-comment">{commentInfoInput.comment}</p>
            )}

            <DialogBox
                isOpen={openDialog}
                closeDialog={handleDeleteCancel}
                handleDeleteConfirm={handleDeleteConfirm}
                description={"Are you sure you want to delete this comment?"}
                title={"Delete the comment"}
            />
        </div>
    );
};
