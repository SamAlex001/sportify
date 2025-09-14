import { useEffect, useState } from "react";
import Footer from '../components/Footer';
import { Post } from "../components/Post";
import '../styles/postPage.css';

export const PostPage = ({ search, limit }) => {

    // SHOW posts
    const [posts, setPosts] = useState([]);
    const searchPost = search ? posts.filter(post => search.includes(post._id)) : posts; // Show searched posts or all
    const APP_URL = import.meta.env.VITE_APP_URL;
    // Fetching Post
    function getPost() {
        fetch(`${APP_URL}/posts/getpost`).then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }

    useEffect(() => {
        getPost();
    }, []);

    return (
        <div className="post-page-container">
            <div className="post-page-content">
                {searchPost && searchPost.length > 0
                    ? (searchPost.slice(0, limit).map(searchedPost => <Post key={searchedPost._id} {...searchedPost} />))
                    : (posts.slice(0, limit).map(post => <Post key={post._id} {...post} />))
                }
            </div>
        </div>
    )
}
