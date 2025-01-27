import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from '../AppLayout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import PostJob from './pages/PostJob'
import JobList from './pages/JobList'
import JobDetails from './pages/JobDetails'
import ErrorPage from './pages/Error'
import "../Style.css"
import SignIn from "./pages/SignIn"
const App = () => {
  const [signIn, setSignIn] = useState(false);

  const handleSignIn = ()=>{
    setSignIn(true);
}

  return (
    <div>
     <BrowserRouter >
      <Routes >
      {/* <Route index element={<SignIn />} /> */}
      {/* <Route path='login' element = {<Login />} /> */}
        <Route element={<AppLayout />}>
       
        <Route path='/profile' element = {<Profile />} />
        <Route index path="/home" element={<Home />}/>
         { <Route path='/signin' element={<SignIn />} /> }
        <Route path='login' element={<Login OnSignIn={handleSignIn} />} />
        <Route path='job-post' element={<PostJob />} />
        <Route path='jobs' element={<JobList  signIn={signIn}/>} />
        <Route path='postjob' element={<JobDetails />} />

        </Route>
     
        <Route path='*' element= {<ErrorPage  />} />

     </Routes>
   </BrowserRouter>
  </div>
  )
}

export default App
