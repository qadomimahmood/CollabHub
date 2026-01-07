import React from "react";
import Styles from "./projects.module.css";
import ProjectCard from "./ProjectCard";
import CreateComponent from "./CreateComponent";
import { useState,useEffect } from "react";
import axios from "axios";


function Projects(props){   
  let projectsArray;//if u put these in the state it will cause the sate to be undefined cuz its reset in every render.
  const [showCreateProjectComp,setShowCreateProjectComp]=useState(false);
  const [projects,setProjects]=useState([]);//why must be init to array
  async function fetchUderProjects(){
    try{
      let fetchUserProjectsResponse=await axios.get("http://localhost:3000/api/projects/get",{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("authToken")}`
        }
      });
      //projectsArray=;
      setProjects(fetchUserProjectsResponse.data.projects);
     
    }
    catch(e){

    }
  }
  useEffect(()=>{
    //fetch projects from backend
    const initiateFetch=async()=>{
      await fetchUderProjects();
       // console.log("fetched projects:",projects); ampty


    }
    initiateFetch(); 
         // console.log("fetched projects:",projects); ampty
  
 
  },[]);

console.log("fetched projects:",projects);

  function handleShowingCreateProject(){
    setShowCreateProjectComp(!showCreateProjectComp);
  }
  // project={
  //       projectName:"",
  //       numberOfMembers:0,
  //       numberOfTasks:0,
  //       numberOfCompletedTasks:0,
  //       lastUpDated:"",
  //       projectDueDate:""
  //   }
   
    return (
        <div className={Styles.projectscontainer}>
          <h2>My Projects</h2>
          <div className={Styles.projectcards}>
            {
              projects.map((project,index)=>{
                return <ProjectCard key={index} projectName={project.projectName} numberOfMembers={project.numberOfMembers} numberOfTasks={project.numberOfTasks} numberOfCompletedTasks={project.numberOfCompletedTasks} lastUpDated={project.lastUpDated} projectDueDate={project.projectDueDate}></ProjectCard>
              })
            }

            {
              showCreateProjectComp?<CreateComponent closeComponent={handleShowingCreateProject}></CreateComponent>:null
            }
            <div  onClick={handleShowingCreateProject}className={Styles.createcard}>
              <h4 className={Styles.createcontent1}>Create New Project </h4>
              <hr  className={Styles.hr}/>
              <h4 className={Styles.createcontent2}>+</h4>
            </div>

            
            



          </div>

        </div>
    );
}

export default Projects;



     


