import React from "react";
import ReactDOM from "react-dom/client"
import "./SigninField.css";

function LoginField(props){
    return(
    <input  
    type={props.type} 
    placeholder={props.placeholder} 
    name={props.name}
    onChange={props.onChange}
    value={props.value}/>

    );

}
export default LoginField;
// 1️⃣ Global CSS

// Normal .css files (like login.css) are global.

// Once imported anywhere in the app (e.g., Login.jsx or main.jsx), their styles apply to all components in the app.

// Folder location doesn’t matter — global CSS affects the entire app.

// Example:

/* login.css */
// input { border: 1px solid black; }


// Any <input> anywhere in the app gets this style, even in Signup page or components that didn’t import it.

// 2️⃣ Component CSS

// CSS imported directly in a component (like SigninField.css) applies to that component.

// But if it uses normal CSS, it’s still global, just loaded when the component renders.

// Example:

// /* SigninField.css */
// input { border: 2px solid blue; }


// This can override global CSS if:

// The selector specificity is the same, and

// It is loaded after the global CSS in the bundle

// 3️⃣ Order and Cascade

// CSS application depends on:

// Specificity: more specific selector wins

// /* global.css */ input { border: 1px solid black; }
// /* component.css */ input.login-field { border: 2px solid blue; } 
// /* → .login-field wins */


// Import/load order: last loaded wins for equal specificity

// Even if a component didn’t import global CSS, the global CSS is already in the page, so it affects the component.

// 4️⃣ CSS Modules

// Scoped CSS for a component.

// File name: ComponentName.module.css

// Import like:

// import styles from './SigninField.module.css';
// <input className={styles.input} />


// CSS is namespaced automatically → cannot affect other components, and global CSS cannot override it.

// Recommended for reusable components to avoid conflicts.

// 5️⃣ How to check what CSS is applied

// Open browser DevTools → Inspect element → Styles tab

// Shows:

// Which CSS file the rule comes from

// Which rules are overridden (crossed out)