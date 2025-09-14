import '../styles/login.css';
import Logo from "../assets/Login_SignUP_Logo.png";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Navbar } from "../components/Navbar";
import { LoginModal } from "../components/Modal";
import { Loader } from '../components/Loaders';
import { IoIosAlert } from "react-icons/io";
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';


export const Login = () => {

    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setUserInfo } = useContext(UserContext);
    const [loginError, setLoginError] = useState(false);
    const [passEye, setPassEye] = useState(true);
    const APP_URL = import.meta.env.VITE_APP_URL;
    
    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const toggleLoading = () => {
        setLoading(!loading);
    }

    async function Login(e) {
        e.preventDefault();
        const response = await fetch(`${APP_URL}/auth/login/`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                toggleModal();
                toggleLoading();
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            })
        } else {
            setLoginError(!loginError);
            // console.log('Login Failed');
        }
    }

    return (
        <>
            <Navbar />
            {!loading &&
                <>
                    <div className="login-container flex flex-row justify-center items-center gap-[20px] select-none">
                        <form onSubmit={Login}>
                            <div className="login-container-left bg-[var(--tert)] flex flex-col justify-center items-center gap-[20px] h-[650px] w-[550px] rounded-[20px] p-[10px]">
                                <div className="login-welcome font-[800] text-[60px] text-wrap uppercase ">Welcome to <br /><span className="relative top-[-30px]">Sportify</span></div>
                                <input type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="login-name outline-none border-r-0 border-l-0 border-t-0 border-b-2 rounded-[10px] p-[8px] w-[440px]"
                                    placeholder="Full Name"
                                />
                                <span>
                                    <input
                                        type={!passEye ? 'text' : 'password'}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="login-pass outline-none border-r-0 border-l-0 border-t-0 border-b-2 rounded-[10px] p-[8px] w-[440px]"
                                        placeholder="Password"
                                    />
                                    <span onClick={() => setPassEye(!passEye)}>
                                        {
                                            passEye ? <FaEyeSlash className="relative left-[-24px] top-[4px] cursor-pointer" />
                                                : <FaEye className="relative left-[-24px] top-[4px] cursor-pointer" />
                                        }
                                    </span>
                                </span>
                                <button type="submit"
                                    className="login-btn text-[14px] font-[400] p-[4px] border-none bg-[var(--prim)] text-[white] rounded-[6px] cursor-pointer w-[100px]"
                                >Login</button>
                                {/* <span className="font-[900]">Or</span>
                                <div className="sign-other-option flex flex-row justify-center items-center gap-[10px]">
                                    <button className="flex flex-row justify-center items-center gap-[4px] text-[12px] font-[600] p-[4px] border-none bg-[var(--tert)] rounded-[6px] cursor-pointer">
                                        <span><FaGoogle className="text-[16px] text-center mt-[4px]" /></span> Login with Google
                                    </button>
                                    <button className="flex flex-row justify-center items-center gap-[4px] text-[12px] font-[600] p-[4px] border-none bg-[var(--tert)] rounded-[6px] cursor-pointer w-[140px]">
                                        <span><FaGoogle className="text-[16px] text-center mt-[4px]" /></span> Login with Meta
                                    </button>
                                </div> */}
                            </div>
                        </form>
                        {/* <div className="sign-container-left bg-[var(--prim)] h-[650px] w-[500px] rounded-[20px]"></div> */}
                    </div >
                </>
            }
            <LoginModal isOpen={modalOpen} closeModal={toggleModal}
                title={`Welcome ${username}`}
                description={'Login Successful!'}
            />
            {loading && <div className="login-loading"><Loader /></div>}
        </>
    )
}