import express from "express";
import { createRoom,updateRoom,deleteRoom, getSingleRoom, getAllRooms } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();


//create
router.post("/:hotelId",verifyAdmin, createRoom);

//upate
router.put("/:id",verifyAdmin, updateRoom);

//delete
router.delete("/:hotelId/:roomId",verifyAdmin, deleteRoom);

//get single Room
router.get("/:id", getSingleRoom);

//get all the Rooms
router.get("/", getAllRooms);

export default router;