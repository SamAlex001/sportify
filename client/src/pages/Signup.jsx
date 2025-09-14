import Logo from "../assets/Login_SignUP_Logo.png"
import '../styles/signup.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { SignUpModal } from "../components/Modal";
import { Loader } from "../components/Loaders";
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

export const SignUp = () => {

    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passEye, setPassEye] = useState(true);
    const [cpassEye, setCpassEye] = useState(true);
    const APP_URL = import.meta.env.VITE_APP_URL;
    
    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const toggleLoading = () => {
        setLoading(!loading);
    }

    // Passing User Data
    async function Register(ev) {
        ev.preventDefault();
        const response = await fetch(`${APP_URL}/auth/signup`, {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 200) {
            toggleModal();
            toggleLoading();
            setTimeout(() => {
                navigate('/login');
            }, 1000)
        } else {
            toast.error('Sign Up Failed!');
        }
    }

    return (
        <>
            <Navbar />
            {!loading &&
                <div className="signup-container flex flex-row justify-center items-center gap-[20px] select-none">
                    {/* <div className="sign-container-left bg-[var(--prim)] h-[650px] w-[500px] rounded-[20px]"></div> */}
                    <form onSubmit={Register}>
                        <div className="sign-container-right bg-[var(--tert)] flex flex-col justify-center items-center gap-[20px] h-[650px] w-[550px] rounded-[20px] p-[10px]">
                            <div className="sign-welcome font-[800] text-[60px] text-wrap uppercase ">Welcome to <br /><span className="relative top-[-30px]">Sportify</span></div>
                            <input type="text"
                                autoFocus
                                onChange={e => setUsername(e.target.value)}
                                className="sign-name outline-none border-r-0 border-l-0 border-t-0 border-b-2 rounded-[10px] p-[8px] w-[440px]"
                                placeholder="Full Name"
                            />
                            <input type="email"
                                onChange={e => setEmail(e.target.value)}
                                className="sign-email outline-none border-r-0 border-l-0 border-t-0 border-b-2 rounded-[10px] p-[8px] w-[440px]"
                                placeholder="E-mail"
                            />
                            <span>
                                <input type={passEye ? "password" : "text"}
                                    onChange={e => setPassword(e.target.value)}
                                    className="sign-pass outline-none border-r-0 border-l-0 border-t-0 border-b-2 rounded-[10px] p-[8px] w-[440px]"
                                    placeholder="Password"
                                />
                                <span onClick={() => (setPassEye(!passEye))}>
                                    {!passEye ? <FaEye className="relative left-[-24px] top-[4px] cursor-pointer" /> : <FaEyeSlash className="relative left-[-24px] top-[4px] cursor-pointer" />}
                                </span>
                            </span>
                            <span>
                                <input type={cpassEye ? "password" : "text"}
                                    onChange={(e) => (e.target.value === password) ? console.log("Passwords match") : console.log("Passwords do not match")}
                                    className="sign-cpass outline-none border-r-0 border-l-0 border-t-0 border-b-2 rounded-[10px] p-[8px] w-[440px]"
                                    placeholder="Confirm Password"
                                />
                                <span onClick={() => (setCpassEye(!cpassEye))}>
                                    {!cpassEye ? <FaEye className="relative left-[-24px] top-[4px] cursor-pointer" /> : <FaEyeSlash className="relative left-[-24px] top-[4px] cursor-pointer" />}
                                </span>                            </span>
                            <button type="submit"
                                className="sign-btn text-[14px] font-[400] p-[4px] border-none bg-[var(--prim)] text-[white] rounded-[6px] cursor-pointer w-[100px]"
                            // onSubmit={Register}
                            >Sign Up</button>
                            {/* <span className="font-[900]">Or</span>
                            <div className="sign-other-option flex flex-row justify-center items-center gap-[10px]">
                                <button
                                    className="flex flex-row justify-center items-center gap-[4px] text-[12px] font-[600] p-[4px] border-none bg-[var(--tert)] rounded-[6px] cursor-pointer">
                                    <span><FaGoogle className="text-[16px] text-center mt-[4px]" /></span> Sign Up with Google
                                </button>
                                <button
                                    className="flex flex-row justify-center items-center gap-[4px] text-[12px] font-[600] p-[4px] border-none bg-[var(--tert)] rounded-[6px] cursor-pointer w-[140px]">
                                    <span><FaGoogle className="text-[16px] text-center mt-[4px]" /></span> Sign Up with Meta
                                </button>
                            </div> */}
                        </div>
                    </form>
                </div >
            }
            <SignUpModal isOpen={modalOpen} closeModal={toggleModal}
                title={"Sign Up Successful"}
            />
            {loading && <div className="signup-loading"><Loader /></div>}
        </>
    )
};