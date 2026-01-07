import React from "react";
import Styles from "./ProjectCard.module.css"

function ProjectCard(props){
    return(
        <div className={Styles.card}>
            <div className={Styles.cardheader}>
                <h4 className={Styles.projectname}>{props.projectName}</h4>
                <hr className={Styles.hr}/>
            </div>
            <div className={Styles.cardbody}>
                <p className={Styles.bodycontent}>members: {props.numberOfMembers}</p>
                <p className={Styles.bodycontent}>last updated: {props.lastUpDated}</p>
                <p className={Styles.bodycontent}>Due date: {props.projectDueDate}</p>
            </div>
        </div>
    );
}
export default ProjectCard;