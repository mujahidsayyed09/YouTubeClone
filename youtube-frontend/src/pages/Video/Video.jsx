import React, { useState, useEffect } from "react";
import "./Video.css";

// Material UI Icons
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import GetAppIcon from '@mui/icons-material/GetApp';

// React Router
import { Link, useParams } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://youtubeclone-gnz1.onrender.com";

// Notifications
import { toast, ToastContainer } from "react-toastify";

// Axios for API calls
import axios from "axios";

function Video() {
    // States
    const [message, setMessage] = useState("");          // New comment input
    const [data, setData] = useState(null);              // Video data
    const [videoUrl, setVideoUrl] = useState("");        // Video URL
    const [comments, setComments] = useState([]);        // Comments list

    // Extract video ID from URL params
    const { id } = useParams();

    /** =============================
     * Fetch Video by ID
     * ============================= */
    const fetchVideoById = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/video/${id}`);
            setData(res.data.video);
            setVideoUrl(res.data.video?.videoLink);
        } catch (error) {
            console.error("Error fetching video:", error);
        }
    };

    /** =============================
     * Fetch Comments by Video ID
     * ============================= */
    const getCommentByVideoId = async () => {
        try {
            const res = await axios.get(`${API_BASE}/commentApi/comment/${id}`);
            setComments(res.data.comments);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    /** =============================
     * Post a Comment
     * ============================= */
    const handleComment = async () => {
        const body = { message, video: id };
        try {
            const res = await axios.post(`${API_BASE}/commentApi/comment`, body, { withCredentials: true });
            const newComment = res.data.comment;
            setComments([newComment, ...comments]);
            setMessage("");
        } catch (err) {
            toast.error("Please Login");
        }
    };

    // Fetch data on component mount / ID change
    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId();
    }, [id]);

    return (
        <div className="video">
            {/* ===== Left Section: Video Player & Details ===== */}
            <div className="videoPostSection">

                {/* Video Player */}
                <div className="video_youtube">
                    {data ? (
                        <video className="youtube_video_youtube" controls autoPlay>
                            <source src={videoUrl} type="video/mp4" />
                            <source src={videoUrl} type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <p>Loading video...</p>
                    )}
                </div>

                {/* Video Details */}
                <div className="video_youtubeAbout">
                    <div className="video_uTubeTitle">{data?.title}</div>

                    {/* Channel Info & Actions */}
                    <div className="youtube_video_ProfileBlock">

                        {/* Left: Profile */}
                        <div className="youtube_video_ProfileBlock_left">
                            <Link to={`/user/${data?.user?._id}`} className="youtube_video_ProfileBlock_left_img">
                                <img
                                    className="youtube_video_ProfileBlock_left_image"
                                    src={data?.user?.profilePic}
                                    alt="Channel"
                                />
                            </Link>
                            <div className="youtubeVideo_subsView">
                                <div className="youtubePostProfileName">{data?.user?.channelName}</div>
                                <div className="youtubePostProfileSubs">{data?.user?.createdAt.slice(0, 10)}</div>
                            </div>
                            <div className="subsribeBtn">Subscribe</div>
                        </div>

                        {/* Right: Like, Share, Download */}
                        <div className="videoActions">
                            <div className="video_likeBox">
                                <div className="video_likeBox-like">
                                    <ThumbUpOffAltIcon />
                                    <div className="noOfLikes">{data?.like}</div>
                                </div>
                                <div className="divider"></div>
                                <div className="video_likeBox-like">
                                    <ThumbDownOffAltIcon />
                                </div>
                            </div>
                            <div className="videoAction">
                                <ShareIcon /> Share
                            </div>
                            <div className="videoAction">
                                <GetAppIcon /> Download
                            </div>
                        </div>
                    </div>

                    {/* Video Description */}
                    <div className="video_desc">
                        <div>{data?.view} views  {data?.createdAt.slice(0, 10)}</div>
                        <div>{data?.description}</div>
                    </div>
                </div>

                {/* ===== Comment Section ===== */}
                <div className="commentSection">
                    <div className="noOfComments">{comments.length} Comments</div>

                    {/* Add Comment */}
                    <div className="selfComment">
                        <img className="commentProfile" src={data?.user?.profilePic} alt="Profile" />
                        <div className="addComment">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Add a comment"
                            />
                            <div className="cancelSubmitButton">
                                <div className="cancelComment">Cancel</div>
                                <div className="cancelComment" onClick={handleComment}>Submit</div>
                            </div>
                        </div>
                    </div>

                    {/* Other Comments */}
                    <div className="otherComment">
                        {comments.map((item, index) => (
                            <div className="selfComment" key={item._id || index}>
                                <img className="commentProfile" src={item?.user?.profilePic} alt="User" />
                                <div className="otherCommentSection">
                                    <div className="commentSectionHeader">
                                        <div className="channel_nameComment">{item?.user?.userName}</div>
                                        <div className="channel_nameTime">{item?.createdAt.slice(0, 10)}</div>
                                    </div>
                                    <div className="otherCommentSectionComment">
                                        {item?.message}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===== Right Section: Suggested Videos ===== */}
            <div className="videoSuggestions">
                {Array(8).fill().map((_, i) => (
                    <div className="videoSuggestionsBlock" key={i}>
                        <div className="suggestionBlockThumbnail">
                            <img
                                src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                                alt="Suggestion"
                            />
                        </div>
                        <div className="videoSuggestionsAbout">
                            <div className="videoSuggestionsDesc">This is the suggestion video information.</div>
                            <div className="videoSuggestionsChannelName">ChannelName</div>
                            <div className="videoSuggestionsChannelName">136k • 1 day ago</div>
                        </div>
                    </div>
                ))}
            </div>

            <ToastContainer />
        </div>
    );
}

export default Video;
