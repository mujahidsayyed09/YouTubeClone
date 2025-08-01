import { useState, useEffect } from "react";
import React from "react";
import "./VideoUpload.css";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://youtubeclone-gnz1.onrender.com";

function VideoUpload() {
    const [inputField, setInputField] = useState({ "title": "", "description": "", "videoLink": "", "thumbnail": "", "videoType": "" });
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const handleOnChangeInput = (event, name) => {
        setInputField({
            ...inputField, [name]: event.target.value
        })
    }

    const uploadImage = async (e, type) => {
        setLoader(true);
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append("upload_preset", "youtube-clone");
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dgu6xvff2/${type}/upload`, data);
            const url = response.data.url;
            setLoader(false);
            let val = type === "image" ? "thumbnail" : "videoLink";
            setInputField({
                ...inputField, [val]: url
            })

        } catch (err) {
            setLoader(false);
            console.log(err);
        }
    }
    useEffect(() => {
        let isLoggedIn = localStorage.getItem("userId");
        if (isLoggedIn === null) {
            navigate("/");
        }
    }, []);

    const handleSubmitFunc = async () => {
        setLoader(true);
        try {
            await axios.post(`${API_BASE}/api/upload`, inputField, { withCredentials: true });
            setLoader(false);
            navigate("/");
        } catch (err) {
            setLoader(false);
            console.log(err);
        }
    };
    return (
        <div className="videoupload">
            <div className="uploadBox">
                <div className="uploadVideoTitle">
                    <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
                    Upload Video
                </div>

                <div className="uploadForm">
                    <input type="text" value={inputField.title} onChange={(e) => { handleOnChangeInput(e, "title") }} placeholder="Title of Video" className="uploadForm-btns" />
                    <input type="text" value={inputField.description} onChange={(e) => { handleOnChangeInput(e, "description") }} placeholder="Description" className="uploadForm-btns" />
                    <input type="text" value={inputField.videoType} onChange={(e) => { handleOnChangeInput(e, "videoType") }} placeholder="Category" className="uploadForm-btns" />
                    <div>Thumbnail <input type="file" accept="image/*" onChange={(e) => uploadImage(e, "image")} /></div>
                    <div>Video  <input type="file" accept="video/mp4, video/webm, video/*" onChange={(e) => uploadImage(e, "video")} /></div>
                    {
                        loader && <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    }
                </div>

                <div className="uploadBtns">
                    <div className="uploadBtns-form" onClick={handleSubmitFunc}>Upload</div>
                    <Link to={"/"} className="uploadBtns-form">Home</Link>
                </div>

            </div>
        </div>
    )
}

export default VideoUpload;