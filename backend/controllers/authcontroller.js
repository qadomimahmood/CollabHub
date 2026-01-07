// Contains all the logic for signup/login
import bcrypt from "bcrypt";
import db from "../db.js";//Importing db automatically runs the .connect() in db.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//dont use json middleware it defined in app.js
const saltRounds=10;
const jwtSecretKey=process.env.JWTSECRETKEY;
 async function signin(req,res){
   const{inputEmail,inputPassword}= req.body;
   console.log(inputEmail,inputPassword,req.body)
   if(!inputEmail||!inputPassword) {//inputUserName||inputPassword===null will always evaluate to true
        return res.json({errorMessage:"Empty login fields"});
   }
   try{
      const result=await db.query("SELECT email,password,id FROM users WHERE email=$1",[inputEmail]);
    if(result.rows.length===0)res.json({ errorMessage:"Invalid email or password"})
      const dbUserObj=result.rows[0];
  //    res.json({dbUserObjId:dbUserObj,message:"exist"});//dbUserObj → works shorthand dbUserObj.id → must use id: dbUserObj.id
     let allowLogin=await bcrypt.compare(inputPassword,dbUserObj.password);
     if(allowLogin){
     const token= jwt.sign({
        id:dbUserObj.id,
        email:dbUserObj.email
      },
        jwtSecretKey
      ,
      {
        expiresIn:"1h"
      }
    )
    res.json({token,message:"Logged in successful"});//must be inside {}
    //if u hot these route multiple times with the same user the token will be diff in each time see at te notes at the end

     }
     else{
      console.log("the controller",)
        res.json({errorMessage:"wrong password"});
     }
   }
   catch(e){
    console.log(e);
   }
}
  function verifySignup(req,res,next){
    const{fName,lName,inputEmail,inputPassword,confirmedPassword}= req.body;

    if(!fName||!lName||!inputEmail||!inputPassword){
      res.json({errorMessage:"Dnt forget to fill all fields"});
      //return next(); no need for it res. ends the function
    }
    if(inputPassword!==confirmedPassword){
      res.json({errorMessage:"Passwords doesnt match"});
    //  return next(); if u put it inside if clause u will by pass the validation
    }
    next();

  }

  async function signup(req,res){
    const{fName,lName,inputEmail,inputPassword}= req.body;
    bcrypt.hash(inputPassword,saltRounds,async function(err,hash){
        if(err){
            console.log("error with hashing");
            res.status(500).json({errorMessage:"error hashing password"});
        }
        else {
        try{
             const result=await db.query("INSERT INTO users (first_name,last_name,email,password) values ($1,$2,$3,$4) RETURNING id ,email ,password",[fName,lName,inputEmail,hash]);
             let user=result.rows[0];
             console.log(user);
             res.status(201).json({message:"user created sucessfully",user});
        }
        catch(e){
            console.error(e);
            console.log("error inserting data");
            res.status(500).json({errorMessage:"error with server (inserting data)"})
        }
    }
    });
}
function verifyToken(req,res){
  let authHeader=req.headers.authorization;
  console.log("header",authHeader);
  let splitedAuthHeader=authHeader.split(" ");
  let token=splitedAuthHeader[1];
  if(splitedAuthHeader[0]!=="Bearer"){
     return res.json({
      isValidated:false,
      errorMessage:" User not authorized"
    });
  }
  jwt.verify(token,jwtSecretKey,(err,decoded)=>{
    if(err){
      return res.json({
      isValidated:false,
      errorMessage:"user not authorized"
    });
    }
    else{
      console.log("the decoded token",decoded);
     return res.json({
        isValidated:true,
        message:"User authorized"
      });
    }
  })
  

}
export {signin,signup,verifySignup,verifyToken};


//if u dont include returning in these query : await db.query("INSERT INTO users (first_name,last_name,email,password) values ($1,$2,$3,$4) RETURNING id ,email",[fName,lName,inputEmail,hash]);
//the rows will be empty liek these obj:
// {
//   command: 'INSERT',
//   rowCount: 1,<--- only clue
//   oid: null,
//   rows: [],      // <-- EMPTY because no RETURNING
//   fields: [...],
//   ...
// }

//why jst diff in each request with the same user:
//Because of how JWTs are designed. Even if the data (payload) you put in the token is exactly the same, the JWT also includes a timestamp called iat (issued at) when the token was created. That timestamp changes with every login, and since the signature depends on both the payload and that timestamp, the resulting JWT string is different every time


