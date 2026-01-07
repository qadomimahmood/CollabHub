import React, { useState,useEffect, Children } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

async function verifyToken(token){
            if(!token)return false;
        try{
         const response=await axios.get("http://localhost:3000/api/auth/homepage",{
            headers: {
                'Authorization':`Bearer ${token}`
            }
            
        });
        console.log("get response",response);
        return response.data.isValidated;
    }
    catch(e){
        console.log(e)
    }
}



 function ProtectedRoute(props){
        const[isAuth,setIsAuth]=useState(null);
        let token= localStorage.getItem("authToken");


    useEffect(()=>{
        async function callVerifyToken(){
             let isValidated=await verifyToken(token);
             if(isValidated){
               return setIsAuth(true);
             }
             else{
                //navigate("/")
                
               return setIsAuth(false);
             }

        }
        callVerifyToken();//shouldnt be await
    },[]);

    if(isAuth===null) return <h2>Loading</h2>;
    if(isAuth===false) return <Navigate to="/login" />;//diff navigat("/login")
    // Use <Navigate /> when you want to conditionally render or protect a component.
    // Use navigate() when you want to go somewhere in response to an event.
    return props.children;//isAuth==true
}
export default ProtectedRoute;