import React, { useState } from 'react'
import "../Styles/Login.css"
import supabase from '../Helpers/supabaseClient'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [details, setDetails] = useState({
    name:"",
    last_name:"",
    skills:"",
    phone_no:"",
    email:"",
    password:"",
    years_of_experience:""


  })

  const[status, setStatus] = useState("");
  const [isPosting, setisPosting] = useState(false);

const navigate = useNavigate();

  const [isValidDetails, setIsValidDetails] = useState({
    name:false,
    email:false,
    password:false,
    years_of_experience:false,
    phone_no:false,
    skills:false,
    last_name:false


  })
  const regexValidname = /^[A-Za-z\s]*$/;
  const regexValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  


  const validateFields = (name, value)=>{
    let isValid = false;
    switch(name){
      case "name":
        isValid = value.length >=4 && regexValidname.test(value);
        break;
      case "email":
        isValid =  regexValidEmail.test(value);
        break;
      case "password":
        isValid = value.length >= 6;
        break;
      case "last_name":
        isValid = value.length >=4 &&  regexValidname.test(value);
        break;
      case "phone_no":
       isValid = /^\d{10}$/.test(value);
        break;
      case "skills":
        isValid= value.length >=4 &&  regexValidname.test(value);
        break;
       case "years_of_experience":
        isValid = value !== "";
        break;     
          
      default:
        break;      

    }
    return isValid;

  }
  const handleOnChange = (e)=>{
    const {name, value} = e.target;
    const isValidate = validateFields(name, value);

    setIsValidDetails((prev)=>({
      ...prev,
      [name]:isValidate,
    }))

    setDetails((prev)=>({
      ...prev,
      [name]:value
    }))
    
    

  }
  const handleOnClick = async (e)=>{
    e.preventDefault()
    setStatus("Registering your details, please wait...!")
    setisPosting(true);

    try{
      const{ data:existingUser} = await supabase
      .from("users")
      .select("*")
      .eq("email", details.email)
      .single()
      if(existingUser)
      {
        setStatus("This email already exists.");
        setisPosting(false);
        return;
      }

      const {data, error} = await supabase.auth.signUp({
        
        email:details.email,
        password:details.password
      
      })
      setisPosting(false);
      if(error){
        setStatus("Something went wrong , please try again later");
        return;
      }
    
      const {error:dbError} = await supabase
      .from("users")
      .insert([{
        name:details.name, 
        email:details.email, 
        user_id:data.user.id,
        last_name:details.last_name,
        password:details.password,
        phone_no:details.phone_no,
        years_of_experience:details.years_of_experience,
      
        skills:details.skills


      }]);
      if(dbError){
        setStatus("Something went wrong , please try again later");
        return
      }
      setStatus("Congratulations! succcessfully registered...! ")
      

    }
    catch(err){
      setStatus("Something went wrong , please try again later");

    }

    

    setDetails((prev)=>({
      ...prev,
      name:"",
      email:"",
      password:"",
      skills:"",
      last_name:"",
      years_of_experience:"",
      phone_no:""
    }))
    setIsValidDetails((prev)=>({
      ...prev,
      name:false,
      email:false,
      password:false,
      years_of_experience:false,
      phone_no:false,
      skills:false,
      last_name:false
    }))

    navigate("/signin")
    setTimeout(()=>setStatus(""), 5000);
  }
 
 const handleBackToLogin = (e)=>{
  e.preventDefault();
  navigate("/signin");

 }
 const validField = ()=>{
  return Object.values(isValidDetails).every((isValid)=>isValid);
 }

  return (
    <div className='form-container'>
      <div className='overlay'></div>
      <h2 className='title'>Please Register</h2>
      <form className='form' >
        <input type='text'
         value ={details.name}
         placeholder='Enter your name'
         name='name'
         onChange={handleOnChange}
          />
          {!isValidDetails.name && details.name !== ""  &&
          <p className='formErrors'>
            Name must be at least 4 characters long and only contain letters and spaces</p>}
            
          <input type='text' placeholder='Enter your lastname' 
          value={details.last_name} 
          name='last_name'
          onChange={handleOnChange}
           />  
          {!isValidDetails.last_name && details.last_name !== "" &&
          <p className='formErrors'>
            Your lastname must be at least 4 characters long and only contain letters and spaces</p>}

          <input type='text' placeholder='Enter your skills' 
          value={details.skills} 
          name='skills'
          onChange={handleOnChange}
          />
          {!isValidDetails.skills && details.skills !== "" &&
          <p className='formErrors'>
            Your skills must be at least 4 characters long and only contain letters and spaces</p>}
       

        <input type='text' placeholder='Enter a valid email'
         value={details.email}
          name='email'
          onChange={handleOnChange}
          />
          {!isValidDetails.email && details.email !== "" && <p className='formErrors'>Email must be a valid email address</p>}


        <input type='text'
         placeholder='Enter a password'
         value={details.password} 
         name='password'
         onChange={handleOnChange}
          />
          {!isValidDetails.password && details.password !== "" &&
          <p className='formErrors'>Password must be greater than 5 characters</p>}

          <input type='text'
         placeholder='Enter a your mobile number'
         value={details.phone_no} 
         name='phone_no'
         onChange={handleOnChange}
          />
          {!isValidDetails.phone_no && details.phone_no !== "" &&
          <p className='formErrors'>Password must be greater than 5 characters</p>}

          <div className='select-fields'>
          <label htmlFor='select' className='form-label' >Years of experience: </label>
          <select value={details.years_of_experience} className='re-select' onChange={handleOnChange} name="years_of_experience">
             <option value="" >select experience</option>
             <option value="0">fresher</option>
             <option value='1 to 2 '>1 to 2 years</option>
             <option value='2 to 3 '>2 to 3 years</option>
             <option value="4 to 5 ">4 to 5 years</option>
             <option value="5 to 6">5 to 6 years</option>
             <option value="7 to 8">7 to 8 years</option>
             <option value="8 to 9">8 to 9 years</option>
            <option value="9 to 10">9 to 10 years</option>
           <option value="more than 10 ">More than 10 years</option>
          </select>
          </div>

         <div className='form-buttons'>
          <button onClick={handleBackToLogin} className="register" >Login</button>
          <button type='sumit' onClick={handleOnClick} className='register' disabled={!validField() || isPosting}>{isPosting?"Registering":"Register"}</button>
          
          </div>
          {status && <p className='register-error'>{status}</p>}
        
      </form>
      
    </div>
  )
}

export default Login
