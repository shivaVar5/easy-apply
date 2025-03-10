import React from "react" 
import { Link, Outlet } from "react-router-dom";
import  "../Styles/AppLayout.css"


const AppLAyout = ()=>{
    return (
      <div className="AppLayout">
        <header className="header">
          <nav>
            <ul className="nav-list">
              <li>
              <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/upload-resume">Upload Resume</Link>
            </li>

            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
                <Link to="/resume-tracker">Resume Tracker</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>  
            </ul>
            
          </nav>
        </header>

        <main className="content">
            <Outlet />

        </main>

        <footer className="footer">
          <p>Designed And Developed By @Shiva</p>
          <p>copywrights @2025</p>
          

        </footer>
      </div>
    );
}
export default AppLAyout;