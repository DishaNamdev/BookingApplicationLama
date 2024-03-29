import express from "express";
import { createHotel, deleteHotel, getAllHotels, getSingleHotel, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/",verifyAdmin, createHotel);

//upate
router.put("/:id",verifyAdmin, updateHotel);

//delete
router.delete("/:id",verifyAdmin, deleteHotel);

//get single hotel
router.get("/:id", getSingleHotel);

//get all the hotels
router.get("/", getAllHotels);

export default router;
