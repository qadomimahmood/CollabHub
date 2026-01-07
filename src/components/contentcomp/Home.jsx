import React from "react";


function Home(props){    
    return <h1 onClick={()=>props.handleContentProp("homecontent")}>home content</h1>
}

export default Home;
