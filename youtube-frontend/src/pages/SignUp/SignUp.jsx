import { useState } from "react";
import React from "react";
import "./SignUp.css";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function SignUp() {
    // Profile image URL (default empty until upload)
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");

    // Form fields for signup
    const [signUpField, setSignUpField] = useState({
        channelName: "",
        userName: "",
        password: "",
        about: "",
        profilePic: ""
    });

    // Separate progress states for better control
    const [uploading, setUploading] = useState(false);  // image upload progress
    const [submitting, setSubmitting] = useState(false); // form submission progress

    const navigate = useNavigate();

    // 📌 Handles input changes and updates the corresponding field
    const handleInputField = (event, name) => {
        setSignUpField({ ...signUpField, [name]: event.target.value });
    };

    // 📌 Upload image to Cloudinary
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return toast.error("Please select a file");

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "youtube-clone"); // Cloudinary preset

        try {
            setUploading(true); // show progress bar
            const res = await axios.post("https://api.cloudinary.com/v1_1/dgu6xvff2/image/upload", data);

            // Use secure_url for HTTPS
            const imageUrl = res.data.secure_url || res.data.url;

            // Set uploaded image URL for preview
            setUploadedImageUrl(imageUrl);

            // Save image URL in form state
            setSignUpField({ ...signUpField, profilePic: imageUrl });

            toast.success("Profile image uploaded!");
        } catch (err) {
            toast.error("Image upload failed!");
        } finally {
            setUploading(false); // hide progress bar
        }
    };

    // Handle signup form submission
    const handleSignUp = async () => {
        const { channelName, userName, password, about, profilePic } = signUpField;

        // Basic field checks
        if (!channelName || !userName || !password || !about || !profilePic) {
            return toast.error("All fields including profile image are required");
        }

        // Channel name length
        if (channelName.length < 3) {
            return toast.error("Channel name must be at least 3 characters");
        }

        // Username validation
        if (userName.length < 3) {
            return toast.error("Username must be at least 3 characters");
        }

        // Password validation
        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }
        if (!/\d/.test(password) || !/[A-Za-z]/.test(password)) {
            return toast.error("Password must contain letters and numbers");
        }

        // About field validation
        if (about.length < 10) {
            return toast.error("About section must be at least 10 characters");
        }

        try {
            setSubmitting(true);

            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL || "https://youtubeclone-gnz1.onrender.com"}/auth/signUp`,
                signUpField,
                { withCredentials: true }
            );

            toast.success(res.data.message);
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Signup failed");
        } finally {
            setSubmitting(false);
        }
    };



    return (
        <div className="signup">
            <div className="signupCard">
                {/* Title with YouTube icon */}
                <div className="signupCardTitle">
                    <YouTubeIcon sx={{ fontSize: "54px" }} className="signupCardTitleImg" />
                    Sign Up
                </div>

                <div className="signupInputs">
                    {/* Input fields */}
                    <input type="text" placeholder="Enter Channel Name"
                        value={signUpField.channelName}
                        onChange={(e) => handleInputField(e, "channelName")}
                        className="signupInputs-inputs" />

                    <input type="text" placeholder="Enter User Name"
                        value={signUpField.userName}
                        onChange={(e) => handleInputField(e, "userName")}
                        className="signupInputs-inputs" />

                    <input type="password" placeholder="Enter Password"
                        value={signUpField.password}
                        onChange={(e) => handleInputField(e, "password")}
                        className="signupInputs-inputs" />

                    <input type="text" placeholder="About Your Channel"
                        value={signUpField.about}
                        onChange={(e) => handleInputField(e, "about")}
                        className="signupInputs-inputs" />

                    {/* Image Upload */}
                    <div className="uploadImage">
                        <input type="file" accept="image/*" onChange={uploadImage} />

                        {/* Preview uploaded image or placeholder */}
                        <div className="uploadImageDiv">
                            <img src={uploadedImageUrl || "/unknown.jpg"} alt="Profile" />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="signupBtns">
                        <button className="signupBtn" onClick={handleSignUp} disabled={submitting}>Sign Up</button>
                        <Link to="/" className="signupBtn">Home Page</Link>
                    </div>

                    {/* Progress bars for upload & signup */}
                    {(uploading || submitting) && (
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SignUp;
