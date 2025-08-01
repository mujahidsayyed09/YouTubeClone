import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import axios from "axios";

function HomePage({ sideNavbar }) {
    // State for videos
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    // State for selected category
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Fetch videos on mount
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/allVideo")
            .then(res => {
                setData(res.data.videos);
                setFilteredData(res.data.videos); // Initially show all
            })
            .catch(error => console.error("Error fetching videos:", error));
    }, []);

    // Categories
    const options = [
        "All", "Tanmay Bhat", "MrBeast", "Cartoon Network", "Kurzgesagt", 
        "Science", "Movies", "Music", "News", "Lallantop", "NDTV", 
        "Sci-Fi", "Disney", "History", "India", "Construction"
    ];

    // Handle category selection
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        if (category === "All") {
            setFilteredData(data);
        } else {
            const filtered = data.filter(item => 
                item?.user?.channelName?.toLowerCase().includes(category.toLowerCase()) ||
                item?.title?.toLowerCase().includes(category.toLowerCase())
            );
            setFilteredData(filtered);
        }
    };

    return (
        <div className={sideNavbar ? "homepage" : "fullHomepage"}>
            
            {/* ===== Category Filter Bar ===== */}
            <div className="homepage_options">
                {options.map((item, index) => (
                    <div 
                        key={index} 
                        className={`homepage_option ${selectedCategory === item ? "activeOption" : ""}`} 
                        onClick={() => handleCategorySelect(item)}
                    >
                        {item}
                    </div>
                ))}
            </div>

            {/* ===== Video Grid ===== */}
            <div className={sideNavbar ? "home_mainPage" : "fullHome_mainPage"}>
                {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <Link key={item._id} to={`/watch/${item._id}`} className="youtube_Video">
                            
                            {/* Thumbnail */}
                            <div className="youtube_thumbnailBox">
                                <img src={item.thumbnail} alt="thumbnail" className="youtube_thumbnailPic" />
                                <div className="youtube_timingThumbnail">30:00</div>
                            </div>

                            {/* Video Details */}
                            <div className="youtubeTitleBox">
                                <div className="youtubeTitleBoxProfile">
                                    <img 
                                        src={item?.user?.profilePic} 
                                        alt="profile" 
                                        className="youtube_thumbnail_Profile" 
                                    />
                                </div>
                                <div className="youtubeTitleBox_Title">
                                    <div className="youtube_videoTitle">{item?.title}</div>
                                    <div className="youtube_channelName">{item?.user?.channelName}</div>
                                    <div className="youtubeVideo_views">{item?.view} views</div>
                                </div>
                            </div>

                        </Link>
                    ))
                ) : (
                    <p className="noVideosMessage">No videos found for "{selectedCategory}"</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;
