import './App.css';
import { Route, Routes } from 'react-router-dom';
import { CreatePost } from '../pages/CreatePost';
import { PostPage } from '../pages/PostPage';
import { EditPost } from '../pages/EditPost';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { PostPageOpen } from '../pages/PostPageOpen';
import { SignUp } from '../pages/Signup';
import { UserContextProvider } from '../context/UserContext';
import { ProfilePage } from '../pages/ProfilePage';
import { LiveScorePage } from '../pages/LiveScorePage';
import { SearchBar } from '../components/SearchBar';
import { AboutUs } from '../pages/AboutUs';
import { Support } from '../pages/Support';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/createPost' element={<CreatePost />} />
        <Route path='/post' element={<PostPage />} />
        <Route path='/post/:id' element={<PostPageOpen />} />
        <Route path='/editPost/:id' element={<EditPost />} />
        <Route path='/profilePage/:id' element={<ProfilePage />} />
        <Route path='/liveScore' element={<LiveScorePage />} />
        <Route path='/exploreBlogs' element={<SearchBar />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/support' element={<Support />} />
        <Route path='/category' element={<h1>Category Page</h1>} />
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
