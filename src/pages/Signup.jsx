import axios from "axios";
import React from "react";
import { useState } from "react";

import "../styles/signup.css";
import logo from "../assets/photos/logo.jpg";

function Signup() {
    let[signupInfo,setSignupInfo]=useState({
        fName:"",
        lName:"",
        inputEmail:"",
        inputPassword:"",
        confirmedPassword:""
    });


    function handleChange(event){
        let{name,value}=event.target;
        setSignupInfo(pre=>({
        ...pre,
        [name]:value
        }
        ));
    }

    async function handleSignupButton(event){
       event.preventDefault();
       try{
       const result=await axios.post("http://localhost:3000/api/auth/signup",{
        fName:signupInfo.fName,
        lName:signupInfo.lName,
        inputEmail:signupInfo.inputEmail,
        inputPassword:signupInfo.inputPassword,
        confirmedPassword:signupInfo.confirmedPassword
        })
        console.log("signup data",result.data);
        }
        catch(e){
            console.log(e);
        }
        }

  return (
    <div>
        <form className="form-container">
            <img src={logo} alt="logo" />
            <label>First name:</label>
            <input type="text" name="fName" onChange={handleChange}/>
            <label>Last name:</label>
            <input type="text" name="lName" onChange={handleChange}/>
            <label>Email Address:</label>
            <input type="text" name="inputEmail" onChange={handleChange}/>
            <label >Password:</label>
            <input type="text" name="inputPassword" onChange={handleChange}/>
            <label > Confirm Password:</label>
            <input type="text" name="confirmedPassword" onChange={handleChange}/>
            <button onClick={handleSignupButton}>Signup</button>

        </form>
    </div>
  );
}

export default Signup;
//CSS in a component affects all elements rendered by that component.
//cuz of that the signinfield.css have input{..} that effect them
//CSS is only loaded when its file is imported somewhere in the app.

//If you never import a component (or its CSS), the browser does not know about its CSS.

//So unused components and their CSS won’t affect anything.
//module dont block the global styles :
// your CSS Module does NOT define any input styles, then all <input> elements in that component will still get the global styles from the global css.

         // firstName:pre.firstName,
        // lastName:pre.lastName,
        // email:pre.email,
        // pass:pre.pass,
        // confirmedPass:pre.confirmedPass, to long just use the ...
