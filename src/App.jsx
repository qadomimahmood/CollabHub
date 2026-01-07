import React from "react";
import{createBrowserRouter,RouterProvider} from "react-router-dom"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/homepage";
import ProtectedRoute from "./components/ProtectedRoute";
const router=createBrowserRouter([
  {
    path:"/",
    element:<Login></Login>
  }
  ,
  {path:"/login",
   element:<Login></Login>
  },
  {
    path:"/signup",
    element:<Signup></Signup>
  },
  {
    path:"/homepage",
    element:(
      <ProtectedRoute>
        <HomePage/>
      </ProtectedRoute>
    )
  },
  {
    path:"*",
    element:<h1>404-Page Not fount</h1>
  }

]);


function App(){

  return(
   <RouterProvider router={router} />
);
};
//if u put the router it will work the same but put it in main for better structure


export default App;
