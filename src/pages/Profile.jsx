import React, { useState } from 'react'
import "../Styles/Profile.css"
import supabase from '../Helpers/supabaseClient'
import { useQuery } from '@tanstack/react-query'

const Profile = () => {
  const [message, setMessage] = useState("")

  const fetchUsers = async () => {
    const {data, error} = await supabase
    .from("users")
    .select("*")
    .single();
    if(error) throw new Error(error.message)
    return data;
  }
  const{data:users, isLoading, error} = useQuery({
    queryKey:["users"],
    queryFn:fetchUsers 

  })

  if (error){
    setMessage("Something went wrong, please check your connection!");
    return;

  }

  if(isLoading){
    return(
      <div className="spinner-container">
      <div className="spinner"></div>
    </div>
    );
  }

  

  return (
    <div className='profile'>
      <h1>Your Profile Matters!</h1>
      {message && <p className='profile-error'>{message}</p>}
      
    <div className='profile-card' >
      <p><strong>Name:</strong> {users.name} {users.last_name}</p>
      <p><strong>Skills:</strong> {users.skills}</p>
      <p><strong>Phone No:</strong> {users.phone_no}</p>
      <p><strong>Email:</strong> {users.email}</p>
      <p><strong>Years of experience :</strong>{users.years_of_experience}years</p>
      

     </div>
      
  
    </div>
  )
}

export default Profile
