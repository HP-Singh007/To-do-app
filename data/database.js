import mongoose from "mongoose";

//connecting to mongoDB
export const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then((c)=>{
        console.log(`Database connected to ${c.connection.host}`);
    }).catch((e)=>{
        console.log(e);
    })
}
    