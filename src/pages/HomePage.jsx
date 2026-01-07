import React from "react";
import styles from "../styles/homepage.module.css"
import Header from "../components/homepagecomp/Header";

import Sidebar from "../components/homepagecomp/Sidebar";
import Home from "../components/contentcomp/Home";
import DashBoard from "../components/contentcomp/DashBoard";
import Projects from "../components/contentcomp/Projects";
import Tasks from "../components/contentcomp/Tasks";
import Teams from "../components/contentcomp/Teams";
import Friends from "../components/contentcomp/Friends";
import Settings from "../components/contentcomp/Settings";


import { useState } from "react";
function HomePage(){
    const [showSidebar,setShowSidebar]=useState(false);
    const [activeContent,setActiveContent]=useState("home");

    function handleSidebar(){
        setShowSidebar(!showSidebar);
    }
    function handleContent(content){
        setActiveContent(content);
    }
    function renderContent(){
        switch(activeContent){
            case "home": return <Home></Home>;
            case "dashoard": return <DashBoard></DashBoard>;
            case "project": return <Projects></Projects>;
            case "tasks": return <Tasks></Tasks>;
            case "teams": return <Teams></Teams>;
            case "friends": return <Friends></Friends>;
            case "settings": return <Settings></Settings>;
        }
    }
    
    


    return(
    <>
        <div className={styles.homepage_container}>
            <Header handleProp={handleSidebar}></Header>
            <div className={styles.maincontent}>
                {
                showSidebar?<Sidebar handleProp={handleSidebar} 
                handleContentProp={handleContent}
                
                ></Sidebar>:null
                }
                
                <div className={styles.content}>{renderContent()}</div>
            </div>
        </div>
    </>
    );
}
export default HomePage;
