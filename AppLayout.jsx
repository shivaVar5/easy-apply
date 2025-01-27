import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import {  FaLinkedin } from 'react-icons/fa';

import { FaFacebook, FaInstagram } from "react-icons/fa6";
import "./src/Styles/app.css"
import svg from "./src/assets/icons8-logo.svg"


const AppLayout = ()=>{
    const navigate = useNavigate();

    const handleSignIn = ()=>{
        navigate("/signin");
    }

    return(
        <div className="app-layout" >
            <div className="heading">

            <header className="header" >
            <img src={svg} alt="svg" className="svg-logo"/>

             <h1 className='easy-title'>
                Easy Apply
            </h1>
            
           
            </header>

            <div className="home-container" >

              <nav className="heading-title" >
                <ul className="nav-list" >
                    <li>
                        <Link to="/home" className="nav-link"> Home</Link>
                    </li>
                    <li>
                        <Link to="/profile" className="nav-link" > Profile</Link>
                    </li>
                    <li>
                        <Link to="/jobs" className="nav-link" >Jobs</Link>
                    </li>
                    <li>
                        <Link to="/job-post" className="nav-link"> Post Job</Link>
                    </li>
                    
                </ul>
                </nav>
                <button className="login-btn" onClick={()=>handleSignIn()}>Login</button>
               
                
            </div>

            
           
            </div>
            
            
            <main>
                <Outlet className="content-area" />

            </main>

            
            <footer className="footer">
               <p>Designed and Developed by @ V Shiva</p>
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