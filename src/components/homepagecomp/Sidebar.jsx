import React from "react";
import styles from "./Sidebar.module.css";
import close from "../../assets/svg/close.svg";
function Sidebar(props) {
  return (
    <>
      <div className={styles.sidebar}>
          <button className={styles.closebutton} onClick={props.handleProp}><img src={close} alt="" /></button>

        <div className={styles.sidebarcontent}>
          <h3 className={styles.sidebar_title}>Menu</h3>
          <div className={styles.navitem}   onClick={()=>props.handleContentProp("home")}>Home</div>
          <div className={styles.navitem}   onClick={()=>props.handleContentProp("dashoard")}>Dashboard</div>
          <div className={styles.navitem}   onClick={()=>props.handleContentProp("project")}>Projects</div>
          <div className={styles.navitem}   onClick={()=>props.handleContentProp("tasks")}>My Tasks</div>
          <div className={styles.navitem}   onClick={()=>props.handleContentProp("teams")}>Teams</div>
          <div className={styles.navitem}   onClick={()=>props.handleContentProp("friends")}>Friends</div>
          <div className={styles.navitem}   onClick={()=>props.handleContentProp("settings")}>Settings</div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
