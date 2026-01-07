import React from "react";


function Teams(props){    
    return <h1 onClick={()=>props.handleContentProp("teamscontent")}>teams content</h1>
}

export default Teams;
