import React from "react";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import "./Home.css";
import HomePage from "../../components/HomePage/HomePage";

function Home({ sideNavbar }) {
    return (
        <div className="home">
            <SideNavbar sideNavbar={sideNavbar} />
            <HomePage sideNavbar={sideNavbar} />
        </div>
    );
}

export default Home;
