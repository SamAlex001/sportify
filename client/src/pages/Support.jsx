import { useState } from "react";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { FaPlus, FaMinus } from "react-icons/fa";
import '../styles/support.css';
import { FAQContactForm } from "../components/ContactUs";

export const Support = () => {

   // State to manage the open/closed state of each FAQ
   const [faqOpen, setFaqOpen] = useState({
      faq1: false,
      faq2: false,
      faq3: false,
      faq4: false,
      faq5: false
   });

   // Function to toggle the open/closed state of an FAQ
   const toggleFaq = (faq) => {
      setFaqOpen(prevState => ({
         ...prevState,
         [faq]: !prevState[faq]
      }));
   };

   return (
      <div className="customer-support-container ">
         <Navbar />
         <div className="customer-support-content-wrapper">
            <span className="text-[black] text-[36px] font-[600] relative top-[20px] flex justify-center items-center ">FAQs</span>
            <div className="faq-list">
               <div className="faq">
                  <div className="faq-question" onClick={() => toggleFaq('faq1')}>
                     <h3 className="question-text">FAQ 1: What is Sportify?</h3>
                     <span className="faq-icon">{faqOpen.faq1 ? <FaMinus /> : <FaPlus />}</span>
                  </div>
                  {faqOpen.faq1 && <p className="answer-text">Sportify is a platform dedicated to keeping sports enthusiasts informed with real-time updates, comprehensive coverage, and a user-friendly interface.</p>}
               </div>
               <div className="faq">
                  <div className="faq-question" onClick={() => toggleFaq('faq2')}>
                     <h3 className="question-text">FAQ 2: How do I access real-time updates?</h3>
                     <span className="faq-icon">{faqOpen.faq2 ? <FaMinus /> : <FaPlus />}</span>
                  </div>
                  {faqOpen.faq2 && <p className="answer-text">Real-time updates can be accessed through the Sportify platform, providing you with the latest scores and developments as they happen.</p>}
               </div>
               <div className="faq">
                  <div className="faq-question" onClick={() => toggleFaq('faq3')}>
                     <h3 className="question-text">FAQ 3: Is there coverage for niche sports?</h3>
                     <span className="faq-icon">{faqOpen.faq3 ? <FaMinus /> : <FaPlus />}</span>
                  </div>
                  {faqOpen.faq3 && <p className="answer-text">Yes, Sportify offers comprehensive coverage for niche sports, ensuring that you're always informed about a wide range of sporting events.</p>}
               </div>
               <div className="faq">
                  <div className="faq-question" onClick={() => toggleFaq('faq4')}>
                     <h3 className="question-text">FAQ 4: How can I navigate the Sportify platform?</h3>
                     <span className="faq-icon">{faqOpen.faq4 ? <FaMinus /> : <FaPlus />}</span>
                  </div>
                  {faqOpen.faq4 && <p className="answer-text">Sportify provides a user-friendly interface designed for seamless navigation across all devices, allowing you to access the information you need with ease.</p>}
               </div>
               <div className="faq">
                  <div className="faq-question" onClick={() => toggleFaq('faq5')}>
                     <h3 className="question-text">FAQ 5: How can I contact customer support?</h3>
                     <span className="faq-icon">{faqOpen.faq5 ? <FaMinus /> : <FaPlus />}</span>
                  </div>
                  {faqOpen.faq5 && <p className="answer-text">You can contact our customer support team by emailing support@sportify.com or by filling out the contact form on our website.</p>}
               </div>
            </div>
         </div>
         <div className="customer-support-contactform">
            <FAQContactForm />
         </div>
         <div className="customer-support-footer">
            <Footer />
         </div>
      </div>
   )
}
