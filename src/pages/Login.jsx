import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios"
import "../styles/login.css";
import GoogleIcon from "../assets/svg/google.svg";
import FaceBookIcon from "../assets/svg/faceBook.svg";
import illustration from "../assets/photos/illustration.png";


import SocialButton from "../components/SocialButton.jsx";
import LoginField from "../components/SigninField.jsx";
import { Link, Navigate } from "react-router-dom";
import Signup from "./Signup.jsx";

import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login(){
    const navigate= useNavigate();
    const [errorMessage,setErrorMessage]=useState("");
    const [verifyMessage,setVerifyMessage]=useState("");
    const [userInfo,setUserInfo]=useState({
        inputEmail:"",
        inputPassword:""
    });

    function handleUserInfo(event){
       const {name,value}=event.target;
       setUserInfo(preObj=>{
        return(
            {
                ...preObj,
                [name]:value
            }
        )
       });
    }

async function handleLoginButton(event){
    event.preventDefault();
    try{
       let result= await axios.post("http://localhost:3000/api/auth/signin",{
            inputEmail:userInfo.inputEmail,
            inputPassword:userInfo.inputPassword
        });
        result=result.data;
        console.log("your data",result.errorMessage);
        if(result.errorMessage){
            setErrorMessage(result.errorMessage);
            setUserInfo(pre=>{
             return({
                inputEmail:pre.inputEmail,
                 inputPassword:""})
                    });
        }
        if(result.token){
            console.log(result.token);
            localStorage.setItem("authToken",result.token);
            navigate("/homepage");//Invalid hook call if u used it like a function not a hook
        }
    

    }
    catch(e){
        console.log(e);
    }
}

    
    return(
        <>


        <form className="form-container">
            <div className="name-container">
                <h1 >Welcom to </h1>
                <h1 className="name">CollabHub</h1>
            </div>
            <SocialButton icon={GoogleIcon} placeholder={"Sign in with google"} ></SocialButton>
          <SocialButton icon={FaceBookIcon} placeholder={"Sign in with facebook"} ></SocialButton>
         <h6 className="or-divider">or</h6>

            <LoginField  type={"text"} placeholder={"Username"} name={"inputEmail"} onChange={handleUserInfo} value={userInfo.inputEmail}></LoginField>
            <LoginField type={"password"} placeholder={"Password"} name={"inputPassword"} onChange={handleUserInfo} value={userInfo.inputPassword}></LoginField>

            <div className="cb-forget">
                <div className="cb-container">
                    <input type="checkbox" name="remeber_cb" />
                    <label>Remeber me</label>
                </div>
                <a href="">Forget Password</a>
            </div>
            <button onClick={handleLoginButton}>Login</button>
            <div className="sign-up-container">
                <h6>Dont`t have an account:</h6>
                <Link to={'/Signup'}>Register</Link>
            </div>
                {
                    errorMessage?                <div className="login-error-message">
                    <p>{errorMessage}</p>
                </div>:null
                }

        </form>
        </>
    );
}//<Navigate to ="/homepage"></Navigate> is a navigat component
export default Login;
// 1️⃣ What is a router?

// A router defines which component to render for which URL.

// In React Router v6.4+, we usually create it with:

// import { createBrowserRouter } from "react-router-dom";

// const router = createBrowserRouter([
//   { path: "/", element: <Login /> },
//   { path: "/signup", element: <Signup /> },
// ]);


// Each route has:

// path: the URL

// element: the React component to render

// 2️⃣ What is RouterProvider?

// <RouterProvider router={router} /> activates the router.

// It listens to URL changes and renders the correct component.

// Without it, the router object is just data — it does nothing.

// Always wrap your app (or main part of your app) in it.

// 3️⃣ How links work

// Use <Link to="/signup">Register</Link> instead of <a> for navigation.

// Clicking <Link>:

// Prevents page reload

// Changes the URL (history API)

// Lets RouterProvider render the matched route

// This is how React SPA navigation works — no new tab, no reload.

// 4️⃣ What happens on navigation

// React unmounts the previous route component (e.g., <Login />)

// React mounts the new route component (e.g., <Signup />)

// Everything outside RouterProvider (header, footer, global state) stays mounted

// Only the page inside RouterProvider changes

// 5️⃣ Where to put the router

// Usually in App.jsx for simple apps

// Can be in main.jsx for larger apps, which allows cleaner separation (auth providers, layouts, etc.)

// Key: RouterProvider must be rendered. Returning a page manually (e.g., <Login />) bypasses the router.

// 6️⃣ SPA behavior

// Single Page Application → only one HTML page (index.html)

// React swaps components dynamically

// Browser URL changes without page reload

// State outside RouterProvider stays intact

// 7️⃣ Common mistakes to avoid

// Duplicate imports → causes errors

// Manually rendering a page instead of returning RouterProvider → router is bypassed

// Putting ReactDOM in App.jsx → only belongs in main.jsx

// 8️⃣ Mental model / analogy

// createBrowserRouter → map / directions

// RouterProvider → GPS / engine

// <Link> → roads

// Page components (<Login />, <Signup />) → destinations

// Header/footer → always visible frame

// Only the “destination component” changes, rest stays
//api history