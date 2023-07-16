import {connectDB} from "./data/database.js";
import {app} from "./app.js"

//connecting to mongoDB database
connectDB();

//server listening 
app.listen(process.env.PORT_NO,()=>{
    console.log(`Database started at http://localhost:${process.env.PORT_NO} in ${process.env.NODE_ENV} Mode`);
})