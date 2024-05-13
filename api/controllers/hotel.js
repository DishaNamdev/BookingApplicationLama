import Hotel from "../models/Hotels.js";
import Room from  "../models/Rooms.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

export const updateHotel = async (req, res) => {
  try {
    // const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set: req.body});
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ); //(1)
    res.status(200).json(updatedHotel);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted successfully!!");
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

export const getSingleHotel = async (req, res) => {
  try {
    const requestedHotel = await Hotel.findById(req.params.id);
    res.status(200).json(requestedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllHotels = async (req, res, next) => {
  console.log("from the get all hotels");
  // next();//(2)
  const { min, max,limit, ...others} = req.query;

  try {
    // const hotels = await Hotel.find(req.query);
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: {$gt: min || 1, $lt: max || 999},
    }).limit(parseInt(limit));
    console.log(hotels);
    res.status(200).json(hotels);
  } catch (err) {
    // res.status(500).json(err);
    next(err); //(3)
  }
};


//APIs to get the featured hotels
export const countByCity = async (req, res) => {

  const cities = req.query.cities.split(',');
  try {
    // const list = await Promise.all(cities.map(city=>{
    //   return Hotel.find({city: city}).length;
    // }));//(4)

    const list = await Promise.all(cities.map(city=>{
      return Hotel.countDocuments({city: city});
    }))
  res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const countByType = async (req, res,next) => {
  
  try {
    const hotelCount = await Hotel.countDocuments({type: "hotel"});
    const appartmentCount = await Hotel.countDocuments({type: "appartment"});
    const resortCount = await Hotel.countDocuments({type: "resort"});
    const villaCount = await Hotel.countDocuments({type: "village"});
    const cabinCount = await Hotel.countDocuments({type: "cabin"});

    // const requestedHotel = await Hotel.findById(req.params.id);

    res.status(200).json([
      {type: "hotels", count: hotelCount},
      {type: "apartments", count: appartmentCount},
      {type: "resorts", count: resortCount},
      {type: "villas", count: villaCount},
      {type: "cabins", count: cabinCount}
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async(req,res,next)=>{
  try{
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(hotel.rooms.map(room => {
      return Room.findById(room);
    }));
    res.status(200).json(list);
  }catch(err){
    next(err);
  }
}

/**
 * (1) if i send the reponse like this then the old object will be returned so to get the updated one,
 * we have to set the new property to true. This happneds because findByIdAndUpdate method return the
 * previous document and not the updated one, to get the updated one. We need to set the {new: true}
 *
 * (2) after all the routes in the index.js file we have a middleware which is the second middleware,
 * the first middleware is app.use(express.json()) and after that app.use(HI! I'm middleware comes);
 * So the flow is like: req goes to the 1st MW[express one] -> then hotelRoutes to api of get All hotels
 * -> then it sees a console [Hi! i'm middleware] and then next() comes which is used to call the next middleware
 * and now the next middleware is the second middleware where we have written. HI!! I'm middleware so in this way
 * middleware comes.
 *
 * (3) when we pass something to the next it is always a error, this error will be later catched up by the second middleware
 * according to our code in index.js
 * 
 * (4) we are not going to use this way of counting the cities. This is going to fetch all those data therefore, it is an 
 * expenssive operation. Instead of this we will use mongoDB countDocuments method. This function countDocuments doesn't fetch
 * any documents it just shows the count.
 */
