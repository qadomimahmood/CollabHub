import React from "react";


function Friends(props){    
    return <h1 onClick={()=>props.handleContentProp("friendscontent")}>friends content</h1>
}

export default Friends;
