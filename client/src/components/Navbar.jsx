import '../styles/navbar.css';
import Logo from "../assets/Navbar-Logo.png";
import { NavLink, Link, useNavigate, useParams, redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext, useEffect, useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { GoTriangleUp } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { Loader } from './Loaders';

export const Navbar = () => {

   const id = useParams();
   const navigate = useNavigate();
   const { userInfo, setUserInfo, logout } = useContext(UserContext);
   const [userLoggedIn, setUserLoggedIn] = useState(false);
   const username = userInfo?.username;
   const [clicked, setClicked] = useState(false);
   const [loading, setLoading] = useState(false);
   const APP_URL = import.meta.env.VITE_APP_URL;


   // Function USER STATUS: Logged In or Not
   async function checkUserStatus() {
      if (userInfo) {
         try {
            const response = await fetch(`${APP_URL}/user/profile`, {
               credentials: 'include',
               method: 'GET'
            });
            if (response.ok) {
               const userInfo = await response.json();
               setUserLoggedIn(true);
               setUserInfo(userInfo);
            } else if (response.status === 401) {
               setUserLoggedIn(false);
               console.log("401 ERROR: Unauthorized User!");
            }
         } catch (error) {
            console.error("Error Checking User Status: ", error);
         }
      }
   }

   // LOGOUT Function
   function handleLogout() {
      logout();
   }



   // USER STATUS: Logged In or Not
   useEffect(() => {
      checkUserStatus();
   }, []);

   return (<nav className="navbar z-[100]">
      <ul className="navbar-container">
         <li className='nav-links opacity-100'>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}>
               <img src={Logo} alt="Image_Not_Loading" />
            </NavLink>
         </li>
         <li className='nav-links'>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}>Home</NavLink>
         </li>
         <li className='nav-links'>
            <NavLink to="/exploreBlogs" className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}>Explore</NavLink>
         </li>
         {/* <li className='nav-links'>
               <NavLink to="/category" className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}>Category</NavLink>
            </li> */}
         <li className='nav-links'>
            <NavLink to="/liveScore" className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}>Live</NavLink>
         </li>
         <li className='nav-links'>
            <NavLink to="/support" className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}>Support</NavLink>
         </li>
         <li className='nav-links'>
            <NavLink to="/aboutUs" className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}>About Us</NavLink>
         </li>
         {username &&
            <li className='nav-links'>
               <button
                  type="button"
                  id="navbar-create-post"
                  value="submit"
                  onClick={() => { navigate("/createPost") }}
               >Create Blog</button>
            </li>
         }
         <li>
            {!username ?
               <div className='navbar-user-login-signup-container flex justify-center items-center'>
                  <button className="navbar-user-signup-btn pr-[10px] pl-[10px] pt-[4px] pb-[4px]"
                     onClick={() => { navigate("/signup") }}
                  >Sign Up</button>
                  &nbsp;
                  <span>or</span>
                  &nbsp;
                  <button className="navbar-user-login-btn pr-[20px] pl-[20px] pt-[4px] pb-[4px]"
                     onClick={() => { navigate("/login") }}
                  >Login</button>
               </div> :
               <div className="navbar-user-settings">
                  <div className="navbar-username flex items-center justify-center gap-[0.8rem] cursor-pointer"
                     onClick={() => { setClicked(!clicked) }}>
                     <FaRegUser className='navbar-user-icon' />{username}
                  </div>
                  {clicked &&
                     <div className='navbar-user-options-wrapper z-[10] rounded-[8px] flex justify-center items-center flex-col gap-[1rem] pl-[20px] pr-[20px] pb-[8px] pt-[10px]'>
                        <GoTriangleUp className='navbar-options-arrow text-[var(--prim)] text-[20px]' />
                        <Link className='navbar-user-profile-btn flex justify-center items-center gap-[0.5rem] text-[white] cursor-pointer'
                           to={`/profilePage/${userInfo?.id}`}
                        ><IoIosSettings className='navber-user-options-icon' /><span>Profile</span></Link>
                        <button className='navbar-user-logout-btn flex justify-center items-center gap-[0.5rem] border-none bg-transparent text-[white] cursor-pointer'
                           onClick={() => { handleLogout() }}
                        ><IoIosLogOut className='navber-user-options-icon' />Logout</button>
                     </div>
                  }
               </div>
            }
         </li>
      </ul>
      {
         loading &&
         <div className="navbar-loader-container"><Loader /></div>
      }
   </nav >
   );
}