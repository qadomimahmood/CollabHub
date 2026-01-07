import pg from "pg";
import dotenv from "dotenv";

dotenv.config();


const db=new pg.Client({
user:process.env.DB_USER,
host:process.env.DB_HOST,
database:process.env.DB_NAME,
password:process.env.DB_PASSWORD,
port:process.env.DB_PORT
});
db.connect()
.then(()=>{console.log("connected successfully")})
.catch((e)=>{console.error(e)
    console.log("problem connecting to db")
    //or use async await with iife

})



export default db;