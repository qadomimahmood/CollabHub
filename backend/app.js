//these file call the routes
import cors from "cors";
import express from "express";
import { signin,signup } from "./controllers/authcontroller.js";
//import db from "./db.js"; not needed iwrote if for testing its imported in authcontrollers.js then the controller is imported here
//the db wont excuts until its imported
import router from "./routes/authroutes.js";
import projectRouter from"./routes/projectroutes.js"
let app=express();
app.use(cors({// Different ports → cross-origin

  origin: "http://localhost:5173", // allow your React app
  credentials: true // if you need cookies/auth
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Mount the router at /api/auth
app.use("/api/auth", router);
app.use("/api/projects",projectRouter)//any req prefixed with api/auth fprward it to the router
//dont include the host,protocol cuz any request from any host will work to these end point:
// ✔ Works for requests coming from any host
// ❌ Only if they can actually reach the server AND pass browser security (CORS)

export default app;