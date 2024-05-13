import express from "express";
import { countByCity, createHotel, deleteHotel, getAllHotels, getSingleHotel, updateHotel, countByType, getHotelRooms } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/",verifyAdmin, createHotel);

//upate
router.put("/:id",verifyAdmin, updateHotel);

//delete
router.delete("/find/:id",verifyAdmin, deleteHotel);

//get single hotel
router.get("/find/:id", getSingleHotel);

//get all the hotels
router.get("/", getAllHotels);

//get all the hotels
router.get("/countByCity", countByCity);

//get all the hotels
router.get("/countByType", countByType);

//
router.get("/room/:id", getHotelRooms);

export default router;
