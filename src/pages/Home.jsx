import React from 'react'

import "../Styles/Home.css"

import { useNavigate } from 'react-router-dom'
import image from "../assets/52215.jpg"
import {  FaArrowRight } from 'react-icons/fa'

const Home = () => {
  const navigate = useNavigate();

  const handleGoToJobs = ()=>{
    navigate("/jobs")

  }
  const handleGoToPostJob = ()=>{
    navigate("/job-post");
  }
  return (
    
    <div className='home-container'>
      
        
      <div className='hero-content'>
        <h1 className='hero-title'>Find Your Dream Job Today!</h1>
        <p className='sub-title'>Connecting talented individuals with top employers around the globe.</p>

       <div className='show'>
          <div className='show-text' >
          <h1 className='showh1'>This is how
good companies
find good company.</h1>
          <p className='showp'>
            {`"Connecting talented individuals with top employers around the globe" 
            immediately inspire confidence and excitement.
            "Access the top 1% of talent", and
             provides specific examples of why users should engage with the platform:
             "100,000+ professionals placed worldwide."
             "Learn More", "Find a job", and "Post a job" encourages immediate engagement,
              guiding users toward taking action.


            `}
          </p>
         <button className='learn-more'>Learn More</button>
        </div>

        <div className='show-view'>
          <img src= {image} alt='img' />
      
        </div>
        
       </div>
      
        
      </div>
      <div className='job-photo'>
      
      </div>
      <div className='description'>
        <h1>Find Talent Your way!</h1>
        <p>Work with the largest network of independent professionals and
           get things done—from quick turnarounds to big transformations.</p>
           <button className='started-btn'>Lets get started!</button>
      </div>
      
      <div className='job-section'>
        <button className='button' onClick={()=>handleGoToJobs()}><FaArrowRight size={24} color='white'className='icon1'/> Find a job</button>
        <button className='button' onClick={()=>handleGoToPostJob()}> <FaArrowRight size={24} color='white' className='icon1'/> Post a job</button>
        
      </div>
    </div>
  )
}

export default Home
