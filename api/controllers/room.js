import Rooms from "../models/Rooms.js";
import Hotels from "../models/Hotels.js";
import { createError } from "../utils/error.js";

export const createRoom = async(req,res,next) => {

    const hotelId = req.params.hotelId;
    const newRoom = new Rooms(req.body);

    try{
        const savedRoom = await newRoom.save();
        try{
            await Hotels.findByIdAndUpdate(hotelId,{ $push: {rooms: savedRoom._id}, });//(1)
        }catch(err){
            next(err);
        }

        res.status(200).json(savedRoom);
    }
    catch(err){
        next(err);
    }
};

export const updateRoom = async (req, res) => {
    try {
      // const updatedRoom = await Room.findByIdAndUpdate(req.params.id,{$set: req.body});
      const updatedRoom = await Rooms.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      ); //(1)
      res.status(200).json(updatedRoom);
    } catch (err) {
      // res.status(500).json(err);
      next(err);
    }
  };
  
  export const deleteRoom = async (req, res) => {
    const hotelId = req.params.hotelId;
    const roomId = req.params.roomId;
    try {
      await Rooms.findByIdAndDelete(roomId);
      try{
        await Hotels.findByIdAndDelete(hotelId,{ $pull: { rooms: roomId}});
        res.status(200).json("Room has been deleted successfully!!");
      }catch(err){
        //if that hotel isn't available
        next(err);
      }
    } catch (err) {
      // res.status(500).json(err);
      //if the room isn't available
      next(err);
    }
  };
  
  export const getSingleRoom = async (req, res) => {
    try {
      const requestedRoom = await Rooms.findById(req.params.id);
      res.status(200).json(requestedRoom);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  export const getAllRooms = async (req, res, next) => {
    console.log("from the get all Rooms");
    // next();//(2)
  
    try {
      const rooms = await Rooms.find();
      console.log(rooms);
      res.status(200).json(rooms);
    } catch (err) {
      // res.status(500).json(err);
      next(err); //(3)
    }
  };

/**
 * this is mongoDB push method, which allows us to push item in any array. So, here we are first finding the Room using the RoomId
 * and then pushing the new roomid into that Room. ( cuz we have one field named rooms which accepts the item of type String.)
 */