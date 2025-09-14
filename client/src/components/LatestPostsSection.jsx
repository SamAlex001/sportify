import { useEffect, useState } from "react";
// import Footer from './Footer';
import { Post } from "./Post";

export const LatestPostSection = ({ search, limit }) => {

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
        <div>
            <div>
                {searchPost && searchPost.length > 0
                    ? (searchPost.slice(0, limit).map(searchedPost => <Post key={searchedPost._id} {...searchedPost} />))
                    : (posts.slice(0, limit).map(post => <Post key={post._id} {...post} />))
                }
            </div>
        </div>
    )
}
