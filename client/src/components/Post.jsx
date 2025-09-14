import '../styles/post.css';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export const Post = ({ _id, title, summary, cover, content, createdAt, author, limit }) => {

    const URL = import.meta.env.VITE_LOCAL_URL;
    const navigate = useNavigate();
    const adjustedCover = cover.substring(10);
    // console.log(adjustedCover)

    return (
        <div className="post-container">
            <div className="post-cover" onClick={() => navigate(`/post/${_id}`)}>
                <img src={URL+adjustedCover} alt="COVER_IMG_NOT_LOADING" />
            </div>
            <div className="post-details">
                <div className="post-title" onClick={() => navigate(`/post/${_id}`)}>{title}</div>
                <div className="post-author">Author: @{author.username}</div>
                <div className="post-time">Published At: {format(new Date(createdAt), 'dd-MM-yy')}</div>
                <br />
                <div className="post-summary">{summary}</div>
                <br />
                <br />
                <button className='post-read-btn' onClick={() => navigate(`/post/${_id}`)}>Read Now</button>
            </div>
        </div>
    )
}