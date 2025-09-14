import FooterLogo from '../assets/Logo.png';
import "../styles/footer.css";

const Footer = () => {
   return (
      <>
         <div className="footer-container bg-[var(--prim)] p-[20px] pt-[50px] flex items-start justify-evenly gap-[20px]">
            <div className="footer-logo flex items-center justify-center flex-col">
               <img src={FooterLogo} alt="footer_logo" className='h-[90px]' />
               <span className='text-[28px] font-[600] text-[var(--tert)]'>Sportify</span>
            </div>
            <div className="footer-link-container flex gap-[40px]">
               <div className="footer-links-1">
                  <ul className='list-none flex items-start justify-center flex-col gap-[10px] text-[var(--tert)] font-[300]'>
                     <li>About Us</li>
                     <li>Terms of Service</li>
                     <li>Customer Service</li>
                  </ul>
               </div>
               <div className="footer-links-2">
                  <ul className='list-none flex items-start justify-center flex-col gap-[10px] text-[var(--tert)] font-[300]'>
                     <li>User Forum</li>
                     <li>Latest Blogs</li>
                     <li>Trending Blogs</li>
                  </ul>
               </div>
               <div className="footer-links-3">
                  <ul className='list-none flex items-start justify-center flex-col gap-[10px] text-[var(--tert)] font-[300]'>
                     <li>Sign Up As Author</li>
                     <li>Explore Blogs</li>
                  </ul>
               </div>
               <div className="footer-links-4">
                  <ul className='list-none flex items-start justify-center flex-col gap-[10px] text-[var(--tert)] font-[300]'>
                     <li>Facebook</li>
                     <li>X (Twitter)</li>
                     <li>Instagram</li>
                     <li>LinkedIn</li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="footer-copyright bg-[var(--prim)] text-[white]">
            <ul className='list-none flex items-center justify-center gap-[10px] text-[14px] font-[400] mt-[-20px] p-[10px]'>
               <li> &copy; 2025. All rights reserved</li>
               <li>|</li>
               <li>Developed by Sam Alex</li>
            </ul>
         </div>
      </>

   )
}

export default Footer;