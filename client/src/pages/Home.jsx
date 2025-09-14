import '../styles/home.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { Navbar } from '../components/Navbar';
import { ContactForm } from '../components/ContactUs';
import HomeCarousel from '../components/HomeCarousel';
// import { LatestPosts } from '../components/LatestPosts';
import Footer from '../components/Footer';
import { LatestPostSection } from '../components/LatestPostsSection';
import { LatestPosts } from '../components/LatestPosts';

export const Home = () => {
    return (
        <div className='home-main-container'>
            <div className="home-nav">
                <Navbar />
            </div>
            <div className="home-carousel">
                <HomeCarousel />
            </div>
            <div className="home-latest-posts">
                <LatestPosts />
            </div>
            <div className="home-contact">
                <ContactForm />
            </div>
            <div className="home-footer">
                <Footer />
            </div>
        </div>
    )
}