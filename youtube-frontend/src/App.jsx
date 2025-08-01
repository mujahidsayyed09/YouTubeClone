
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import { useState, useEffect } from 'react'
import {Route, Routes} from "react-router-dom";
import Video from './pages/Video/Video';
import Profile from './pages/Profile/Profile';
import VideoUpload from './pages/VideoUpload/VideoUpload';
import SignUp from './pages/SignUp/SignUp';
import axios from 'axios';

function App() {
  const [sideNavbar, setSideNavbar] = useState(true);


  const setSideNavbarFunc=(value)=>{
    setSideNavbar(value)
  }

  return (
    <div>
      <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar}/>
      <Routes>
        <Route path='/' element={<Home sideNavbar={sideNavbar}/>}/>
        <Route path='/watch/:id' element={<Video/>}/>
        <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar}/>}/>
        <Route path='/:id/upload' element={<VideoUpload/>} />
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </div>
  )
}

export default App
