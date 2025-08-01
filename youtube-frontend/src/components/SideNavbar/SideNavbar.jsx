import React from "react";
import "./SideNavbar.css";
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import { Link } from "react-router-dom";

function SideNavbar({ sideNavbar }) {
    return (
        <div className={sideNavbar ? "home-sideNavbar" : "home-sideNavbarHide"}>
            
            {/* Top Section */}
            <div className="home_sideNavbarTop">
                <Link to={"/"} className="home_sideNavbarTopOption">
                    <HomeIcon />
                    <div className="home_sideNavbarTopOptionTitle">Home</div>
                </Link>
                <div className="home_sideNavbarTopOption">
                    <VideocamIcon />
                    <div className="home_sideNavbarTopOptionTitle">Shorts</div>
                </div>
                <div className="home_sideNavbarTopOption">
                    <SubscriptionsIcon />
                    <div className="home_sideNavbarTopOptionTitle">Subscription</div>
                </div>
            </div>

            {/* Middle Section - User */}
            <div className="home_sideNavbarMiddle">
                <div className="home_sideNavbarTopOption">
                    <div className="home_sideNavbarTopOptionTitle">You</div>
                    <KeyboardArrowRightIcon />
                </div>
                <div className="home_sideNavbarTopOption">
                    <RecentActorsIcon />
                    <div className="home_sideNavbarTopOptionTitle">Your Channel</div>
                </div>
                <div className="home_sideNavbarTopOption">
                    <HistoryIcon />
                    <div className="home_sideNavbarTopOptionTitle">History</div>
                </div>
                <div className="home_sideNavbarTopOption">
                    <PlaylistAddIcon />
                    <div className="home_sideNavbarTopOptionTitle">Playlists</div>
                </div>
                <div className="home_sideNavbarTopOption">
                    <SmartDisplayOutlinedIcon />
                    <div className="home_sideNavbarTopOptionTitle">Your Videos</div>
                </div>
                <div className="home_sideNavbarTopOption">
                    <WatchLaterOutlinedIcon />
                    <div className="home_sideNavbarTopOptionTitle">Watch later</div>
                </div>
                <div className="home_sideNavbarTopOption">
                    <ThumbUpAltOutlinedIcon />
                    <div className="home_sideNavbarTopOptionTitle">Liked videos</div>
                </div>
                <div className="home_sideNavbarTopOption">
                    <ContentCutOutlinedIcon />
                    <div className="home_sideNavbarTopOptionTitle">Your clips</div>
                </div>
            </div>

            {/* Subscriptions Section */}
            <div className="home_sideNavbarMiddle">
                <div className="home_sideNavbarTopOptionTitleHeader">Subscriptions</div>
                
                <div className="home_sideNavbarTopOption">
                    <img className="home_sideNavbar_ImgLogo" src="https://res.cloudinary.com/dgu6xvff2/image/upload/v1753951137/mrprofile_h8qyf0.png" alt="Mr Beast" />
                    <div className="home_sideNavbarTopOptionTitle">Mr.Beast</div>
                </div>
                <div className="home_sideNavbarTopOption">
                    <img className="home_sideNavbar_ImgLogo" src="https://res.cloudinary.com/dgu6xvff2/image/upload/v1753878981/tanmay_nezng5.jpg" alt="Tanmay" />
                    <div className="home_sideNavbarTopOptionTitle">Tanmay Bhat</div>
                </div>
                <div className="home_sideNavbarTopOption">
                    <img className="home_sideNavbar_ImgLogo" src="https://res.cloudinary.com/dgu6xvff2/image/upload/v1753956226/cnprofile_hzfy3u.png" alt="Cartoon Network" />
                    <div className="home_sideNavbarTopOptionTitle">Cartoon Network</div>
                </div>
            </div>
        </div>
    );
}

export default SideNavbar;
