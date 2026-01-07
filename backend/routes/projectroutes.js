import express from "express";
import { verifyUserToken,createProject,getProjects,getProject,updateProject,deleteProject } from "../controllers/projectcontrollers.js";

let router = express.Router();

router.post("/create",verifyUserToken,createProject);
router.get("/get",verifyUserToken,getProjects);
router.get("/:d",getProject);
router.put("/:id",updateProject);
router.delete(":id",deleteProject);

export default router;