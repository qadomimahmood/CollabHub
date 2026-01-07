import db from "../db.js";
import dotenv from "dotenv";
import jwt from"jsonwebtoken"
dotenv.config();
// {
//   "name": "Project Name",
//   "description": "Project Description",
//   "members": ["friend1@example.com", "friend2@example.com"],
//   "projectTasks": [
//     { "title": "Task 1", "assignedTo": "friend1@example.com","description":"...","status":"...","due_date":..."","role":"admin" },
//     { "title": "Task 2", "assignedTo": "friend2@example.com","description":"...","status":"...","due_date":..."","role":"admin"  }
//   ]
// }
const jwtSecretKey=process.env.JWTSECRETKEY;
function verifyUserToken(req,res,next){
    let authHeader=req.headers.authorization;
        if(!authHeader){
         return res.status(401).json({
            isValidated: false,
            errorMessage: "No token provided"
        });  
    }
    let authHeaderSplited=authHeader.split(" ");
    let token= authHeaderSplited[1];



    if(authHeaderSplited[0]!=="Bearer")
    {
         return res.status(401).json({
           isValidated:false,
           errorMessage:"invalid token format" 
        });
    }

    jwt.verify(token,jwtSecretKey,(err,decoded)=>{
        if(err){
            return res.json({
             isValidated:false,
             errorMessage:"invalid or expired token"
            });
        }
        req.user=decoded;
        next();

    })

}


 async function createProject(req,res){

    //implemt freinds with gmail
    let {projectName,projectDescription,members,tasks}=req.body;
    let createdBy=req.user.id;

    
    try{
        //insert project
     const projectResult= await db.query("INSERT INTO projects (name,description,created_by) values ($1,$2,$3) RETURNING id",[projectName,projectDescription,createdBy]);
     const projectId=projectResult.rows[0].id;
     let assignedToId;
    let  memberId;
     
     for(let task of tasks){
        //take user if from the eamil to insert it in members
        const userResult=await db.query("SELECT id FROM users WHERE email=$1",[task.assignedTo]);
            if(!userResult.rows.length){
                return res.status(400).json({
                    errorMessage:`user with email ${task.assignedTo} does not exist`
                })
            }
         assignedToId=userResult.rows[0]?.id;
                //extract the id from the inserted member cuz u cant insert the user_id into the tasks u must insert the id(pk)
      let memberResult=await db.query("INSERT INTO project_members (project_id,user_id,role) VALUES ($1,$2,$3) RETURNING id",[projectId,assignedToId,task.role]);
      memberId=memberResult.rows[0].id;



        await db.query("INSERT INTO tasks (project_id,title,description,assigned_to,due_date) VALUES( $1,$2,$3,$4,$5)",
            [projectId,task.taskName,task.taskDescription,memberId,task.dueDate])//problem here
       

     }
    res.json({message:"project created successfully"});
   
    }
    catch(e){
        console.log(e,"error in inserting project");
        res.status(500).json({errorMessage:"error creating project"});
    }


}

 async function getProjects(req,res){
    let projectsData=[];//array of obj`s
    let project={
        projectName:"",
        numberOfMembers:0,
        numberOfTasks:0,
        numberOfCompletedTasks:0,
        lastUpDated:"",
        projectDueDate:""
    }
    let userId=req.user.id;
    try{
        let projectsTableResponse= await db.query("SELECT * FROM projects WHERE created_by=$1",[userId]);
        for(let project of projectsTableResponse.rows){
            // GET PROJECT NAME,LAST UPDATED,DUE DATE
            project.projectName=project.name;
            project.lastUpDated=project.updated_at;
            project.projectDueDate=project.due_date;
            //GET PROJECT ID(PK)
            let projectId=project.id;
            //GET NUMBER OF MEMBERS
            let project_membersTableResponse=await db.query("SELECT COUNT(*) FROM project_members WHERE project_id=$1",[projectId]);
            project.numberOfMembers=project_membersTableResponse.rows.count;
            //GET NUMBER OF TASKS
            let tasksTableResponse=await db.query("SELECT COUNT(*) FROM tasks WHERE project_id=$1",[projectId]);
            project.numberOfTasks=tasksTableResponse.rows.count;
            //GET NUMBER OF COMPLETED TASKS
            let completedTasksTableREsponese=await db.query("SELECT COUNT(*) FROM tasks WHERE project_id=$1 AND status=$2",[projectId,"done"]);
            project.numberOfCompletedTasks=completedTasksTableREsponese.rows.count;
            projectsData.push(project);
        }
        res.json({projects:projectsData,message:"projects fetched successfully"});
    }
    catch(e){
        console.log("error in getting projects",e);
        res.status(500).json({errorMessage:"error in getting projects"});
    }

}
function getProject(){

}
function updateProject(){

}
function deleteProject(){

}
export {verifyUserToken,createProject,getProjects,getProject,updateProject,deleteProject}