import React, { useState } from 'react'
import "../Styles/SignIn.css"
import { useNavigate } from 'react-router-dom'
import supabase from '../Helpers/supabaseClient'



const SignIn = () => {
    const [details, setDetails] = useState({
        email:"",
        password:""
    })
    const[message, setMessage] = useState("")
    const navigate = useNavigate();

    const handleOnChange = (e)=>{
        const {name , value} = e.target;

        setDetails((prev)=>({
            ...prev,
            [name]:value
        }));
    };

    // logic for supabse
    const handleLogin = async (e)=>{
        e.preventDefault();
        try{
            const {data, error} = await supabase.auth.signInWithPassword({
                email:details.email,
                password:details.password
            });

            if(error){
             
                setMessage("User doesn't exist, please register");
                return;
            }
            const{data:UserData, error:UserError} = await supabase
            .from("users")
            .select("*")
            .eq("user_id", data.user.id)
            .single();

            if(UserError || !UserData){
                setMessage("User doesn't exist, please register");
                return;
            }
            navigate("/jobs");

        }
        catch(err){
            setMessage("Something went wrong, please try again later!");

        }
        
    }

  
  
  return (
    <div className='sign-page'>
        
        <div className='welcome'>
          
          <p className='desc1'>{`Dream big, start small,
           and take that leap! Every great journey begins with a 
           single step, and today is your day to rise above challenges 
           and turn possibilities into realities. The future is yours—go claim it!`}</p>
          <p className='desc2'> A Few more clicks to reach your destination!</p>
        </div>
        
        {/* <img src={JobImage} /> */}
        <form className='sign-form' onSubmit={handleLogin}>
            <input type='text' 
            placeholder='Enter a valid email' 
            onChange={handleOnChange}
            value={details.email}
            name="email"
             />
            <input type="text"
             placeholder='Enter a password'
             value={details.passward}
             onChange={handleOnChange}
             name='password'
              />
            <div className='sign-button'>
                <button type='submit' >Login</button>
            <p className='account-desc'>{`Don't have an account?`}<strong className='register-btn'  >Register</strong></p>
            </div>
            {message && <p className='login-error'>{message}</p>}
        </form>
        
      
    </div>
  )
}

export default SignIn
