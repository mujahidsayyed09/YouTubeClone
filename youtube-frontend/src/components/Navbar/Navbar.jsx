import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import axios from "axios";

function Navbar({ setSideNavbarFunc, sideNavbar }) {
  const [navbarModel, setNavbarModel] = useState(false);
  const [userPic, setUserPic] = useState("");
  const [login, setLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const sideNavbarFuncToggle = () => setSideNavbarFunc(!sideNavbar);

  const handleProfile = () => {
    navigate(`/user/${localStorage.getItem("userId")}`);
    setNavbarModel(false);
  };

  const onClickOfPopUpOption = (action) => {
    setNavbarModel(false);
    if (action === "login") {
      setLogin(true);
    } else {
      localStorage.clear();
      getLogoutFun();
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 300);
    }
  };

  const getLogoutFun = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || "https://youtubeclone-gnz1.onrender.com"}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("userId") !== null);
    const pic = localStorage.getItem("userProfilePic");
    if (pic) setUserPic(pic);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setNavbarModel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <div className="navbarHamberger" onClick={sideNavbarFuncToggle}>
          <MenuIcon sx={{ color: "white" }} />
        </div>
        <Link to="/" className="navbar_youtubeImg">
          <YouTubeIcon sx={{ fontSize: "32px", color: "red" }} className="navbar_youtubeImage" />
          <div className="navbar_utubeTitle">YouTube</div>
        </Link>
      </div>

      {/* Middle Section */}
      <div className="navbar-middle">
        <div className="navbar_searchBox">
          <input type="text" placeholder="Search" className="navbar_searchBoxInput" />
          <div className="navbar_searchIconBox">
            <SearchIcon sx={{ fontSize: "26px", color: "white" }} />
          </div>
        </div>
        <div className="navbar_mic">
          <KeyboardVoiceIcon sx={{ color: "white" }} />
        </div>
      </div>

      {/* Right Section */}
      <div className="navbar-right" ref={dropdownRef}>
        <Link to="/65/upload" className="iconLink">
          <VideoCallIcon sx={{ fontSize: "28px", color: "white" }} />
        </Link>
        <NotificationsIcon sx={{ fontSize: "28px", color: "white" }} />
        <img
          onClick={() => setNavbarModel((prev) => !prev)}
          src={userPic || "/unknown.jpg"}
          className="navbar-right-logo"
          alt="profile"
        />
        {navbarModel && (
          <div className="navbar-model">
            {isLoggedIn && <div className="navbar-model-option" onClick={handleProfile}>Profile</div>}
            {!isLoggedIn && <div className="navbar-model-option" onClick={() => onClickOfPopUpOption("login")}>Login</div>}
            {isLoggedIn && <div className="navbar-model-option" onClick={() => onClickOfPopUpOption("logout")}>Logout</div>}
          </div>
        )}
      </div>

      {login && <Login setLoginModel={() => setLogin(false)} />}
    </div>
  );
}

export default Navbar;
