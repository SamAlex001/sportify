import "../styles/contactUs.css";
import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ContactForm = () => {

   const [email, setEmail] = useState('');
   const [message, setMessage] = useState('');
   const FORM_URL = import.meta.env.VITE_CONTACT;

   async function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('entry.1934547602', email);
      formData.append('entry.341006385', message);
      try {
         const response = await fetch(`${FORM_URL}`, {
            method: 'POST',
            body: formData,
            mode: "no-cors"
         });
         if (response.ok) {
            setEmail('');
            setMessage('');
            toast.success("Message Sent Successfully!");
         }
      } catch (error) {
         console.error('Error submitting form:', error);
         toast.error("Error submitting form. Please try again later.");
      }
   }

   return (
      <form
         action={import.meta.env.VITE_CONTACT}
         method="POST"
         onSubmit={handleSubmit}
         className="contact-container"
      >
         <div className="contact-container-2 flex flex-row justify-center items-start gap-[10px]">
            <div className="contact-text text-[white] text-nowrap font-[600] text-[20px]">Contact Us</div>
            <div className="contact-background">
               <div className="call-mail-container flex flex-row justify-center gap-[10px]">
                  <div className="call-card">
                     <FaPhoneAlt className="relative left-[-4px]" />
                     <div className="call-content">
                        <span className="font-[700] text-nowrap">Call Us</span>
                        <span className="call-dash">-</span>
                        <span className="call-dayTime text-[0.69rem]">Mon to Fri <br />10 am to 5 pm</span>
                     </div>
                     <div className="call-num underline text-[0.9rem] font-[600] relative top-[5px]">+91 98765 43210</div>
                  </div>
                  <div className="mail-card">
                     <IoMdMail className="relative bottom-[12px] text-[20px] " />
                     <div className="mail-content">
                        <span className="font-[700]">Mail Us</span>
                     </div>
                     <div className="call-num underline text-[0.9rem] font-[600] relative top-[12px]">sportify@buis.com</div>
                  </div>
               </div>
               <span className="contact-or">Or</span>
               <div className="contact-form flex flex-row justify-center items-center gap-[20px]">
                  <div className="contact-info-container">
                     <input type="text" placeholder="Full Name" className="contact-fullName" />
                     <input type="email" placeholder="E-mail" className="contact-email" />
                     <textarea type="text" placeholder="Enter Message" className="contact-message" />
                  </div>
                  <div className="contact-form-submit">
                     <button className="contact-form-submit-btn border-none rounded-[6px] cursor-pointer" type="submit">
                        <div className="contact-form-submit-text text-nowrap pt-[5px] pb-[5px] pl-[10px] pr-[10px]">Send Message</div>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </form>
   );
}

// Support page contact form for FAQ
export const FAQContactForm = () => {

   const [email, setEmail] = useState('');
   const [message, setMessage] = useState('');
   const FORM_URL = import.meta.env.VITE_CONTACT;

   async function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('entry.1934547602', email);
      formData.append('entry.341006385', message);
      try {
         await fetch(`${FORM_URL}`, {
            method: 'POST',
            body: formData,
            mode: "no-cors"
         });
         setEmail('');
         setMessage('');
         toast.success("Message Sent Successfully!");
      } catch (error) {
         console.error('Error submitting form:', error);
         toast.error("Error submitting form. Please try again later.");
      }
   }

   return (

      <form
         action={import.meta.env.VITE_CONTACT}
         onSubmit={handleSubmit}
         method="POST"
         className="faq-container"
      >
         <div className="faq-background flex flex-col justify-center items-center gap-[20px] mb-[20px]">
            <div className="faq-text text-[black] font-[600] text-[20px] text-left  relative top-[10px] right-[80px]">Facing any trouble? Let us know</div>
            <div className="faq-form flex flex-col justify-center items-center gap-[20px]">
               <div className="faq-info-container flex flex-col justify-center items-center gap-[10px]">
                  <input type="text" placeholder="Full Name" className="faq-fullName" />
                  <input type="email" placeholder="E-mail" className="faq-email" />
                  <textarea type="text" placeholder="Enter Message" className="faq-message" />
               </div>
               <div className="faq-form-submit w-fit">
                  <button className="faq-form-submit-btn border-none rounded-[6px] cursor-pointer" type="submit">
                     <div className="faq-form-submit-text text-nowrap pt-[5px] pb-[5px] pl-[10px] pr-[10px]">Send Message</div>
                  </button>
               </div>
            </div>
         </div>
      </ form>
   )
}