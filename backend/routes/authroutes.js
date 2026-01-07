// Defines URL paths and maps them to controllers.

import express from "express";
import { signin,signup,verifySignup ,verifyToken} from "../controllers/authcontroller.js";
const router=express.Router();
// These paths are relative to where we mount the router
router.post("/signup",verifySignup,signup)//orred matters
router.post("/signin",signin)
router.get("/homepage",verifyToken)

 export default router;