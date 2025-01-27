import React, { useState } from 'react'
import "../Styles/PostJob.css"
import supabase from '../Helpers/supabaseClient';

const PostJob = () => {

  const [details, setdetails] = useState({
    title:"",
    Company:"",
    Experience:"",
    WorkType:"",
    Location:"",
    skills:""

  });
  const[isValidate, setIsValidate] = useState({
    title:false,
    Company:false,
    Experience:false,
    WorkType:false,
    Location:false,
    skills:false

  })
  const [statusMessage, setStatusMessage] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const regexValidField = /^[A-Za-z\s]*$/;

const validateFields = (name, value)=>{

  let isValid = false;

  switch(name){
    case"title":
    isValid = value.length >= 4 && regexValidField.test(value);
    break;

    case"Company":
    isValid = value.length >= 4 && regexValidField.test(value);
    break;

    case"Location":
    isValid = value.length >= 4 && regexValidField.test(value);
    break;

    case "Experience":
     isValid = value.length >= 6 
     break;
     case "skills":
     isValid = value.length >= 4&& regexValidField.test(value);
     break;
    case "WorkType":
      isValid = value.length >= 4 && regexValidField.test(value); 
      break;

    default:
      break;  


  }
  return isValid;

}

const handleOnChange = (e)=>{

  const {name , value} = e.target;
  const isValidate = validateFields(name , value)

  setIsValidate((prev)=>({
    ...prev,
    [name]:isValidate
  }));

  setdetails((prev)=>({
    ...prev,
    [name]:value

  }));

}
const handleOnClick = async (e)=>{
  e.preventDefault();
  setIsPosting(true);
  setStatusMessage("Posting Your Job...!");
  
  
const { data, error } = await supabase
.from('jobs')
.insert([
  { 
   
    title:details.title,
    Company:details.Company,
    Experience:details.Experience,
    WorkType:details.WorkType,
    Location:details.Location,
    skills:details.skills

    
  }
])
.select()
setIsPosting(false);

if(error){
 setStatusMessage(`Error: error while posting Job , please try again later, ${error.message}`);
  console.log("Error while posting job", error.message);
  return
}
 setStatusMessage("Congratulations!, you have successfully posted a job");

setdetails((prev)=>({
  ...prev,
  title:"",
  Company:"",
  Experience:"",
  WorkType:"",
  Location:"",
  skills:""
}))
setIsValidate((prev)=>({
  ...prev,
  title:false,
  Company:false,
  Experience:false,
  WorkType:false,
  Location:false,
  skills:false

}))
setTimeout(()=>setStatusMessage(""), 3000);

}
const isFormValid = ()=>{
  return Object.values(isValidate).every((isValid)=>isValid);
}

  return (
    <div className='post-fields'>
      <h1>If you are a hiring manager please post a job</h1>
      <form onSubmit={handleOnClick} className='postjob-form'>
      <input type='text' 
       placeholder='Enter job role'
       value={details.title}
       name='title'
       onChange={handleOnChange}
        />
        {!isValidate.title  && details.title !== "" &&<p className='PostErrors'>
         Job Name must be at least 4 characters long and only contain letters and spaces</p>}

      <input type='text' 
      placeholder='Enter company name '
      value={details.Company}
      name='Company'
      onChange={handleOnChange} 
      />
       {!isValidate.Company && details.Company !== "" && <p className='PostErrors'>
        Company name must be at least 4 characters long and only contain letters and spaces</p>}


      <input type='text' 
      placeholder='Enter location'
      value={details.Location}
      name='Location'
      onChange={handleOnChange} 
       />
      {!isValidate.Location && details.Location !== "" && <p className='PostErrors'>
      Company name must be at least 4 characters long and only contain letters and spaces</p>}

      
      <input type='text' 
      placeholder='Enter your skills'
      value={details.skills}
      name='skills'
      onChange={handleOnChange} 
       />
      {!isValidate.skills && details.skills !== "" && <p className='PostErrors'>
      Skills must be at least 4 characters long and only contain letters and spaces</p>}



      <input type='text'  
       placeholder='Enter work type'
       value={details.WorkType}
       name='WorkType'
       onChange={handleOnChange}
        />
        {!isValidate.WorkType && details.WorkType !== "" && <p className='PostErrors'>
        Work Mode must be at least 4 characters long and only contain letters and spaces</p>}
  <div className='select-year'>
      <label htmlFor='select'className='select-request' > Please select experience required</label>

<select
name='Experience'
onChange={handleOnChange}
value={details.Experience}

>
  <option value="">Select experience</option>
  <option value="0 to 1">0 to 1 years</option>
  <option value="1 to 2">1 to 2 years</option>
  <option value="2 to 3">2 to 3 years</option>
  <option value="3 to 4">3 to 4 years</option>
  <option value="5 to 6">5 to 6 years</option>
  <option value="7 to 8">7 to 8 years</option>
  <option value="8 to 9">8 to 9 years</option>
  <option value="9 to 10">9 to 10 years</option>
  <option value=" more than 10">9 to 10 years</option>
  </select>
 </div>
      {!isValidate.Experience && details.Experience !== "" &&<p className='PostErrors'>
Please select valid experience</p>}
  
      <button type='submit'className='add-btn' disabled={!isFormValid() || isPosting }>{isPosting? "Posting":"Add Job"}</button>
      </form>
    {statusMessage && <p className='status-message'>{statusMessage}</p>}

    </div>
  )
}


export default PostJob
