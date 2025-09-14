import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import "../styles/aboutUs.css";

export const AboutUs = () => {
  return (
    <div className="about-us-wrapper">
      <div className="about-us-">
        <Navbar />
      </div>
      <div className="about-us-container bg-[white] mt-[140px] mb-[100px]">
        <div className="about-us-content flex flex-col items-center justify-center p-8">
          <h2 className="about-section-title text-[50px] relative top-[-20px]">About Sportify</h2>
          <p className="about-section-text text-[18px] text-balance text-center relative top-[-30px] p-[40px]">
            At Sportify, we are dedicated to keeping you fully informed in the dynamic realm of sports. With our unwavering commitment to providing real-time updates, you can trust that you'll be in the loop with the latest scores and developments as they unfold. Our comprehensive coverage spans across all spectrums of sports, from the most prominent leagues to the most niche competitions. Whether your passion lies in football, basketball, cricket, or tennis, we ensure that you're always in the know, catering to every sports enthusiast's interests. Moreover, our platform boasts a user-friendly interface, meticulously designed to offer a seamless browsing experience across all devices. Accessing sports scores has never been easier or more intuitive, allowing you to stay connected to the information you need, no matter where you are or what device you're using.
          </p>
        </div>
        <div className="team-members flex flex-col items-center justify-center p-8">
          <div className="about-team-card bg-[var(--prim)] text-[white] rounded-[10px] p-[20px] text-center">
            <h4 className="font-[400] text-[12px]">Developed & Designed by</h4>
            <h3>Sam Alex</h3>
            <p className="text-[16px]">Full Stack Developer <br /> UI/UX Designer</p>
          </div>
        </div>
      </div>
      <div className="about-us-footer">
        <Footer />
      </div>
    </div>
  );
};
