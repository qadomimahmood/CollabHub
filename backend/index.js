//start the server and import the congigured app 

import express from "express";
import app from "./app.js";

const port=3000;

app.listen(port,()=>
    console.log(`server is running in port ${3000}`)
);