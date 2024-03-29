import express from "express";
import { deleteUser, getAllUsers, getSingleUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication",verifyToken,(req,res,next) => {
    res.send("Hello, you are authenticated!!");
});//(1)

router.get("/checkUser/:id",verifyUser,(req,res,next) => {
    res.send("Hello, you are logged in and you can delete your account!!");
});//(1)

router.get("/checkAdmin/:id",verifyAdmin,(req,res,next) => {
    res.send("Hello, you are logged in as Admin !!");
});//(1)

//update
router.put("/:id",verifyUser, updateUser);

//delete
router.delete("/:id",verifyUser, deleteUser);

//get single User
router.get("/:id",verifyUser, getSingleUser);

//get all the Users
router.get("/",verifyAdmin, getAllUsers);

export default router;


/**
 * (1) whenever we will be hitting the checkauthentication method then the verifyToken method 
 * will be actived from that method the next method will again back the flow here in this route and then 
 * console.log(Hello user.... ) will be printed.
 */