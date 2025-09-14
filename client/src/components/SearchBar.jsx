import "../styles/searchBar.css";
import { MdOutlineClear } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";
import { PostPage } from "../pages/PostPage";
import { Navbar } from "./Navbar";
import { FaList } from "react-icons/fa";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {

   const [searchFilter, setSearchFilter] = useState('');
   const [searchPostInfo, setSearchPostInfo] = useState([]);
   const navigate = useNavigate();
   const APP_URL = import.meta.env.VITE_APP_URL;

   async function searchPost(e) {
      e.preventDefault();
      await fetch(`${APP_URL}/posts/searchpost?search=${searchFilter}`, {
         method: 'GET',
         credentials: 'include'
      }).then(res => {
         res.json().then(searchpost => {
            setSearchPostInfo(searchpost)
         });
      });
   }

   // Clear Filter
   async function clearFliter(e) {
      e.preventDefault();
      await fetch(`${APP_URL}/posts/searchpost?search=${searchFilter}`, {
         method: 'GET',
         credentials: 'include'
      }).then(res => {
         res.json().then(() => {
            setSearchPostInfo([]);
         });
      });
      setSearchFilter("");
      navigate('/exploreBlogs')
   }

   return (
      <div className="searchBar-container-wrapper">
         <div className="explore-navb">
            <Navbar />
         </div>
         <form className="searchBar-container" onSubmit={searchPost}>
            <div className="searchBar-input-container flex justify-center items-center flerx-row gap-[10px]">
               <input type="text"
                  className="searchBar-input w-[500px] p-[8px] placeholder:text-[14px] placeholder:font-[500] placeholder:text-[#b0b0b0] border-[1px] rounded-[4px] border-[var(--prim)] outline-[var(--prim)]"
                  placeholder="Search here..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
               />
               {searchFilter !== "" &&
                  <button className="searchBar-clear-btn w-[20px] h-[20px] border-none bg-transparent cursor-pointer"
                     onClick={(e) => clearFliter(e)}>
                     <MdOutlineClear />
                  </button>
               }
               <button className="searchBar-search-btn w-[25px] h-[25px] rounded-[4px] border-none bg-[var(--prim)] text-[white] cursor-pointer"
                  type="submit"
               // onClick={(e) => searchPost(e)}
               >
                  <IoSearchSharp className="relative top-[2px]" />
               </button>
            </div>
            {/* <span className="searchBar-btns flex justify-center items-center ml-[10px] gap-[6px]">
               <button className="search-btn flex justify-center items-center gap-[10px] rounded-[6px] pl-[18px] pr-[18px] pt-[4px] pb-[4px]"
                  onClick={(e) => searchPost(e)}
               >
                  <IoFilterSharp className="text-[14px]" />
                  <span>Filter</span></button>
               <button className="search-btn flex justify-center items-center gap-[10px] rounded-[6px] pl-[18px] pr-[18px] pt-[4px] pb-[4px]"
                  onClick={(e) => searchPost(e)}
               ><FaList className="text-[14px]" /> <span>List</span></button>
            </span> */}
         </form>
         <div className="explore-posts">
            <PostPage search={searchPostInfo.map(post => post._id)} />
         </div>
         <div className="explore-footer">
            <Footer />
         </div>
      </div >
   )
}