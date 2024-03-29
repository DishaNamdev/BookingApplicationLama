import Hotel from "../models/Hotels.js";


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

  try {
    const hotels = await Hotel.find();
    console.log(hotels);
    res.status(200).json(hotels);
  } catch (err) {
    // res.status(500).json(err);
    next(err); //(3)
  }
};
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
 */
