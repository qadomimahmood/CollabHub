import React from "react";
import logo from "../../assets/photos/logo.jpg";
import sidebar from "../../assets/svg/sidebar.svg";
import styles from "./Header.module.css";

function Header(props) {
  return (
    <div className={styles.header_container}>
        <div className={styles.left_section}>
            <button className={styles.sidebar_button} onClick={props.handleProp}><img  className={styles.sidebar_icon} src={sidebar} alt="" /></button>
            <img  className={styles.header_img} src={logo} alt="img logo" />
           <span className="sidebar-logo-text">CollabHub</span>
        </div>
        <div className={styles.right_section}>
            <button className={styles.createbtn}>Create</button>
            <span className={`${styles.notifications} material-symbols-outlined`}>notifications</span>
          <img  className={styles.avatar} src={logo} alt="" />
        </div>
    </div>

  );
}

export default Header;
    // <header className={styles.headerContainer}>
    //   {/* Left section */}
    //   <div className={styles.leftSection}>
    //     <div className={styles.logoSection}>
    //       <img src={logo} alt="CollabHub Logo" className={styles.logoImg} />
    //       <p className={styles.logoText}>CollabHub</p>
    //     </div>
    //     <button className={styles.createBtn}>Create Project</button>
    //   </div>

    //   {/* Right section */}
    //   <div className={styles.rightSection}>
    //     <div className={styles.avatar}>A</div>
    //   </div>
    // </header>
