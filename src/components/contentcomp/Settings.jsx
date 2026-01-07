import React from "react";


function Settings(props){    
    return <h1 onClick={()=>props.handleContentProp("settingscontent")}>settings content</h1>
}

export default Settings;
