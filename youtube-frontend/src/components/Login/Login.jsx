import React, { useState } from "react";
import "./Login.css";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function Login({ setLoginModel }) {
    // State for login form fields
    const [loginField, setLoginField] = useState({ userName: "", password: "" });
    const [loader, setLoader] = useState(false);

    // Handle input changes
    const handleOnChangeInput = (event, name) => {
        setLoginField(prev => ({
            ...prev, [name]: event.target.value
        }));
    };

    // Handle login request
    const handleLogin = async () => {
        setLoader(true);
        axios.post(
            `${import.meta.env.VITE_API_BASE_URL || "https://youtubeclone-gnz1.onrender.com"}/auth/login`,
            loginField,
            { withCredentials: true }
        )
            .then((res) => {
                setLoader(false);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userId", res.data.user._id);
                localStorage.setItem("userProfilePic", res.data.user.profilePic);
                window.location.reload();
            })
            .catch(err => {
                setLoader(false);
                toast.error("Invalid Credentials");
                console.error(err);
            });
    };


    return (
        <div className="login">
            <div className="loginCard">

                {/* Title */}
                <div className="loginCard-title">
                    <YouTubeIcon sx={{ fontSize: "54px" }} className="loginCard-titleImg" />
                    Login
                </div>

                {/* Input Fields */}
                <div className="loginCredentials">
                    <input
                        value={loginField.userName}
                        placeholder="Enter Username"
                        onChange={(e) => handleOnChangeInput(e, "userName")}
                        type="text"
                    />
                    <input
                        value={loginField.password}
                        placeholder="Enter Password"
                        onChange={(e) => handleOnChangeInput(e, "password")}
                        type="password"
                    />
                </div>

                {/* Buttons */}
                <div className="loginBtns">
                    <div className="login-btn" onClick={handleLogin}>Login</div>
                    <Link to="/signup" onClick={() => setLoginModel()} className="login-btn">Signup</Link>
                    <div className="login-btn" onClick={() => setLoginModel()}>Cancel</div>
                </div>

                {/* Loader */}
                {loader && (
                    <Box sx={{ width: '100%' }} className="loaderBox">
                        <LinearProgress />
                    </Box>
                )}
            </div>

            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );
}

export default Login;
