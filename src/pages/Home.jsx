import React from 'react'

import "../Styles/Home.css"

import { useNavigate } from 'react-router-dom'

import {  FaArrowRight } from 'react-icons/fa'
import Imgsrc from "../assets/laptop.png"
import SignIn from "./SignIn"

const features = [
{ 
  id:1,
  title:"Direct Contact With Employer",
},
{
  id:2,
  title:"Apply To Unlimited Jobs"

},
{
  id:3,
  title:"Resume Feedback and Improvements"
}
];

const Home = () => {
  const navigate = useNavigate();

  const handleSignIn = ()=>{
    navigate("/signin")

  }
  const handleGoToPostJob = ()=>{
    navigate("/job-post");
  }
  return (
    
    <div >
      <div className='home-container'>
        <div className='hero-title'>
         <h2 className='title-1'>Find Your Own Job</h2>
         <p className='hero-desc'>Streamline the application process by 
          allowing job seekers to apply
           for positions with a single click 
           using pre-saved profile details and resumes.</p>
         <button>Try us for free!</button>
         <div className='conditions'>
           <ul>
             <li>
              <p>Easy to apply</p>
              
             </li>
             <li>
              <p>All kinds of payments available!</p>
             </li>
             <li>
              <p>Refund available</p>
             </li>

         </ul>
         </div>
        
         
     
       </div>

       <div className='shape-container'>
     
         <img src={Imgsrc}  alt='img' className='overlap-image' />
    
       </div>
       

      </div>
      <h1 className='feature-title'>Our Powerful Packed Features</h1>
    
     <div className='features-list'>
      
      {features.map((feature)=>(
        <div key={feature.id} className='feature'>
        <h2 >{feature.title}</h2>
       <button>Read More</button>
       </div>

      ))}
      
     </div>

    
        
      
    </div>
  )
}

export default Home
