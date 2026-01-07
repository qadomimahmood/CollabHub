import React from "react";
import ReactDOM from "react-dom/client"
import styles from"./SocialButton.module.css";

function SocialButton(props){
    return(
        <button className={styles.thirdpartybtn}><img className={styles.icon} src={props.icon} alt="google pic" />{props.placeholder}</button>
    );
}
export default SocialButton;