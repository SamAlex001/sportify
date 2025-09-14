import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Editor } from "../components/Editor";
import "../styles/editPost.css";
import { Navbar } from "../components/Navbar";
import { PostModal } from "../components/Modal";
import { Loader } from "../components/Loaders";

export const EditPost = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [category, setCategory] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const APP_URL = import.meta.env.VITE_APP_URL;

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const toggleLoading = () => {
        setLoading(!loading);
    }

    useEffect(() => {
        fetch(`${APP_URL}/posts/viewpost/` + id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                });
            })
            .catch(error => {
                console.error('Error fetching post:', error);
            });
    }, []);

    async function updatePost(e) {
        e.preventDefault();

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('category', category);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }

        const response = await fetch(`${APP_URL}/posts/updatepost`, {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });
        if (response.ok) {
            toggleModal();
            toggleLoading();
            setTimeout(() => {
                navigate('/post/' + id);
            }, 1000)
        }
    }

    return (
        <div>
            <Navbar />
            {!loading &&
                <form onSubmit={updatePost} className="edit-post-container">
                    <div className="ep-goBack-btnWrapper">
                        <Link to={-1}><button className="ep-goBack-btn">Go Back</button></Link>
                    </div>
                    <div className="ep-contentWrapper">
                        <div className="ep-titleWrapper">
                            <div className="ep-title-header">Title:</div>
                            <input type="title"
                                placeholder={'Title'}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="ep-summaryWrapper">
                            <div className="ep-summary-header">Summary:</div>
                            <input type="summary"
                                placeholder={'Summary'}
                                value={summary}
                                onChange={(e) => { setSummary(e.target.value) }} />
                        </div>
                        {/* <input type="category"
                    placeholder={'Category'}
                    value={category}
                    onChange={(e) => { setCategory(e.target.value) }} />
                <br /><br /> */}
                        <div className="ep-fileWrapper">
                            <div className="ep-file-container">Thumbnail:</div>
                            <input type="file"
                                onChange={(e) => { setFiles(e.target.files) }} />
                        </div>
                    </div>
                    <Editor onChange={setContent} value={content} />
                    <div className="ep-btnWrapper">
                        <button className="ep-update-btn">Update Post</button>
                    </div>
                </form>}
            <PostModal isOpen={modalOpen} closeModal={toggleModal}
                description={"Post Updated Successfully!"}
            />
            {loading &&
                <div className="ep-loading"><Loader /></div>
            }
        </div >
    )
}