import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB")
    }catch(error){
        throw error;
    }
}

mongoose.connection.on("disconnected!!", ()=>{//when the connection will be broken this will run.
    console.log("MongoDB disconnected !!");
});

mongoose.connection.on("connected!!", ()=>{//when the connection will be made this will run
    console.log("MongoDB connected !!");
});

app.get("/",(req,res) =>{
    res.send("Hello first request");
})

app.use(cookieParser());
app.use(express.json());//(1)

//middleware
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute)

// app.use((req,res,next) => {
//     console.log("Hi!! I'm a middleware");
// })

app.use((err,req,res,next) => {//(3)
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
})//(2)

app.listen(8800,()=>{
    connect();
    console.log("Connected to the backend...");
})

/**
 * (1) by default we send the json data to the server, if we try to do so, we will get the validation error
 * therefore, to enable accepting the json data we will call app.use(express.json());
 * Basically to send a body we use this middleware where we say it to use express
 * 
 * (2) we are using this middleware to solve the error and acknowledge it.
 * 
 * (3) we have to keep the order of parameters same otherwise it won't work
 */