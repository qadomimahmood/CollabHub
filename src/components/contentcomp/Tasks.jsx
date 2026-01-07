import React from "react";


function Tasks(props){    
    return <h1 onClick={()=>props.handleContentProp("taskscontent")}>task content</h1>
}

export default Tasks;
