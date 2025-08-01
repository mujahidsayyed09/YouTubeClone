import React, { useState, useEffect } from "react";
import "./Profile.css";
import SideNavbar from '../../components/SideNavbar/SideNavbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Profile({ sideNavbar }) {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL || "https://youtubeclone-gnz1.onrender.com"}/api/channel/${id}`)
            .then((response) => {
                setData(response.data.video);
                setUser(response.data.video[0]?.user);
            })
            .catch((err) => console.error(err));
    }, [id]);


    return (
        <div className="profile">
            <SideNavbar sideNavbar={sideNavbar} />
            <div className={sideNavbar ? "profile_page" : "fullProfile_page"}>

                {user && (
                    <div className="profile_top_section">
                        <div className="profile_top_section_profile">
                            <img src={user.profilePic} alt="Profile" />
                        </div>
                        <div className="profile_top_section_About">
                            <div className="profileTopSectionAboutName">{user.channelName}</div>
                            <div className="profileTopSectionAboutInfo">
                                {user.userName} • {data.length} videos
                            </div>
                            <div className="profileTopSectionAboutInfo">{user.about}</div>
                        </div>
                    </div>
                )}

                <div className="profile_videos">
                    <div className="profile_video_title">
                        Videos <ArrowRightIcon />
                    </div>
                    <div className="profileMainVideo">
                        {data.map((item) => (
                            <Link
                                key={item._id}
                                to={`/watch/${item._id}`}
                                className="profileVideoBlock"
                            >
                                <div className="profileVideoBlockThumbnail">
                                    <img src={item.thumbnail} alt={item.title} />
                                </div>
                                <div className="profileVideoBlockDetail">
                                    <div className="profileVideoBlockDetailName">{item.title}</div>
                                    <div className="profileVideoBlockDetailTime">
                                        Created at {item.createdAt.slice(0, 10)}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
