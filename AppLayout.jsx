import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./index.css"

import { FaBars, FaHome, FaUser, FaBriefcase, FaSignInAlt, FaPlusSquare, FaLinkedin } from 'react-icons/fa';

import { FaFacebook, FaInstagram } from "react-icons/fa6";


const AppLayout = ()=>{
    const[isSideBarOpen, setIsSideBarOpen] = useState(false);
    

    const toggleHandle =()=>{
        setIsSideBarOpen(!isSideBarOpen);
    }
   

    return(
        <div className="app-layout" >
             <header className="header" >
             <h1 className='easy-title'>Easy Apply</h1>
           
            </header>
            <div className={`main-content ${isSideBarOpen?"sidebar-open":""}`}>
              <nav className={`sidebar ${isSideBarOpen?"open":"closed"}`}>
                <ul className="nav-list" >
                    <li>
                        <Link to="/home" className="nav-link"><FaHome className="icon" /> Home</Link>
                    </li>
                    <li>
                        <Link to="/profile" className="nav-link" ><FaUser className="icon" /> Profile</Link>
                    </li>
                    <li>
                        <Link to="/jobs" className="nav-link" ><FaBriefcase className="icon" /> Jobs</Link>
                    </li>
                    <li>
                        <Link to="/job-post" className="nav-link"><FaPlusSquare className="icon"/> Post Job</Link>
                    </li>
                    
                </ul>
                </nav>
                
            <main>
                <Outlet className="content-area" />

            </main>
            </div>
            
            <footer className="footer">
               <p>Designed and Developed by @Shiva Varikuppala</p>
                <p>© 2025 Job Portal. All rights reserved.</p>
               
                <div className="social-icons" >
                   <a href="" target="_blank">
                    <FaInstagram  size={24}/>

                   </a>
                   <a href="" target="_blank">
                    <FaLinkedin size={24} />
                   </a>
                   <a href="" target="_blank">
                    <FaFacebook size={24} />
                   </a>
                </div>

            </footer>

        </div>
    )
}
export default AppLayout;