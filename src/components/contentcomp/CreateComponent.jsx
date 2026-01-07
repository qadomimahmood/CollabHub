import React ,{useState,useEffect}from "react";
import styles from "./createcomponent.module.css";
import close from "../../assets/svg/close.svg";
import axios from "axios";

function CreateComponent(props){ 
    const [selectedMembers,setSelectedMembers]=useState([]);//{email:"test1@test.com"},{email:"test2@test.com"}
    const [filteredMembers,setFilteredMembers]=useState([]);
    const [searchTerm,setSearchTerm]=useState("");
        const [taskData,setTaskData]=useState({
        taskName:"",
        taskDescription:"",
        dueDate:"",
        assignedTo:""
    });
    const[tasksArray,setTasksArray]=useState([]);
    const [projectData,setProjectData]=useState({
        projectName:"",
        projectDescription:"",
        members:selectedMembers,//use use effect here
        tasks:tasksArray,
        projectDueDate:""
    });

    useEffect(()=>{
        setProjectData((preData)=>{
            return {
                ...preData,
                members:selectedMembers,
                tasks:tasksArray
            }
        });
    },[selectedMembers,tasksArray]);
    const dummyFriends = [
        "test1@test.com",
        "Alice Johnson",
        "Bob Smith",
        "Charlie Brown",
        "David Lee",
        "Eva Green",
        "Fiona White",
        "George King",
        "Hannah Scott"
        ];
  

    function handelSearchMemeber(event){
        console.log(event.target.value);
        let {value}=event.target;
        setSearchTerm(value);
        const filteredArray=dummyFriends.filter((member)=>{ return member.toLowerCase().includes(value.toLowerCase())});
        setFilteredMembers(filteredArray);
    }

    function handleOptionSelection(member){
        setSelectedMembers(pre=>([...pre,member]));
        setSearchTerm("");
        setFilteredMembers([]);
    }

    function handleAssigningTask(member){
        setTaskData((preData)=>{
            return {
                ...preData,
                assignedTo:member,
            }
        });
    }
    function handleProjectDataChange(event){
        const {name,value}=event.target;
        setProjectData((preData)=>{
            return {
                ...preData,
                [name]:value,
            }
        });
    }

    function handleTaskDataChange(event){
        const {name,value}=event.target;
        setTaskData((preData)=>{
            return {
                ...preData,
                [name]:value,

            }
        });

    }
    function handleAddTask(event){
        event.preventDefault();
        console.log("taskdata",taskData);
        setTasksArray(preTasks=>([...preTasks,{...taskData}]));// suprer important to clone in we dont want it to refrnce the taskdata object cuz it is reseted  in the next line
        setTaskData({
            taskName:"",
            taskDescription:"",
            dueDate:"",
            assignedTo:"",
            role:""
        });
    }
    function handleRoleSeclection(event){
        const roleValue=event.target.value;
        setTaskData((preData)=>{
            return {
                ...preData,
                role:roleValue,
            }
        });
    }
    //console.log(selectedMembers); why there excutes and check the option there is a question
    //Passing onClick prevents the reload implicitly sometimes.
     async function handleCreateProject(event){
        event.preventDefault();
        console.log("projectdata",projectData);
        //API CALL TO CREATE PROJECT
        try{    
       const createProjectResponse = await axios.post("http://localhost:3000/api/projects/create",
            projectData,
            {
            headers:{
            "Authorization":`Bearer ${localStorage.getItem("authToken")}`
           }
            }); 
            console.log("create project response",createProjectResponse);
        }
        catch(e){
            console.log("error in creating project",e);
        }
    }
    return(
        <div className={styles.createcomponentcontainer}>
            <form className={styles.formcontainer}>
                <div className={styles.formheader}>
                <h2 className={styles.formtitle}>Create New Project</h2>
                <button  type="button" className={styles.closebutton} onClick={props.closeComponent}><img src={close} alt="" className={styles.closeicon} /></button>
                </div>
                <hr className={styles.hr} />
                <label className={styles.label}>Project Name</label>
                <input type="text" name="projectName" placeholder="Project Name" onChange={handleProjectDataChange} value={projectData.projectName}/>
                <label className={styles.label}>Project Description</label>
                <textarea name="projectDescription" placeholder="Project Description" onChange={handleProjectDataChange} value={projectData.projectDescription}></textarea>
                <div className={styles.memberscontainer}>
                    <label className={styles.label}>Add members</label>
                    <input  onChange={handelSearchMemeber} type="text" name="searchMember" placeholder="Search for friends" value={searchTerm} />
                    {filteredMembers.length>0?<div className={styles.dropdown}> 
                        {
                            filteredMembers.map((member,index)=>(
                                <div key={index} onClick={()=>{handleOptionSelection(member)}} className={styles.option}>{member}</div>
                            ))
                        }
                    </div>:null}

                </div>
                <label className={styles.label}>Create tasks</label>

                <div className={styles.taskscontainer}>
                    <div className={styles.leftside}>
                    <input type="text" name="taskName" placeholder="Task Name" onChange={handleTaskDataChange} value={taskData.taskName}/>
                    <textarea name="taskDescription" placeholder="Task Description" onChange={handleTaskDataChange} value={taskData.taskDescription}></textarea>
                    <input type="date" name="dueDate" onChange={handleTaskDataChange} value={taskData.dueDate}/>
                    <label >Assigned to:</label>
                        <label  className={styles.assignname} >{taskData.assignedTo||"Not assigned"}</label>
                        <div className={styles.role}>
                            <label >Role:</label>
                            <input type="radio" name="role" value="admin" onChange={handleRoleSeclection} checked={taskData.role === "admin"}/>Admin
                            <input type="radio" name="role" value="member" onChange={handleRoleSeclection} checked={taskData.role === "member"}/>Member
                        </div>


                    </div>
                    <div className={styles.rightsidecontainer}>
                    <div className={styles.memberslist}>
                        {
                            selectedMembers.map((member,index)=>(
                                <div key={index} className={styles.selectedmember} onClick={()=>{handleAssigningTask(member)}}>{member}</div>
                            ))
                        }
                    </div>
                    <div className={styles.createtaskbtn}>
                        <button onClick={handleAddTask}>Add Task</button>
                    </div>
                    </div>
                </div>
                <input type="file" />
               <input type="date" name="projectDueDate" onChange={handleProjectDataChange} value={projectData.projectDueDate}/>

                <button type="submit" className={styles.submitbutton} onClick={handleCreateProject}>Create Project</button>
            </form>
        </div>
    );
}
export default CreateComponent;