import React,  {useState } from 'react'
import "../Styles/JobList.css"
import supabase from '../Helpers/supabaseClient';
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';




const JobList = ({signIn}) => {

const navigate = useNavigate();

const [sortType, setSortType] = useState("title");
const [searchTerm , setSearchTerm] = useState("");





const fetchJobs = async ()=>{
  const {data, error} = await supabase
  .from("jobs")
  .select("*")
  .order(sortType, {ascending:true})
  if(error) throw new Error(error.message);
  return data;
 
}

const {data:jobs, isLoading, error} = useQuery({
  queryKey:['jobs', sortType],
  queryFn:fetchJobs,

});

const applyJobMutation = useMutation({
  mutationFn: async (user_id) => {
    const { error } = await supabase
      .from("jobs")
      .update({ applied: true })
      .eq("user_id", user_id);

    if (error) throw new Error(error.message);
  },
  onSuccess: () => {
    QueryClient.invalidateQueries(["jobs"]);
  },
});


  // Handle Apply button click
  const handleApply = (user_id) => {
    applyJobMutation.mutate(user_id);
  };



if (isLoading) {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
}
if(error) return <p className='error-message'>error fetching jobs...{error.message}</p>

const filteredJobs = jobs.filter((job)=>job.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()));


  return (
    <div className='job-content'>
      <div className='input-fields'>
        <input type='text'
        value={searchTerm}
        placeholder='Search for a job'
        onChange={(e)=>setSearchTerm(e.target.value)} className='search-field' />
      <div>
        <label htmlFor='sort' className='label-field'> SortBy </label>
        <select className='select-field'>
          <option value="title" className='option-field'>Job Title</option>
          <option value="company" className='option-field'>Company</option>
          <option value="location" className='option-field'>Location</option>
        </select>

      </div>
    </div>

      
     <div className='job-details'>
      
      {filteredJobs.length ===0 ? <p className='no-results'> No Such Results Found</p>:( filteredJobs.map((job)=>(
        
      <div className='job-card' key={job.user_id}>
         <h2>{job.title}</h2>
         <p><strong>Company:</strong> {job.Company}</p>
         <p><strong>Location:</strong> {job.Location}</p>
         <p><strong>Created On:</strong> {job.Created_at}</p>
         <p><strong>Required Skills:</strong> {job.skills}</p>
         <p><strong>Work Type:</strong> {job.WorkType}</p>
         <p><strong>Experience Required:</strong> {job.Experience} years </p>
         <div className='buttons'>
            <button className='btn btn-details' disabled>Details</button>
            <button
              className='btn btn-apply'
               disabled={job.applied}
             onClick={() => handleApply(job.user_id)}
             style={{}}
            >
             {job.applied ? "Applied" : "Apply"}

             </button>

        </div>
        
         
      </div>
      )
      ))}
      
     </div>
    </div>
  )
}

export default JobList
