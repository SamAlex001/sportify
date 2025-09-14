import '../styles/latestPosts.css';
// import { PostPage } from '../pages/PostPage';
import { LatestPostSection } from './LatestPostsSection';

export const LatestPosts = () => {
   
   
   return (
      <div className="latest-posts-container">
         <h2 className='latest-posts-header'>Latest Posts</h2>
         <div className="latest-posts-list">
            <LatestPostSection />
         </div>
      </div>
   );
};
